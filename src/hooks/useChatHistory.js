import { useEffect, useState } from "react";

import { fetchHistory }
from "../services/chatService";

export default function useChatHistory(
  sessionId
) {

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const data =
          await fetchHistory(sessionId);

        if (
          data &&
          data.messages &&
          data.messages.length > 0
        ) {

          setMessages(
            data.messages
          );

        } else {

          setTimeout(() => {

            setMessages([
              {
                role: "assistant",
                content:
                  "How may I assist you with GST or tax-related queries today?",
              },
            ]);

          }, 10000);
        }

      } catch (error) {

        console.log(error);

        setTimeout(() => {

          setMessages([
            {
              role: "assistant",
              content:
                "How may I assist you with GST or tax-related queries today?",
            },
          ]);

        }, 10000);
      }
    };

    loadHistory();

  }, [sessionId]);

  return {

    messages,

    setMessages,
  };
}