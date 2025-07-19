import React from 'react';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import { fadeIn } from '../../styles/animations';

const PersonnelListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const RankBadge = styled(Badge)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
`;

const PersonnelList = ({ personnel, loading, onPersonClick, onUpdate }) => {
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#cf1020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {row.name.charAt(0)}
          </div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      header: 'Rank',
      accessor: 'rank',
      cell: (row) => <RankBadge>{row.rank}</RankBadge>,
    },
    {
      header: 'Branch',
      accessor: 'currentBranch',
      cell: (row) => row.currentBranch?.name || 'N/A',
    },
    {
      header: 'Contact',
      accessor: 'contact',
      cell: (row) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <FiMail size={14} />
            <span>{row.email || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <FiPhone size={14} />
            <span>{row.phone || 'N/A'}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Posting',
      accessor: 'posting',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <FiMapPin size={14} />
          <span>
            {row.currentPosting?.location || 'N/A'} ({new Date(row.currentPosting?.date).toLocaleDateString()})
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onPersonClick(row)}
          >
            Transfer
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onUpdate(row._id, { ...row, rank: 'Updated Rank' })}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <PersonnelListContainer>
      <Table
        columns={columns}
        data={personnel}
        emptyMessage="No personnel records found"
      />
    </PersonnelListContainer>
  );
};

export default PersonnelList;