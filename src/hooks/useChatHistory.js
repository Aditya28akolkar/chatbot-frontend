import { useEffect, useState } from "react";

import { fetchHistory } from "../services/chatService";

import {
  fetchTimerConfig
} from "../services/configService";


export default function useChatHistory(sessionId) {

  const [messages, setMessages] = useState([]);


  useEffect(() => {

    // ==========================================
    // CLEAR OLD MESSAGES WHEN SESSION CHANGES
    // ==========================================

    setMessages([]);


    // Don't fetch if session ID is not ready
    if (!sessionId) {
      return;
    }


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


    let welcomeTimer = null;


    // ==========================================
    // LOAD HISTORY
    // ==========================================

    const loadHistory = async () => {

      let welcomeDelay = 10;


      try {

        // ======================================
        // GET TIMER CONFIG
        // ======================================

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
          Number(
            timerConfig?.welcome_delay ?? 10
          );


        console.log(
          "Welcome Delay:",
          welcomeDelay
        );


        // ======================================
        // FETCH CHAT HISTORY
        // ======================================

        console.log(
          "Fetching history..."
        );


        const data =
          await fetchHistory(sessionId);


        console.log(
          "History Data:",
          data
        );


        console.log(
          "Messages Length:",
          data?.messages?.length
        );


        // ======================================
        // HISTORY EXISTS
        // ======================================

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


        }

        // ======================================
        // NO HISTORY
        // ======================================

        else {

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


          welcomeTimer = setTimeout(() => {

            setMessages((prevMessages) => {

              // Don't overwrite messages if
              // something was added meanwhile
              if (prevMessages.length > 0) {
                return prevMessages;
              }


              return [
                {
                  role: "assistant",
                  content:
                    "How may I help you?",
                },
              ];

            });

          }, welcomeDelay * 1000);

        }


      }

      // ========================================
      // ERROR
      // ========================================

      catch (error) {

        console.log(
          "ERROR OCCURRED:"
        );


        console.log(
          error
        );


        console.log(
          "Fallback Delay:",
          welcomeDelay
        );


        welcomeTimer = setTimeout(() => {

          setMessages((prevMessages) => {

            if (prevMessages.length > 0) {
              return prevMessages;
            }


            return [
              {
                role: "assistant",
                content:
                  "How may I assist you with Lekha related queries today?",
              },
            ];

          });

        }, welcomeDelay * 1000);

      }

    };


    // ==========================================
    // START LOADING
    // ==========================================

    loadHistory();


    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {

      if (welcomeTimer) {

        clearTimeout(
          welcomeTimer
        );

      }

    };


  }, [sessionId]);


  // ==========================================
  // RETURN
  // ==========================================

  return {

    messages,

    setMessages,

  };

}