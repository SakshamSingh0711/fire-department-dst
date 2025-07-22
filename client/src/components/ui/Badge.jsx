// export default function Badge({ label, color = "gray" }) {
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: "4px 8px",
//         borderRadius: "12px",
//         backgroundColor: color,
//         color: "white",
//         fontSize: "12px",
//         fontWeight: "bold",
//       }}
//     >
//       {label}
//     </span>
//   );
// }

export default function Badge({ label, color = "#4CAF50" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 16px",
        borderRadius: "20px",
        backgroundColor: color,
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        textAlign: "center",
        textDecoration: "none",
        ':hover': {
          backgroundColor: "#45a049",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }
      }}
    >
      {label}
    </span>
  );
}