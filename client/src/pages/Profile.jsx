import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileForm = styled.form`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { updateUserProfile } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      updateUserProfile();
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  return (
    <ProfileContainer>
      <h1>My Profile</h1>
      <ProfileForm onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <h3>Change Password</h3>
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Update Profile</Button>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default Profile;