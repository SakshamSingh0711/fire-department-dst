import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfileContainer = styled.div`
  padding: 0.1rem;
  max-width: 600px;
  margin: 0.5rem auto;
  background: ${({ theme }) => theme?.palette?.background?.default || '#1c1c1c'};
  border-radius: 16px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
  color: #fff;
`;

const ProfileTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme?.palette?.primary?.main || '#CF1020'};
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: 500;
  font-size: 1rem;
  color: #ccc;
`;

const StyledInput = styled.input`
  padding: 0.7rem 1rem;
  border: 1px solid #444;
  background-color: #2a2a2a;
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme?.palette?.primary?.main || '#CF1020'};
    outline: none;
  }
`;

const SectionTitle = styled.h3`
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme?.palette?.secondary?.main || '#8888ff'};
`;

const Message = styled.p`
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err?.message || 'Failed to update profile');
    }
  };

  return (
    <ProfileContainer>
      <ProfileTitle>My Profile</ProfileTitle>
      <ProfileForm onSubmit={handleSubmit}>
        {error && <Message error>{error}</Message>}
        {success && <Message>{success}</Message>}

        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <StyledInput
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <StyledInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="phone">Phone</Label>
          <StyledInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </InputGroup>

        <SectionTitle>Change Password</SectionTitle>

        <InputGroup>
          <Label htmlFor="currentPassword">Current Password</Label>
          <StyledInput
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <StyledInput
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <StyledInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </InputGroup>

        <Button type="submit" style={{ marginTop: '1.5rem' }}>
          Update Profile
        </Button>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default Profile;