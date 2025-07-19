import React from 'react';
import styled from 'styled-components';
import { FiFileText, FiClock, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import Table from '../ui/Table';
import Loading from '../common/Loading';
import Badge from '../ui/Badge';
import { fadeIn } from '../../styles/animations';

const FileListContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const StatusBadge = styled(Badge)`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
`;

const FileList = ({ files, loading, onFileClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FiClock />;
      case 'Completed':
        return <FiCheckCircle />;
      case 'Urgent':
        return <FiAlertTriangle />;
      default:
        return <FiFileText />;
    }
  };

  const columns = [
    {
      header: 'File No.',
      accessor: 'fileNo',
      cell: (row) => (
        <span style={{ fontWeight: 500, cursor: 'pointer' }} onClick={() => onFileClick(row)}>
          {row.fileNo}
        </span>
      ),
    },
    {
      header: 'Subject',
      accessor: 'subject',
      cell: (row) => <span style={{ maxWidth: '300px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.subject}</span>,
    },
    {
      header: 'Branch',
      accessor: 'branch',
      cell: (row) => row.branch?.name || 'N/A',
    },
    {
      header: 'Received From',
      accessor: 'receivedFrom',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <StatusBadge
          variant={
            row.status === 'Completed'
              ? 'success'
              : row.urgency === 'High'
              ? 'error'
              : 'warning'
          }
        >
          {getStatusIcon(row.status)}
          {row.status}
        </StatusBadge>
      ),
    },
    {
      header: 'Last Updated',
      accessor: 'updatedAt',
      cell: (row) => new Date(row.updatedAt).toLocaleDateString(),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <FileListContainer>
      <Table
        columns={columns}
        data={files}
        emptyMessage="No files found"
        onRowClick={onFileClick}
      />
    </FileListContainer>
  );
};

export default FileList;