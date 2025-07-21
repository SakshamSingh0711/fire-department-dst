import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { registerUser } from '../../redux/slices/authSlice';
import { shake } from '../../styles/animations';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Form } from 'formik';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
 
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      navigate('/');
    }
    // error will be automatically set in redux slice
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        
        <label htmlFor="idNumber">ID Number</label>
        <Input
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="fullName">Full Name</label>
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />  
        <label htmlFor="password">Password</label>
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
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;