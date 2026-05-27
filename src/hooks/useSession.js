const SESSION_DURATION = 24 * 60 * 60 * 1000;

export default function useSession() {

  let sessionId = localStorage.getItem(
    "session_id"
  );

  let sessionCreatedAt =
    localStorage.getItem(
      "session_created_at"
    );

  const now = Date.now();

  if (
    !sessionId ||
    !sessionCreatedAt ||
    now - Number(sessionCreatedAt) >
      SESSION_DURATION
  ) {

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

  return sessionId;
}