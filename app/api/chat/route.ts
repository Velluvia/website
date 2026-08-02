import { NextRequest, NextResponse } from "next/server";
import { getTransporter, getSenderAddress, getContactInbox } from "@/lib/mailer";

type ChatMessage = { role: "user" | "assistant"; text: string };

const SYSTEM_PROMPT = `You are the Velluvia website chat assistant. Velluvia is a UK corporate
and personal gifting company (velluvia.co.uk). Tone: warm, concise, helpful — a few sentences per
reply, never a wall of text.

Facts you can rely on:
- Collections: Signature Gifting (core gift boxes for any occasion), Velluvia Luxe (premium
  executive gifting — writing sets, leather goods), Velluvia Office (desk/onboarding gifts for
  new starters and teams), Velluvia Home (kitchen & everyday-essentials gifting).
- Occasions served: welcoming new joiners, farewells, maternity leave, birthdays, and personal
  gifts for any occasion.
- Contact: hello@velluvia.co.uk. There is a contact form at /contact for corporate and bulk
  enquiries.
- Returns/cancellation: governed by /returns-policy (14-day statutory right to cancel). Refunds
  and delivery specifics are still being finalised — do not invent timeframes or numbers.
- Company: Velluvia Ltd, registered office Ebbsfleet, Kent, UK. Company number and ICO
  registration number are not yet public — do not invent them.
- Payments are handled securely via Stripe at checkout.

Rules:
- Never invent prices, stock levels, delivery timeframes, company numbers, or policies not
  described above. If you don't know, say so and offer to escalate.
- Escalate (set "escalate": true) whenever: the person asks about a specific existing order, asks
  for a refund/complaint, requests a bulk/corporate quote needing a human, asks something you
  don't have reliable information for, or explicitly asks to speak to a person.
- When escalating, your "reply" should acknowledge you're passing it to the team and ask for
  their email if you don't have it in the conversation yet.
- Respond ONLY with strict JSON, no markdown fences, no commentary, in exactly this shape:
  {"reply": "your message to the visitor", "escalate": true or false}`;

async function callClaude(messages: ChatMessage[]): Promise<{ reply: string; escalate: boolean }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      reply:
        "Our chat assistant isn't fully set up yet — please use the contact form and our team will get back to you by email.",
      escalate: true,
    };
  }

  const model = process.env.CHAT_MODEL || "claude-3-5-haiku-latest";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.text })),
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("Anthropic API error:", res.status, errText);
    return {
      reply:
        "Something went wrong on our side — I've flagged this for our team to follow up by email.",
      escalate: true,
    };
  }

  const data = await res.json();
  const rawText: string = (data?.content || [])
    .map((block: any) => (block.type === "text" ? block.text : ""))
    .join("")
    .trim();

  try {
    const cleaned = rawText.replace(/^```json\s*|```$/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      reply: String(parsed.reply || "Sorry, could you rephrase that?"),
      escalate: Boolean(parsed.escalate),
    };
  } catch {
    // Model didn't return clean JSON — show the raw text but don't silently swallow it.
    return { reply: rawText || "Sorry, could you rephrase that?", escalate: false };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Step 2 of escalation: visitor supplied their email, send the transcript on.
    if (body?.action === "escalate") {
      const { visitorEmail, messages } = body as { visitorEmail: string; messages: ChatMessage[] };
      if (!visitorEmail) {
        return NextResponse.json({ error: "Missing email." }, { status: 400 });
      }

      const transporter = getTransporter();
      if (!transporter) {
        return NextResponse.json(
          { error: "Email is not configured yet. Please use the contact form instead." },
          { status: 500 }
        );
      }

      const transcript = (messages || [])
        .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.text}`)
        .join("\n");

      await transporter.sendMail({
        from: `"Velluvia Chat" <${getSenderAddress()}>`,
        to: getContactInbox(),
        replyTo: visitorEmail,
        subject: `Chat escalation — ${visitorEmail}`,
        text: `Visitor email: ${visitorEmail}\n\nTranscript:\n${transcript}`,
      });

      return NextResponse.json({ ok: true });
    }

    // Step 1: normal chat turn.
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const result = await callClaude(messages);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json(
      { reply: "Something went wrong — please try again in a moment.", escalate: false },
      { status: 500 }
    );
  }
}
