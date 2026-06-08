import { useEffect, useState } from "react";

import {
  fetchTimerConfig
} from "../services/configService";

// ==========================================
// USE SESSION
// ==========================================

export default function useSession() {

  const [expiryHours, setExpiryHours] =
    useState(24);

  const temporary = true;

  // ==========================================
  // LOAD TIMER CONFIG
  // ==========================================

  useEffect(() => {

    const loadConfig = async () => {

      try {

        const config =
          await fetchTimerConfig();

        console.log(
          "Timer Config:",
          config
        );

        setExpiryHours(
          config.session_expiry
        );

      } catch (error) {

        console.log(
          "Timer config error:",
          error
        );
      }
    };

    loadConfig();

  }, []);

  // ==========================================
  // PERMANENT USER ID
  // ==========================================

  let userId = localStorage.getItem(
    "user_id"
  );

  if (!userId) {

    userId = Math.floor(
      Math.random() * 1000000
    ).toString();

    localStorage.setItem(
      "user_id",
      userId
    );
  }

  // ==========================================
  // SESSION ID
  // ==========================================

  let sessionId = localStorage.getItem(
    "session_id"
  );

  let sessionCreatedAt =
    localStorage.getItem(
      "session_created_at"
    );

  // ==========================================
  // PERMANENT CHAT MODE
  // ==========================================

  if (!temporary) {

    if (!sessionId) {

      sessionId = crypto.randomUUID();

      localStorage.setItem(
        "session_id",
        sessionId
      );
    }

    return {
      userId,
      sessionId,
    };
  }

  // ==========================================
  // TEMPORARY CHAT MODE
  // ==========================================

  console.log(
    "Expiry Hours:",
    expiryHours
  );

  const SESSION_DURATION =

    expiryHours *
    60 *
    60 *
    1000;

  const now = Date.now();

  const isExpired =

    !sessionCreatedAt ||

    now -
      Number(sessionCreatedAt) >
      SESSION_DURATION;

  if (!sessionId || isExpired) {

    console.log(
      "Session Expired"
    );

    sessionId = crypto.randomUUID();

    localStorage.setItem(
      "session_id",
      sessionId
    );

    localStorage.setItem(
      "session_created_at",
      now.toString()
    );
  }

  return {
    userId,
    sessionId,
  };
}