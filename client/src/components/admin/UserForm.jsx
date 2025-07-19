import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

export default function UserForm({ user = {}, branches = [], onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    role: "",
  });

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      branch: user.branch || (branches[0] || ""),
      role: user.role || "User",
    });
  }, [user, branches]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <Select
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        options={branches.map((b) => ({ label: b, value: b }))}
      />
      <Select
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          { label: "User", value: "User" },
          { label: "Admin", value: "Admin" },
          { label: "Supervisor", value: "Supervisor" },
        ]}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
        <Button type="button" onClick={onCancel} style={{ backgroundColor: "#ccc", color: "#000" }}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}