import { useState } from "react";

export default function DatePicker({ value, onChange, ...props }) {
  const [selectedDate, setSelectedDate] = useState(value || "");

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    onChange?.(e); // call parent onChange if provided
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={handleChange}
      {...props}
      style={{
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
      }}
    />
  );
}