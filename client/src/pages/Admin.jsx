import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import Reports from '../components/admin/Reports';
import Tabs from '../components/ui/Tabs';
import api from '../api/adminAPI';

const AdminContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const AdminHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  p {
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-top: 0.5rem;
  }
`;

const AdminContent = styled.div`
  margin-top: 2rem;
`;

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Role guard
  useEffect(() => {
    if (!user || user.role !== 'Master') {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await api.getDashboardStats();
        setStats(res);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'Master') {
      fetchStats();
    }
  }, [user]);

  // Sync tab from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['dashboard', 'users', 'reports'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard');
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin?tab=${tab}`);
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <h1>Admin Dashboard</h1>
        <p>Manage system-wide settings and view analytics</p>
      </AdminHeader>

      <Tabs
        tabs={[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'users', label: 'User Management' },
          { id: 'reports', label: 'Reports' },
        ]}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <AdminContent>
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} loading={isLoading} />
        )}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'reports' && <Reports />}
      </AdminContent>
    </AdminContainer>
  );
};

export default Admin;