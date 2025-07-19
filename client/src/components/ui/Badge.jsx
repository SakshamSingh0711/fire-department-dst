export default function Badge({ label, color = "gray" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 8px",
        borderRadius: "12px",
        backgroundColor: color,
        color: "white",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {label}
    </span>
  );
}