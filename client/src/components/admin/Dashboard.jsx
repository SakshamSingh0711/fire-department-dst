import React from 'react';
import styled from 'styled-components';
import { FiFileText, FiUsers, FiHome, FiAlertTriangle, FiTrendingUp, FiClock } from 'react-icons/fi';
import Card from '../ui/Card';
import Loading from '../common/Loading';
import { fadeIn } from '../../styles/animations';
import Chart from '../ui/Chart';

const DashboardContainer = styled.div`
  animation: ${fadeIn} 0.5s ease forwards;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;

  .icon {
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 50%;
    background: ${({ theme, variant }) => 
      variant === 'primary' ? 'rgba(207, 16, 32, 0.1)' :
      variant === 'success' ? 'rgba(76, 175, 80, 0.1)' :
      variant === 'warning' ? 'rgba(255, 152, 0, 0.1)' :
      'rgba(33, 150, 243, 0.1)'};
    color: ${({ theme, variant }) => 
      variant === 'primary' ? theme.palette.primary.main :
      variant === 'success' ? theme.palette.success.main :
      variant === 'warning' ? theme.palette.warning.main :
      theme.palette.info.main};
  }

  .content {
    flex: 1;

    h3 {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.palette.text.secondary};
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .trend {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
      margin-top: 0.3rem;
      color: ${({ theme, trend }) => 
        trend === 'up' ? theme.palette.success.main : theme.palette.error.main};
    }
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const AlertsSection = styled(Card)`
  margin-top: 2rem;
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const AlertItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  &:last-child {
    border-bottom: none;
  }

  .icon {
    color: ${({ theme }) => theme.palette.error.main};
    font-size: 1.2rem;
    margin-top: 0.2rem;
  }

  .content {
    flex: 1;

    h4 {
      margin: 0 0 0.3rem 0;
    }

    p {
      margin: 0;
      color: ${({ theme }) => theme.palette.text.secondary};
      font-size: 0.9rem;
    }
  }
`;

const Dashboard = ({ stats, loading }) => {
  if (loading) {
    return <Loading />;
  }

  // Mock data for charts and alerts
  const fileStatusData = {
    labels: ['Pending', 'Under Review', 'Completed', 'Rejected'],
    datasets: [
      {
        data: [12, 8, 20, 3],
        backgroundColor: [
          '#FF9800',
          '#2196F3',
          '#4CAF50',
          '#F44336',
        ],
      },
    ],
  };

  const branchActivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Files Created',
        data: [12, 19, 15, 22, 18, 25],
        borderColor: '#CF1020',
        backgroundColor: 'rgba(207, 16, 32, 0.1)',
        fill: true,
      },
      {
        label: 'Files Resolved',
        data: [8, 12, 10, 15, 12, 18],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
      },
    ],
  };

  const alerts = [
    {
      id: 1,
      title: 'High priority file pending for more than 5 days',
      description: 'File #FD-2023-0456 is pending with IT Cell branch',
    },
    {
      id: 2,
      title: 'Estate branch understaffed',
      description: 'Estate branch is operating with only 60% of required personnel',
    },
    {
      id: 3,
      title: 'Training branch has no upcoming sessions',
      description: 'No training sessions scheduled for next month',
    },
  ];

  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard variant="primary">
          <div className="icon">
            <FiFileText />
          </div>
          <div className="content">
            <h3>Total Files</h3>
            <p>{stats?.totalFiles || 0}</p>
            <div className="trend" trend="up">
              <FiTrendingUp /> 12% from last month
            </div>
          </div>
        </StatCard>

        <StatCard variant="info">
          <div className="icon">
            <FiUsers />
          </div>
          <div className="content">
            <h3>Total Personnel</h3>
            <p>{stats?.totalPersonnel || 0}</p>
            <div className="trend" trend="up">
              <FiTrendingUp /> 5% from last quarter
            </div>
          </div>
        </StatCard>

        <StatCard variant="success">
          <div className="icon">
            <FiHome />
          </div>
          <div className="content">
            <h3>Active Branches</h3>
            <p>{stats?.activeBranches || 0}</p>
          </div>
        </StatCard>

        <StatCard variant="warning">
          <div className="icon">
            <FiAlertTriangle />
          </div>
          <div className="content">
            <h3>Pending Files</h3>
            <p>{stats?.pendingFiles || 0}</p>
            <div className="trend" trend="down">
              <FiClock /> 3 overdue
            </div>
          </div>
        </StatCard>
      </StatsGrid>

      <ChartsContainer>
        <ChartCard>
          <h3>File Status Distribution</h3>
          <Chart type="doughnut" data={fileStatusData} />
        </ChartCard>

        <ChartCard>
          <h3>Branch Activity (Last 6 Months)</h3>
          <Chart type="line" data={branchActivityData} />
        </ChartCard>
      </ChartsContainer>

      <AlertsSection>
        <h3>Urgent Alerts</h3>
        {alerts.map((alert) => (
          <AlertItem key={alert.id}>
            <div className="icon">
              <FiAlertTriangle />
            </div>
            <div className="content">
              <h4>{alert.title}</h4>
              <p>{alert.description}</p>
            </div>
          </AlertItem>
        ))}
      </AlertsSection>
    </DashboardContainer>
  );
};

export default Dashboard;