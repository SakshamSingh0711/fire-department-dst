import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import api from '../../api/adminAPI';
import Button from '../ui/Button';
import Select from '../ui/Select';

const ReportsContainer = styled.div`
  padding: 1rem;
`;

const ReportForm = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: 2rem;
`;

const Reports = () => {
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await api.generateReport(reportType);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${reportType}-${new Date().toISOString().slice(0,10)}.pdf`;
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ReportsContainer>
      <h2>Generate Reports</h2>
      <ReportForm>
        <Select
          label="Report Type"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          options={[
            { value: 'summary', label: 'System Summary' },
            { value: 'personnel', label: 'Personnel List' },
            { value: 'files', label: 'Files Tracking' },
            { value: 'transfers', label: 'Transfer Requests' }
          ]}
        />
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{ marginTop: '1rem' }}
        >
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>
      </ReportForm>
    </ReportsContainer>
  );
};

export default Reports;