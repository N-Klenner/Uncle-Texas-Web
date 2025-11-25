// src/components/ChatIA.jsx
import React, { useState } from "react";
import "./ChatIA.css";

const ChatIA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Howdy! Soy la IA de Uncle Texas 🤠 ¿En qué puedo ayudarte? (por ejemplo: ¿Qué es el brisket?)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Limpia markdown simple tipo **texto**
  const cleanReply = (text) => {
    if (!text) return "";
    let t = text;

    // quitar negritas **así**
    t = t.replace(/\*\*(.*?)\*\*/g, "$1");

    // colapsar espacios en blanco raros
    t = t.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n");

    return t.trim();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newUserMsg = { from: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error desde /api/chat-ia:", data);
        throw new Error(data.error || "Error en la IA");
      }

      const replyClean = cleanReply(data.reply);

      const newBotMsg = {
        from: "bot",
        text: replyClean || "No pude responder en este momento.",
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Oops, hubo un problema hablando con la IA. Intenta de nuevo en un momento 🤠",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button className="chatia-fab" onClick={toggleOpen}>
          🤖
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div className="chatia-window">
          <div className="chatia-header">
            <span>Chat IA Uncle Texas</span>
            <button className="chatia-close" onClick={toggleOpen}>
              ✕
            </button>
          </div>

          <div className="chatia-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.from === "user"
                    ? "chatia-message chatia-message-user"
                    : "chatia-message chatia-message-bot"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chatia-message chatia-message-bot">
                Pensando… 🔥
              </div>
            )}
          </div>

          <form className="chatia-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
            />

            <button type="submit" disabled={loading}>
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatIA;
