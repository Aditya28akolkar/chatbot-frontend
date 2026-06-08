import api from "../api/axios";

export const fetchTimerConfig =
  async () => {

    const res =
      await api.get("/timers");

    return res.data;
};