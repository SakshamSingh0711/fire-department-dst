import React from 'react';
import styled from 'styled-components';
import { FiArrowRight, FiUser, FiCalendar } from 'react-icons/fi';

const MovementLogContainer = styled.div`
  margin-top: 2rem;
`;

const MovementItem = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  &:last-child {
    border-bottom: none;
  }
`;

const MovementIcon = styled.div`
  margin-right: 1rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const MovementContent = styled.div`
  flex: 1;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    flex-wrap: wrap;
  }

  strong {
    margin-right: 0.25rem;
  }
`;

const FileMovementLog = ({ movements }) => {
  return (
    <MovementLogContainer>
      <h3>Movement History</h3>
      {movements?.length > 0 ? (
        movements.map((movement, index) => (
          <MovementItem key={index}>
            <MovementIcon>
              <FiArrowRight size={20} />
            </MovementIcon>
            <MovementContent>
              <div>
                <strong>From:</strong> {movement.fromBranch?.name || 'N/A'}
                <strong>To:</strong> {movement.toBranch?.name || 'N/A'}
              </div>
              <div>
                <FiUser size={14} />
                {movement.movedBy?.name || 'System'}
              </div>
              <div>
                <FiCalendar size={14} />
                {movement.createdAt
                  ? new Date(movement.createdAt).toLocaleString()
                  : 'Unknown time'}
              </div>
              {movement.comments && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Comments:</strong> {movement.comments}
                </div>
              )}
            </MovementContent>
          </MovementItem>
        ))
      ) : (
        <p>No movement history available</p>
      )}
    </MovementLogContainer>
  );
};

export default FileMovementLog;