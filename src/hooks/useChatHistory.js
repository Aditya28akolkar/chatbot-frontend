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

    console.log(
      "================================="
    );

    console.log(
      "useChatHistory started"
    );

    console.log(
      "Session ID:",
      sessionId
    );

    const loadHistory = async () => {

      let welcomeDelay = 10;

      try {

        console.log(
          "Fetching timer config..."
        );

        const timerConfig =
          await fetchTimerConfig();

        console.log(
          "Timer Config:",
          timerConfig
        );

        welcomeDelay =
          timerConfig?.welcome_delay;

        console.log(
          "Welcome Delay:",
          welcomeDelay
        );

        console.log(
          "Fetching history..."
        );

        const data =
          await fetchHistory(
            sessionId
          );

        console.log(
          "History Data:",
          data
        );

        console.log(
          "Messages Length:",
          data?.messages?.length
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
            "No history found"
          );

          console.log(
            "Starting welcome timer"
          );

          console.log(
            "Timer Start:",
            Date.now()
          );

          setTimeout(() => {

            console.log(
              "Timer Fired:",
              Date.now()
            );

            console.log(
              "Showing welcome message"
            );

            setMessages([
              {
                role: "assistant",
                content:
                  "How may I help you?",
              },
            ]);

          }, welcomeDelay * 1000);
        }

      } catch (error) {

        console.log(
          "ERROR OCCURRED:"
        );

        console.log(error);

        console.log(
          "Fallback Delay:",
          welcomeDelay
        );

        setTimeout(() => {

          console.log(
            "Fallback Timer Fired"
          );

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