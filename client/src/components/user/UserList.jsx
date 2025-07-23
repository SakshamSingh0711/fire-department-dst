import React from 'react';
import styled from 'styled-components';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { fadeIn } from '../../styles/animations';

const UserListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const UserList = ({ users, loading, onEdit, onDelete }) => {
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Role',
      accessor: 'role',
    },
    {
      header: 'Branch',
      accessor: 'branch',
      cell: (row) => row.branch?.name || 'N/A',
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: (row) => (
        <Badge variant={row.isActive ? 'success' : 'error'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="small" onClick={() => onEdit(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <UserListContainer>
      <Table
        columns={columns}
        data={users}
        emptyMessage="No users found"
      />
    </UserListContainer>
  );
};

export default UserList;