import { FaPaperPlane } from "react-icons/fa";

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
  
}) {
  return (
    <div
      style={{
        padding: "20px",
        borderTop: "1px solid #E2E8F0",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "14px",
            border: "1px solid #CBD5E1",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "#F8FAFC",
          }}
        />

 
        {/* Send Button */}
        <button
          onClick={sendMessage}
          style={{
            width: "55px",
            border: "none",
            borderRadius: "14px",
            backgroundColor: "#2563EB",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}