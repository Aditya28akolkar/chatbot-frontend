export default function LoadingBubble() {

  return (

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
          border:
            "1px solid #E2E8F0",
          color: "#64748B",
        }}
      >

        Thinking...

      </div>

    </div>
  );
}