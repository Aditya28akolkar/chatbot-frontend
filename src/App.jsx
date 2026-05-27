import { useState } from "react";

import ChatHeader from "./components/ChatHeader";

import ChatInput from "./components/ChatInput";

import LoadingBubble from "./components/LoadingBubble";

import useSession from "./hooks/useSession";

import useChatHistory from "./hooks/useChatHistory";

import {
  sendChatMessage,
} from "./services/chatService";

function App() {

  const {
  userId,
  sessionId,
} = useSession();

  const {
    messages,
    setMessages,
  } = useChatHistory(sessionId);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const tempMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const data =
       await sendChatMessage(
  userId,
  sessionId,
  tempMessage
);
      const botMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Server is reconnecting. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        backgroundColor: "#F1F5F9",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "95vh",
          backgroundColor: "white",
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >

        <ChatHeader />

        {/* CHAT AREA */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 20px",
            backgroundColor: "#F8FAFC",
          }}
        >

          {messages.map(
            (msg, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "20px",
                }}
              >

                <div
                  style={{
                    maxWidth: "75%",
                    padding: "14px 18px",
                    borderRadius: "18px",

                    backgroundColor:
                      msg.role === "user"
                        ? "#2563EB"
                        : "white",

                    color:
                      msg.role === "user"
                        ? "white"
                        : "#0F172A",

                    border:
                      msg.role === "assistant"
                        ? "1px solid #E2E8F0"
                        : "none",

                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.05)",

                    lineHeight: "1.6",

                    whiteSpace: "pre-wrap",
                  }}
                >

                  {msg.content}

                </div>

              </div>
            )
          )}

          {loading && <LoadingBubble />}

        </div>

        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />

      </div>

    </div>
  );
}

export default App;