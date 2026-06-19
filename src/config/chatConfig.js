const chatConfig = {

  // ==========================================
  // SESSION SETTINGS
  // ==========================================

  session: {

    // true = chats expire
    // false = permanent chats
    temporary: true,

    // HOURS
    expiryHours: 24,
  },

  // ==========================================
  // HISTORY
  // ==========================================

  history: {

    enabled: true,
  },

  // ==========================================
  // WELCOME MESSAGE
  // ==========================================

  welcomeMessage:
    "How may I assist you with Lekha related queries today?",
};

export default chatConfig;