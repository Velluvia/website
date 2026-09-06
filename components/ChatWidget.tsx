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
  const [showGreeting, setShowGreeting] = useState(false);
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

  // Show a one-time attention bubble a few seconds after page load, so
  // first-time visitors notice the chat exists rather than mistaking it for
  // a decorative logo. Once per browser session, and never once they've
  // actually opened the chat.
  useEffect(() => {
    if (sessionStorage.getItem("velluvia-chat-greeted")) return;
    const timer = setTimeout(() => setShowGreeting(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  function dismissGreeting() {
    setShowGreeting(false);
    sessionStorage.setItem("velluvia-chat-greeted", "1");
  }

  function openChat() {
    dismissGreeting();
    setOpen((o) => !o);
  }

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

      {!open && showGreeting && (
        <div className="chat-greeting">
          <button
            className="chat-greeting-close"
            onClick={dismissGreeting}
            aria-label="Dismiss"
            type="button"
          >
            &times;
          </button>
          <p>👋 Need help finding the perfect gift? Ask us anything.</p>
        </div>
      )}

      <button
        className={`chat-launcher ${open ? "is-open" : ""}`}
        onClick={openChat}
        aria-label={open ? "Close chat" : "Open support chat"}
      >
        {open ? (
          <span className="chat-launcher-x">&times;</span>
        ) : (
          <>
            <img src="/images/logo-badge.png" alt="" />
            <span className="chat-launcher-label">Chat with us</span>
          </>
        )}
      </button>
    </div>
  );
}
