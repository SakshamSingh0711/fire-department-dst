import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import api from '../../api/adminAPI';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import UserForm from './UserForm';

const UserManagementContainer = styled.div`
  padding: 1rem;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { branches } = useSelector((state) => state.branches);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      const response = await api.createUser(userData);
      setUsers((prev) => [...prev, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await api.updateUser(selectedUser._id, userData);
      setUsers((prev) =>
        prev.map((user) => (user._id === selectedUser._id ? response.data : user))
      );
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'idNumber' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Branch',
      accessor: 'branch',
      cell: (row) => row.branch?.name || 'N/A',
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="small" onClick={() => setSelectedUser(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteUser(row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <UserManagementContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>User Management</h2>
        <Button onClick={() => setShowCreateModal(true)}>Add New User</Button>
      </div>

      <Table columns={columns} data={users} loading={loading} emptyMessage="No users found" />

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New User"
      >
        <UserForm
          branches={branches}
          onSubmit={handleCreateUser}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title="Edit User">
        {selectedUser && (
          <UserForm
            user={selectedUser}
            branches={branches}
            onSubmit={handleUpdateUser}
            onCancel={() => setSelectedUser(null)}
          />
        )}
      </Modal>
    </UserManagementContainer>
  );
};

export default UserManagement;