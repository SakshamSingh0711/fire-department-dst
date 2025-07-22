import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import BranchList from '../components/branches/BranchList';
import BranchForm from '../components/branches/BranchForm';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import api from '../api/branchesAPI';

const BranchesContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const BranchesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const BranchesContent = styled.div`
  margin-top: 2rem;
`;

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setIsLoading(true);
        const data = await api.getAllBranches();
        setBranches(data);
      } catch (error) {
        console.error('Error fetching branches:', error?.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['list', 'workspaces'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/branches?tab=${tab}`);
  };

  const handleCreateBranch = async (branchData) => {
    try {
      const newBranch = await api.createBranch(branchData);
      setBranches((prev) => [...prev, newBranch]);
      setShowCreateModal(false);
      setSelectedBranch(null);
      navigate('/admin/branches?tab=list');
    } catch (error) {
      console.error('Error creating branch:', error?.response?.data || error.message);
    }
  };

  const handleUpdateBranch = async (id, branchData) => {
    try {
      const updated = await api.updateBranch(id, branchData);
      setBranches((prev) => prev.map(branch => branch._id === id ? updated : branch));
      setShowCreateModal(false);
      setSelectedBranch(null);
      navigate('/admin/branches?tab=list');
    } catch (error) {
      console.error('Error updating branch:', error?.response?.data || error.message);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await api.deleteBranch(id);
      setBranches((prev) => prev.filter(branch => branch._id !== id));
    } catch (error) {
      console.error('Error deleting branch:', error?.response?.data || error.message);
    }
  };

  const handleEditClick = (branch) => {
    setSelectedBranch(branch);
    setShowCreateModal(true);
  };

  const handleModalCancel = () => {
    setShowCreateModal(false);
    setSelectedBranch(null);
    navigate('/admin/branches?tab=list');
  };

  return (
    <BranchesContainer>
      <BranchesHeader>
        <h1>Branch Management</h1>
        {user?.role === 'Master' && (
          <Button onClick={() => {
            setSelectedBranch(null);
            setShowCreateModal(true);
          }}>
            Add New Branch
          </Button>
        )}
      </BranchesHeader>

      {/* <Tabs
        tabs={[
          { id: 'list', label: 'All Branches' },
          { id: 'workspaces', label: 'Branch Workspaces' },
        ]}
        activeTab={activeTab}
        onChange={handleTabChange}
      /> */}

      <BranchesContent>
        {activeTab === 'list' && (
          <BranchList
            branches={branches}
            loading={isLoading}
            onEdit={handleEditClick}
            onDelete={handleDeleteBranch}
          />
        )}

        {activeTab === 'workspaces' && <div><h2>Branch Workspaces</h2></div>}
      </BranchesContent>

      <Modal
        isOpen={showCreateModal}
        onClose={handleModalCancel}
        title={selectedBranch ? 'Edit Branch' : 'Create New Branch'}
      >
        <BranchForm
          branch={selectedBranch}
          onSubmit={(data) => {
            if (selectedBranch) {
              handleUpdateBranch(selectedBranch._id, data);
            } else {
              handleCreateBranch(data);
            }
          }}
        />
      </Modal>
    </BranchesContainer>
  );
};

export default Branches;