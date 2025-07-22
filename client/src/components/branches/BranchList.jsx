// BranchList.jsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FiUsers, FiFileText, FiSearch, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { fadeIn } from '../../styles/animations';
import { useNavigate } from 'react-router-dom';

const BranchListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.palette.background.paper};
 

  input {
    border: none;
    outline: none;
    font-size: 0.9rem;
    background: transparent;
    margin-left: 0.5rem;
    color: white ;
  }
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

const SortIcon = ({ direction }) => {
  return direction === 'asc' ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />;
};

const BranchList = ({ branches, loading, onDelete }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleEdit = (branch) => {
    navigate(`/admin/branches/edit/${branch._id}`, { state: branch });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  const filteredAndSortedBranches = useMemo(() => {
    let filtered = branches;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = branches.filter((b) => b.name.toLowerCase().includes(term));
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [branches, searchTerm, sortConfig]);

  const columns = [
    {
      header: (
        <div
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          onClick={() => handleSort('name')}
        >
          Branch Name <SortIcon direction={sortConfig.direction} />
        </div>
      ),
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
      header: (
        <div
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          onClick={() => handleSort('isActive')}
        >
          Status <SortIcon direction={sortConfig.direction} />
        </div>
      ),
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
            Hide
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
      <ControlsContainer>
        <SearchBar>
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Search branch name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchBar>
      </ControlsContainer>
      <Table
        columns={columns}
        data={filteredAndSortedBranches}
        emptyMessage="No branches found"
      />
    </BranchListContainer>
  );
};

export default BranchList;