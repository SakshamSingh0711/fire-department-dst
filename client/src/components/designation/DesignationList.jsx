import React from 'react';
import styled from 'styled-components';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { fadeIn } from '../../styles/animations';

const DesignationListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const DesignationList = ({ designations, loading, onEdit, onDelete }) => {
  const columns = [
    {
      header: 'Designation Name',
      accessor: 'name',
    },
    {
      header: 'Code',
      accessor: 'code',
    },
    {
      header: 'Status',
      accessor: 'status',
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
    <DesignationListContainer>
      <Table
        columns={columns}
        data={designations}
        emptyMessage="No designations found"
      />
    </DesignationListContainer>
  );
};

export default DesignationList;