import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const SearchContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: 2rem;
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: flex-end;
`;

const FilterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FileSearch = ({ branches = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    urgency: '',
    branch: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm: searchTerm.trim(),
      ...filters,
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <h3>Search Files</h3>
        <Button variant="text" size="small" onClick={() => setShowFilters(!showFilters)}>
          <FiFilter />
          {showFilters ? ' Hide Filters' : ' Show Filters'}
        </Button>
      </SearchHeader>

      <SearchForm onSubmit={handleSubmit}>
        <Input
          placeholder="Search by file no, subject or details"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<FiSearch />}
        />
        <Button type="submit">Search</Button>
      </SearchForm>

      {showFilters && (
        <FilterSection>
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Under Review', label: 'Under Review' },
              { value: 'Completed', label: 'Completed' },
            ]}
          />
          <Select
            label="Urgency"
            value={filters.urgency}
            onChange={(e) => handleFilterChange('urgency', e.target.value)}
            options={[
              { value: '', label: 'All Urgency Levels' },
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
          />
          <Select
            label="Branch"
            value={filters.branch}
            onChange={(e) => handleFilterChange('branch', e.target.value)}
            options={[
              { value: '', label: 'All Branches' },
              ...branches.map((branch) => ({
                value: branch._id,
                label: branch.name,
              })),
            ]}
          />
        </FilterSection>
      )}
    </SearchContainer>
  );
};

export default FileSearch;