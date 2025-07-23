import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import Button from '../components/ui/Button';
import UserList from '../components/user/UserList';
import UserForm from '../components/user/UserForm';
import Modal from '../components/ui/Modal';
import { getUsers, createUser, updateUser, deleteUser } from '../api/usersAPI';

const PageContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 1.8rem;
  }
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user: adminUser } = useSelector((state) => state.auth);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, formData);
      } else {
        await createUser(formData);
      }
      handleModalClose();
      loadUsers(); // Refresh the list
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsers(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>User Management</h1>
        {adminUser?.role === 'Master' && (
          <Button onClick={handleAddClick}>
            Add New User
          </Button>
        )}
      </PageHeader>

      <UserList
        users={users}
        loading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleModalClose}
          title={selectedUser ? 'Edit User' : 'Create New User'}
        >
          <UserForm
            user={selectedUser}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default UserManagement;