import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { shake } from '../../styles/animations';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.9)),
    url('/assets/images/fire-station.jpg') no-repeat center center/cover;
`;

const RegisterForm = styled.form`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows[4]};
  animation: fadeIn 0.5s ease forwards;

  h2 {
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.error.main};
  margin-top: 1rem;
  text-align: center;
  animation: ${shake} 0.5s ease;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    idNumber: '',
    name: '',
    email: '',
    password: '',
    role: 'Branch'
  });
  const [error, setError] = useState('');
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await registerUser(formData);
    
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/');
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <Input
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #444',
            backgroundColor: 'transparent',
            color: 'inherit'
          }}
        >
          <option value="Branch">Branch User</option>
          <option value="Office">Office User</option>
        </select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" fullWidth>
          Register
        </Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;