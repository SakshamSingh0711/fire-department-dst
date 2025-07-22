// BranchList.jsx
import React from 'react';
import styled from 'styled-components';
import { FiUsers, FiFileText } from 'react-icons/fi';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { fadeIn } from '../../styles/animations';
import { useNavigate } from 'react-router-dom';

const BranchListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const BranchStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const BranchList = ({ branches, loading, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (branch) => {
    navigate(`/admin/branches/edit/${branch._id}`, { state: branch });
  };

  const columns = [
    {
      header: 'Branch Name',
      accessor: 'name',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{row.name}</div>
          <BranchStats>
            <div>
              <FiUsers size={14} /> {row.personnelCount || 0} personnel
            </div>
            <div>
              <FiFileText size={14} /> {row.activeFiles || 0} active files
            </div>
          </BranchStats>
        </div>
      ),
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
          <Button size="small" onClick={() => handleEdit(row)}>
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
    <BranchListContainer>
      <Table
        columns={columns}
        data={branches}
        emptyMessage="No branches found"
      />
    </BranchListContainer>
  );
};

export default BranchList;