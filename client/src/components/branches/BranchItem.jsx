import React from 'react';
import styled from 'styled-components';
import { FiHome, FiUsers, FiFileText } from 'react-icons/fi';
import Badge from '../ui/Badge';

const BranchItemContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border-left: 3px solid ${({ theme }) => theme.palette.primary.main};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows[3]};
  }
`;

const BranchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const BranchStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const BranchItem = ({ branch, onClick }) => {
  return (
    <BranchItemContainer onClick={onClick}>
      <BranchHeader>
        <h3>{branch.name}</h3>
        <Badge variant={branch.isActive ? 'success' : 'error'}>
          {branch.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </BranchHeader>
      <p>{branch.description || 'No description available'}</p>
      <BranchStats>
        <div>
          <FiUsers /> {branch.personnelCount || 0} Personnel
        </div>
        <div>
          <FiFileText /> {branch.activeFiles || 0} Active Files
        </div>
        <div>
          <FiHome /> {branch.code}
        </div>
      </BranchStats>
    </BranchItemContainer>
  );
};

export default BranchItem;