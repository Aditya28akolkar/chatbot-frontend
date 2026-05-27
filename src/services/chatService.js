import api from "../api/axios";

// ==========================================
// FETCH CHAT HISTORY
// ==========================================

export const fetchHistory = async (
  sessionId
) => {

  try {

    const res = await api.get(
      `/history/${sessionId}`
    );

    console.log(
      "History response:",
      res.data
    );

    return res.data;

  } catch (error) {

    console.log(
      "History fetch error:",
      error
    );

    return {
      messages: [],
    };
  }
};

// ==========================================
// SEND CHAT MESSAGE
// ==========================================

export const sendChatMessage =
  async (
    userId,
    sessionId,
    message
  ) => {

    try {

      const res = await api.post(
        "/chat",
        {
          user_id: userId,

          session_id: sessionId,

          message,
        }
      );

      return res.data;

    } catch (error) {

      console.log(
        "Send message error:",
        error
      );

      throw error;
    }
  };
      