export default function Overlay({ name }: { name: string }) {
  // #e37c41, #e37c41 10%, #e89a6c 10%, #e89a6c 20%, #e37c41 20%, #e37c41 30%, #e89a6c 30%, #e89a6c 40%

  let gradient = "";
  for (let i = 0; i < 10; i++) {
    const color = i % 2 === 0 ? "#e37c41" : "#e89a6c";
    gradient += `, ${color} ${i * 10}%, ${color} ${(i + 1) * 10}%`;
  }
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
            fontSize: 28,
            margin: "0 0 4px 15px",
          }}
        >
          Cornerstone Kids
        </div>
        <div
          style={{
            fontSize: 72,
            padding: "5px 80px 5px 15px",
            background: "linear-gradient(90deg, #e37c41 40%, #e89a6c)",
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
