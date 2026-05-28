import api from "../api/axios";

// ==========================================
// FETCH CHAT HISTORY
// ==========================================

export const fetchHistory = async (sessionId) => {

  try {

    const res = await api.get(
      `/history/${sessionId}`
    );

    console.log("History response:", res.data);

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

export const sendChatMessage = async (
  sessionId,
  message
) => {

  try {

    const res = await api.post(
      "/chat",
      {
        session_id: sessionId,
        message: message,
      }
    );

    console.log(
      "Chat response:",
      res.data
    );

    return res.data;

  } catch (error) {

    console.log(
      "Send message error:",
      error
    );

    console.log(
      "Backend response:",
      error.response?.data
    );

    throw error;
  }
};