import { useState } from "react";

export default function Tabs({ tabs = [], defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: activeIndex === index ? "#007bff" : "#f0f0f0",
              color: activeIndex === index ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{tabs[activeIndex]?.content}</div>
    </div>
  );
}