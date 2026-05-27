// ==========================================
// CHAT CONFIG
// ==========================================

const chatConfig = {

  temporary: true,

  expiryHours: 24,
};

// ==========================================
// USE SESSION
// ==========================================

export default function useSession() {

  const {
    temporary,
    expiryHours,
  } = chatConfig;

  // ==========================================
  // PERMANENT USER ID
  // ==========================================

  let userId = localStorage.getItem(
    "user_id"
  );

  if (!userId) {

    userId = crypto.randomUUID();

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

  const SESSION_DURATION =

    expiryHours *
    60 *
    60 *
    1000;

  const now = Date.now();

  const isExpired =

    !sessionCreatedAt ||

    now - Number(sessionCreatedAt) >
      SESSION_DURATION;

  // ==========================================
  // CREATE NEW SESSION
  // ==========================================

  if (!sessionId || isExpired) {

    localStorage.removeItem(
      "session_id"
    );

    localStorage.removeItem(
      "session_created_at"
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