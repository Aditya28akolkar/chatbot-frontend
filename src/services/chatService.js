import api from "../api/axios";

export const fetchHistory = async (
  sessionId
) => {

  const res = await api.get(
    `/history/${sessionId}`
  );

  return res.data;
};

export const sendChatMessage =
  async (sessionId, message) => {

    const res = await api.post(
      "/chat",
      {
        session_id: sessionId,
        message,
      }
    );

    return res.data;
  };