// TextArea.jsx
import React from "react";

const TextArea = ({ value, onChange, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        minHeight: "80px",
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
      {...props}
    />
  );
};

export default TextArea;