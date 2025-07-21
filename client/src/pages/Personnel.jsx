import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import PersonnelList from '../components/personnel/PersonnelList';
import PersonnelForm from '../components/personnel/PersonnelForm';
import TransferForm from '../components/personnel/TransferForm';
import VacancyManager from '../components/personnel/VacancyManager';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import api from '../api/personnelAPI';
import branchesAPI from '../api/branchesAPI';
import EditPersonnel from '../components/personnel/EditPersonnel';

const PersonnelContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const PersonnelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const PersonnelContent = styled.div`
  margin-top: 2rem;
`;

const Personnel = () => {
  const [personnel, setPersonnel] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [personnelRes, branchRes] = await Promise.all([
          api.getAllPersonnel(),
          branchesAPI.getAllBranches()
        ]);
        setPersonnel(personnelRes.data);
        setBranches(branchRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['list', 'transfers', 'vacancies'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/personnel?tab=${tab}`);
  };

  const handleCreatePerson = async (personData) => {
    try {
      const response = await api.createPersonnel(personData);
      setPersonnel([...personnel, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating personnel:', error);
    }
  };

  const handleUpdatePerson = async (id, personData) => {
    try {
      const response = await api.updatePersonnel(id, personData);
      setPersonnel(
        personnel.map((person) =>
          person._id === id ? response.data : person
        )
      );
    } catch (error) {
      console.error('Error updating personnel:', error);
    }
  };

  const handleCreateTransfer = async (transferData) => {
    try {
      await api.createTransfer(transferData);
      const response = await api.getAllPersonnel();
      setPersonnel(response.data);
      setShowTransferModal(false);
    } catch (error) {
      console.error('Error creating transfer:', error);
    }
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  return (
    <PersonnelContainer>
      <PersonnelHeader>
        <h1>Personnel Management</h1>
        {user?.role !== 'Branch' && (
          <Button onClick={() => setShowCreateModal(true)}>
            Add New Personnel
          </Button>
        )}
      </PersonnelHeader>

      <Tabs
        tabs={[
          { id: 'list', label: 'Personnel List' },
          { id: 'transfers', label: 'Transfer Requests' },
          { id: 'vacancies', label: 'Vacancy Management' },
        ]}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <PersonnelContent>
        {activeTab === 'list' && (
          <PersonnelList
            personnel={personnel}
            loading={isLoading}
            onPersonClick={handlePersonClick}
            onUpdate={handleUpdatePerson}
          />
        )}

        {activeTab === 'transfers' && (
          <div>
            <h2>Transfer Requests</h2>
          </div>
        )}

        {activeTab === 'vacancies' && <VacancyManager />}
      </PersonnelContent>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Personnel"
      >
        <PersonnelForm
          onSubmit={handleCreatePerson}
          onCancel={() => setShowCreateModal(false)}
          branches={branches}
        />
      </Modal>

      <Modal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        title={`Transfer Request for ${selectedPerson?.name || 'Personnel'}`}
      >
        {selectedPerson && (
          <TransferForm
            person={selectedPerson}
            onSubmit={handleCreateTransfer}
            onCancel={() => setShowTransferModal(false)}
          />
        )}
      </Modal>

      {/* Edit Personnel Modal */}
      <Modal
        isOpen={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        title={`Edit Personnel: ${selectedPerson?.name}`}
      >
        {selectedPerson && (
          <EditPersonnel
            id={selectedPerson._id}
            isOpen={!!selectedPerson}
            onClose={() => setSelectedPerson(null)}
          />
        )}
      </Modal>
    </PersonnelContainer>
  );
};

export default Personnel;