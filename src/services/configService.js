import api from "../api/axios";

export const fetchTimerConfig =
  async () => {

    const res =
      await api.get("/timer-config");

    return res.data;
};