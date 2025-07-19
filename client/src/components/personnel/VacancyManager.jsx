import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import api from '../../api/personnelAPI';
import Chart from '../ui/Chart';
import Table from '../ui/Table';

const VacancyContainer = styled.div`
  padding: 1rem;
`;

const VacancyStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VacancyManager = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { branches } = useSelector((state) => state.branches);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await api.getVacancies();
        setVacancies(response.data);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  const chartData = {
    labels: vacancies.map(v => v.branch.name),
    datasets: [{
      label: 'Vacancy Percentage',
      data: vacancies.map(v => v.vacancyPercentage),
      backgroundColor: vacancies.map(v => 
        v.vacancyPercentage > 30 ? '#f44336' :
        v.vacancyPercentage > 15 ? '#ff9800' : '#4caf50'
      )
    }]
  };

  const columns = [
    { header: 'Branch', accessor: 'branch', cell: (row) => row.branch.name },
    { header: 'Required', accessor: 'required' },
    { header: 'Current', accessor: 'current' },
    { 
      header: 'Vacancy %', 
      accessor: 'vacancyPercentage',
      cell: (row) => `${row.vacancyPercentage}%`
    },
    { header: 'Status', accessor: 'status' }
  ];

  if (loading) {
    return <div>Loading vacancy data...</div>;
  }

  return (
    <VacancyContainer>
      <h2>Branch Vacancy Management</h2>
      <VacancyStats>
        <Chart type="bar" data={chartData} />
      </VacancyStats>
      <Table 
        columns={columns} 
        data={vacancies} 
        emptyMessage="No vacancy data available"
      />
    </VacancyContainer>
  );
};

export default VacancyManager;