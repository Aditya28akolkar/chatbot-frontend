import { useEffect, useState } from "react";

import {
  fetchTimerConfig
} from "../services/configService";


// ==========================================
// USE SESSION
// ==========================================

export default function useSession() {

  const [expiryHours, setExpiryHours] =
    useState(null);

  const [sessionId, setSessionId] =
    useState(null);

  const [userId, setUserId] =
    useState(null);

  const temporary = true;


  // ==========================================
  // INITIALIZE SESSION
  // ==========================================

  useEffect(() => {

    let expiryTimer = null;


    const initializeSession = async () => {

      try {

        // ======================================
        // USER ID
        // ======================================

        let storedUserId =
          localStorage.getItem("user_id");


        if (!storedUserId) {

          storedUserId =
            Math.floor(
              Math.random() * 1000000
            ).toString();

          localStorage.setItem(
            "user_id",
            storedUserId
          );
        }


        setUserId(storedUserId);


        // ======================================
        // LOAD TIMER CONFIG
        // ======================================

        const config =
          await fetchTimerConfig();


        console.log(
          "Timer Config:",
          config
        );


        const configuredExpiry =
          Number(
            config.chat_expiry_hours
          );


        console.log(
          "Chat Expiry Config:",
          configuredExpiry
        );


        if (
          !configuredExpiry ||
          configuredExpiry <= 0
        ) {

          console.error(
            "Invalid chat expiry configuration"
          );

          return;
        }


        setExpiryHours(
          configuredExpiry
        );


        // ======================================
        // GET EXISTING SESSION
        // ======================================

        let storedSessionId =
          localStorage.getItem(
            "session_id"
          );


        let sessionCreatedAt =
          localStorage.getItem(
            "session_created_at"
          );


        const now =
          Date.now();


        // ======================================
        // SESSION DURATION
        // ======================================
        //
        // TEMPORARY TESTING:
        // config value is treated as MINUTES.
        //
        // If DB = 2
        // session expires after 2 minutes.
        //
        // ======================================

        const sessionDuration =
          configuredExpiry *
          60 *
          1000;


        // ======================================
        // CHECK EXISTING SESSION
        // ======================================

        const isExpired =
          !sessionCreatedAt ||
          now -
            Number(sessionCreatedAt) >=
            sessionDuration;


        // ======================================
        // CREATE NEW SESSION
        // ======================================

        if (
          !storedSessionId ||
          isExpired
        ) {

          console.log(
            "Creating new session"
          );


          storedSessionId =
            crypto.randomUUID();


          const newCreatedAt =
            Date.now();


          localStorage.setItem(
            "session_id",
            storedSessionId
          );


          localStorage.setItem(
            "session_created_at",
            newCreatedAt.toString()
          );


          sessionCreatedAt =
            newCreatedAt;
        }


        // ======================================
        // SET SESSION ID
        // ======================================

        setSessionId(
          storedSessionId
        );


        // ======================================
        // CALCULATE REMAINING TIME
        // ======================================

        const createdTime =
          Number(sessionCreatedAt);


        const expirationTime =
          createdTime +
          sessionDuration;


        const remainingTime =
          Math.max(
            expirationTime -
              Date.now(),
            0
          );


        console.log(
          "Session Created At:",
          new Date(createdTime)
        );


        console.log(
          "Session Expires At:",
          new Date(expirationTime)
        );


        console.log(
          "Remaining Session Time:",
          Math.round(
            remainingTime / 1000
          ),
          "seconds"
        );


        // ======================================
        // AUTOMATIC SESSION EXPIRATION
        // ======================================

        expiryTimer =
          setTimeout(() => {

            console.log(
              "================================="
            );

            console.log(
              "CHAT SESSION EXPIRED"
            );

            console.log(
              "Creating new session..."
            );

            console.log(
              "================================="
            );


            const newSessionId =
              crypto.randomUUID();


            const newCreatedAt =
              Date.now();


            localStorage.setItem(
              "session_id",
              newSessionId
            );


            localStorage.setItem(
              "session_created_at",
              newCreatedAt.toString()
            );


            // This causes useChatHistory
            // to run again because sessionId changes.
            setSessionId(
              newSessionId
            );


          }, remainingTime);

      }

      catch (error) {

        console.error(
          "Session initialization error:",
          error
        );

      }

    };


    initializeSession();


    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {

      if (expiryTimer) {

        clearTimeout(
          expiryTimer
        );

      }

    };

  }, []);


  // ==========================================
  // WAIT UNTIL INITIALIZED
  // ==========================================

  if (
    !userId ||
    !sessionId ||
    expiryHours === null
  ) {

    return {

      userId: null,

      sessionId: null,

      loading: true

    };

  }


  // ==========================================
  // RETURN SESSION
  // ==========================================

  return {

    userId,

    sessionId,

    loading: false

  };

}