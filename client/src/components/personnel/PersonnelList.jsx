import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import { fadeIn } from '../../styles/animations';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonnel, createPersonnel, updatePersonnel } from '../../redux/slices/personnelSlice';
import { fetchBranches } from '../../redux/slices/branchSlice';
import PersonnelForm from './PersonnelForm';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const PersonnelListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const RankBadge = styled(Badge)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
`;

const PersonnelList = () => {
  const dispatch = useDispatch();
  const { personnel, loading } = useSelector((state) => state.personnel);
  const { branches } = useSelector((state) => state.branches); // ✅ corrected state key

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);

  useEffect(() => {
    dispatch(fetchPersonnel());
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingPerson(null);
    setModalOpen(true);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingPerson(null);
  };

  const handleSubmit = (data) => {
    if (editingPerson) {
      dispatch(updatePersonnel({ id: editingPerson._id, updatedData: data }));
    } else {
      dispatch(createPersonnel(data));
    }
    handleClose();
  };

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
            {row.currentPosting?.location || 'N/A'}{' '}
            {row.currentPosting?.date ? `(${new Date(row.currentPosting.date).toLocaleDateString()})` : ''}
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
            onClick={() => console.log('Transfer logic')}
          >
            Transfer
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PersonnelListContainer>
      <Button onClick={handleAdd} style={{ marginBottom: '1rem' }}>
        Add Personnel
      </Button>

      {loading ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          data={personnel}
          emptyMessage="No personnel records found"
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingPerson ? 'Edit Personnel' : 'Add Personnel'}
        size="medium"
      >
        <PersonnelForm
          user={editingPerson}
          branches={branches}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </Modal>
    </PersonnelListContainer>
  );
};

export default PersonnelList;