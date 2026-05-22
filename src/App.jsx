import { useState } from "react";
import api from "./api/axios";
import { FaPaperPlane } from "react-icons/fa";

function App() {
let sessionId = localStorage.getItem("session_id");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("session_id", sessionId);
}
  const [message, setMessage] = useState("");
  const [onboardingInput, setOnboardingInput] =
  useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==================================================
  // SEND MESSAGE
  // ==================================================

  const sendMessage = async (customMessage = null) => {

    const finalMessage = customMessage || message;

    if (!finalMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: finalMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    setLoading(true);

    try {

     const res = await api.post("/chat", {
  session_id: sessionId,
  question: finalMessage,
});
      console.log(res.data);

      if (!res || !res.data) {

  console.log("Backend returned null");

  return;
}

      const botMessage = {

        role: "assistant",

        content: res.data?.answer || "No response received",

       response_type: res.data?.response_type || "text", 

        field: res.data?.field || null,
         mandatory: res.data?.mandatory || false,

  show_skip: res.data?.show_skip || false,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        backgroundColor: "#F1F5F9",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >

      {/* CHATBOT CONTAINER */}

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "95vh",
          backgroundColor: "white",
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            padding: "22px",
            borderBottom: "1px solid #E2E8F0",
            backgroundColor: "white",
          }}
        >

          <h2
            style={{
              margin: 0,
              textAlign: "center",
              color: "#0F172A",
              fontWeight: "600",
            }}
          >
            AI Assistant
          </h2>

        </div>

        {/* CHAT AREA */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: "24px",
            paddingBottom: "24px",
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "#F8FAFC",
          }}
        >

          {messages.map((msg, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "20px",
              }}
            >

              <div
                style={{
                  maxWidth: "75%",
                  padding: "14px 18px",
                  borderRadius: "18px",
                  backgroundColor:
                    msg.role === "user"
                      ? "#2563EB"
                      : "white",
                  color:
                    msg.role === "user"
                      ? "white"
                      : "#0F172A",
                  border:
                    msg.role === "assistant"
                      ? "1px solid #E2E8F0"
                      : "none",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.05)",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                }}
              >

                {/* NORMAL MESSAGE */}

                <div>

                  {msg.content}

                </div>

                {/* INLINE INPUT */}

                {msg.response_type === "input" && index === messages.length - 1 &&(

                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >

                    <input
                      type="text"
                      placeholder={`Enter ${msg.field}`}
                      value={onboardingInput}
                      onChange={(e) =>
                        setOnboardingInput(e.target.value)
                      }
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        outline: "none",
                      }}
                    />

                   <button
  onClick={() => {

    const temp = onboardingInput;

setOnboardingInput("");

sendMessage(temp);
  }}
  style={{
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    backgroundColor: "#2563EB",
    color: "white",
    cursor: "pointer",
  }}
>

  Submit

</button>

{
  msg.show_skip && (

    <button
      onClick={() => sendMessage("skip")}
      style={{
        border: "none",
        padding: "12px 18px",
        borderRadius: "10px",
        backgroundColor: "#64748B",
        color: "white",
        cursor: "pointer",
      }}
    >

      Skip

    </button>
  )
}
 
                  </div>

                )}

              </div>

            </div>

          ))}

          {loading && (

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >

              <div
                style={{
                  backgroundColor: "white",
                  padding: "14px 18px",
                  borderRadius: "18px",
                  border: "1px solid #E2E8F0",
                  color: "#64748B",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >

                Thinking...

              </div>

            </div>

          )}

        </div>

        {/* MAIN CHAT INPUT */}

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
              placeholder="Ask something..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
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

      </div>

    </div>

  );
}

export default App; 