export default function Overlay({ name }: { name: string }) {
  return (
    <div
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          color: "white",
          borderRadius: 16,
          margin: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: 36,
            margin: "0 0 4px 15px",
          }}
        >
          Cornerstone Kids
        </div>
        <div
          style={{
            fontSize: 96,
            padding: "5px 80px 5px 15px",
            background: "linear-gradient(90deg, #e37c41 40%, #e89a6c)",
            boxShadow: "0px 7px 14px 0px rgba(100, 100, 111, 0.1)",
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
