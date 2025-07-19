import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.palette.background.dark};

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    border-bottom: 2px solid ${({ theme }) => theme.palette.divider};
  }
`;

const TableBody = styled.tbody`
  tr {
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.palette.background.dark};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    }
  }

  td {
    padding: 1rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

const Table = ({ columns, data, emptyMessage, onRowClick }) => {
  if (data.length === 0) {
    return <EmptyMessage>{emptyMessage || 'No data available'}</EmptyMessage>;
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.cell ? column.cell(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;