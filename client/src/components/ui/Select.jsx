export default function Select({ options = [], ...props }) {
  return (
    <select {...props}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  );
}