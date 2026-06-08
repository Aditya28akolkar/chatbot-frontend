import { useEffect, useState } from "react";

import { fetchHistory }
from "../services/chatService";

import {
  fetchTimerConfig
} from "../services/configService";

export default function useChatHistory(
  sessionId
) {

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {

    const loadHistory = async () => {

      let welcomeDelay = 10;

      try {

        const timerConfig =
          await fetchTimerConfig();

        welcomeDelay =
          timerConfig.welcome_delay_seconds;

        console.log(
          "Welcome Delay:",
          welcomeDelay
        );

        const data =
          await fetchHistory(
            sessionId
          );

        console.log(
          "History Data:",
          data
        );

        if (
          data &&
          data.messages &&
          data.messages.length > 0
        ) {

          console.log(
            "Loading history from DB"
          );

          setMessages(
            data.messages
          );

        } else {

          console.log(
            "Starting welcome timer"
          );

          setTimeout(() => {

            setMessages([
              {
                role: "assistant",
                content:
                  "How may I assist you with GST or tax-related queries today?",
              },
            ]);

          }, welcomeDelay * 1000);
        }

      } catch (error) {

        console.log(
          "History Error:",
          error
        );

        setTimeout(() => {

          setMessages([
            {
              role: "assistant",
              content:
                "How may I assist you with GST or tax-related queries today?",
            },
          ]);

        }, welcomeDelay * 1000);
      }
    };

    loadHistory();

  }, [sessionId]);

  return {

    messages,

    setMessages,
  };
}