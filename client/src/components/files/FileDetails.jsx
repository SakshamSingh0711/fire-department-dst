import React from 'react';
import styled from 'styled-components';
import { FiFileText, FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const FileDetailsContainer = styled.div`
  padding: 1rem;
`;

const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: ${({ theme }) => theme.palette.primary.main};
    margin: 0;
  }
`;

const FileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-weight: 500;
  }
`;

const FileContent = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const FileDetails = ({ file, onClose, onUpdate }) => {
  const handleStatusChange = (newStatus) => {
    onUpdate({ ...file, status: newStatus });
  };

  return (
    <FileDetailsContainer>
      <FileHeader>
        <h2>{file.fileNo}</h2>
        <Badge variant={
          file.status === 'Completed' ? 'success' :
          file.urgency === 'High' ? 'error' : 'warning'
        }>
          {file.status}
        </Badge>
      </FileHeader>

      <FileInfo>
        <InfoItem>
          <FiFileText />
          <div>
            <div>Subject</div>
            <span>{file.subject}</span>
          </div>
        </InfoItem>
        <InfoItem>
          <FiClock />
          <div>
            <div>Created</div>
            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
          </div>
        </InfoItem>
        <InfoItem>
          <FiUser />
          <div>
            <div>Created By</div>
            <span>{file.createdBy?.name || 'N/A'}</span>
          </div>
        </InfoItem>
        <InfoItem>
          <FiArrowRight />
          <div>
            <div>Current Branch</div>
            <span>{file.branch?.name || 'N/A'}</span>
          </div>
        </InfoItem>
      </FileInfo>

      <FileContent>
        <h3>Details</h3>
        <p>{file.details}</p>
      </FileContent>

      <Actions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        {file.status !== 'Completed' && (
          <Button onClick={() => handleStatusChange('Completed')}>
            Mark Complete
          </Button>
        )}
      </Actions>
    </FileDetailsContainer>
  );
};

export default FileDetails;