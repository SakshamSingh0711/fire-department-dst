import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import Card from '../components/ui/Card';
import { FiFileText, FiUsers, FiHome, FiAlertTriangle } from 'react-icons/fi';

const HomeContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  p {
    color: ${({ theme }) => theme.palette.text.secondary};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const QuickActionButton = styled.button`
  background: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows[3]};
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  // Mock data - in a real app, this would come from an API
  const stats = [
    { title: 'Pending Files', value: 12, icon: <FiFileText />, color: 'warning' },
    { title: 'Personnel', value: 245, icon: <FiUsers />, color: 'info' },
    { title: 'Branches', value: 14, icon: <FiHome />, color: 'success' },
    { title: 'Urgent Alerts', value: 3, icon: <FiAlertTriangle />, color: 'error' },
  ];

  const quickActions = [
    { label: 'Create New File', icon: <FiFileText />, path: '/files/new' },
    { label: 'Add Personnel', icon: <FiUsers />, path: '/personnel/new' },
    { label: 'View Branches', icon: <FiHome />, path: '/branches' },
    { label: 'Generate Report', icon: <FiFileText />, path: '/admin/reports' },
  ];

  return (
    <HomeContainer>
      <WelcomeSection>
        <h1>Welcome, {user?.name || 'User'}</h1>
        <p>
          Fire Department Decision Support Tool helps you manage files, personnel,
          and branches efficiently. Get started by exploring the modules below.
        </p>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <Card key={index}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  background: 'rgba(207, 16, 32, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </div>
              <div>
                <h3>{stat.title}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </StatsGrid>

      <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
      <QuickActions>
        {quickActions.map((action, index) => (
          <QuickActionButton key={index}>
            {action.icon}
            <span>{action.label}</span>
          </QuickActionButton>
        ))}
      </QuickActions>
    </HomeContainer>
  );
};

export default Home;