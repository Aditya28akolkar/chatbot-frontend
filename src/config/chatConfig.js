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
    "Namaste! How may I assist you with GST or tax-related queries today?",
};

export default chatConfig;