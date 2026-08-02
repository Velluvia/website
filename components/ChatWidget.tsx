"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

const GREETING: Message = {
  role: "assistant",
  text:
    "Hi, I'm the Velluvia assistant. Ask me about our collections, occasions we cover, or an existing enquiry — I'll bring in the team by email if you need a person.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [awaitingEmail, setAwaitingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [escalated, setEscalated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, awaitingEmail, loading]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      if (data.escalate) setAwaitingEmail(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong — please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitEmail(e: FormEvent) {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email || loading) return;
    setLoading(true);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "escalate", visitorEmail: email, messages }),
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Thanks — I've forwarded this conversation to our team. They'll reply to ${email} shortly.`,
        },
      ]);
      setEscalated(true);
      setAwaitingEmail(false);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Couldn't send that — please try our contact form instead." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-widget-root">
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-head">
            <div className="chat-panel-title">
              <img src="/images/logo-badge.png" alt="" />
              <span>Velluvia Assistant</span>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble assistant chat-typing">&hellip;</div>}
          </div>

          {awaitingEmail && !escalated ? (
            <form className="chat-input-row" onSubmit={submitEmail}>
              <input
                type="email"
                required
                placeholder="Your email, so the team can reply"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button type="submit" className="btn btn-gold" disabled={loading}>
                Send
              </button>
            </form>
          ) : !escalated ? (
            <form className="chat-input-row" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Ask a question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button type="submit" className="btn btn-gold" disabled={loading || !input.trim()}>
                Send
              </button>
            </form>
          ) : (
            <div className="chat-input-row chat-ended">
              <a href="/contact">Or use the full contact form &rarr;</a>
            </div>
          )}
        </div>
      )}

      <button
        className="chat-launcher"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <span className="chat-launcher-x">&times;</span> : <img src="/images/logo-badge.png" alt="" />}
      </button>
    </div>
  );
}
