import { useState } from "react";

import ChatHeader
from "./components/ChatHeader";

import ChatInput
from "./components/ChatInput";

import LoadingBubble
from "./components/LoadingBubble";

import useSession
from "./hooks/useSession";

import useChatHistory
from "./hooks/useChatHistory";

import {
  sendChatMessage,
} from "./services/chatService";

function App() {

  const sessionId = useSession();

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

    <div>

      <ChatHeader />

      {messages.map(
        (msg, index) => (

          <div key={index}>
            {msg.content}
          </div>
        )
      )}

      {loading && <LoadingBubble />}

      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />

    </div>
  );
}

export default App;