// src/pages/Designation.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import DesignationList from '../components/designation/DesignationList';
import DesignationForm from '../components/designation/DesignationForm';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
// Import the functions from your API file
import { fetchDesignations, createDesignation, updateDesignation, deleteDesignation } from '../api/designationAPI';

const DesignationsContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const DesignationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const DesignationsContent = styled.div`
  margin-top: 2rem;
`;

const Designation = () => {
  const [designations, setDesignations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const loadDesignations = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDesignations();
      setDesignations(data);
    } catch (error) {
      console.error('Error fetching designations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDesignations();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDesignation(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedDesignation) {
        await updateDesignation(selectedDesignation._id, formData);
      } else {
        await createDesignation(formData);
      }
      handleModalClose();
      loadDesignations(); // Refresh the list
    } catch (error) {
      console.error('Error saving designation:', error);
    }
  };

  const handleDelete = async (id) => {
    // Using a simple confirm dialog for now
    if (window.confirm('Are you sure you want to delete this designation?')) {
      try {
        await deleteDesignation(id);
        loadDesignations(); // Refresh the list
      } catch (error) {
        console.error('Error deleting designation:', error);
      }
    }
  };

  const handleEditClick = (designation) => {
    setSelectedDesignation(designation);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedDesignation(null);
    setShowModal(true);
  };

  return (
    <DesignationsContainer>
      <DesignationsHeader>
        <h1>Designation Management</h1>
        {user?.role === 'Master' && (
          <Button onClick={handleAddClick}>
            Add New Designation
          </Button>
        )}
      </DesignationsHeader>

      <DesignationsContent>
        <DesignationList
          designations={designations}
          loading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </DesignationsContent>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={selectedDesignation ? 'Edit Designation' : 'Create New Designation'}
      >
        <DesignationForm
          designation={selectedDesignation}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </DesignationsContainer>
  );
};

export default Designation;