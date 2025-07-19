import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PersonnelForm = ({ user = {}, branches = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rank: '',
    branchId: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        rank: user.rank || '',
        branchId: user.currentBranch?._id || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
      <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" />
      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" type="tel" />
      <Input name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" />
      <Select name="branchId" value={formData.branchId} onChange={handleChange}>
        <option value="">Select Branch</option>
        {branches.map((branch) => (
          <option key={branch._id} value={branch._id}>
            {branch.name}
          </option>
        ))}
      </Select>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </FormContainer>
  );
};

export default PersonnelForm;