import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../styles/animations';
import FileList from '../components/files/FileList';
import FileSearch from '../components/files/FileSearch';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import FileCreateForm from '../components/files/FileCreateForm';
import FileDetails from '../components/files/FileDetails';
import api from '../api/filesAPI';

const FilesContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const FilesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const FilesContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Files = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const response = await api.getFiles();
        setFiles(response.data);
        setFilteredFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    // Check if URL has a file ID to show details
    const params = new URLSearchParams(location.search);
    const fileId = params.get('id');
    if (fileId) {
      const file = files.find((f) => f._id === fileId);
      if (file) {
        setSelectedFile(file);
        setShowDetailsModal(true);
      }
    }
  }, [location.search, files]);

  const handleSearch = (filters) => {
    let result = [...files];

    if (filters.status) {
      result = result.filter((file) => file.status === filters.status);
    }

    if (filters.urgency) {
      result = result.filter((file) => file.urgency === filters.urgency);
    }

    if (filters.branch) {
      result = result.filter((file) => file.branch._id === filters.branch);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (file) =>
          file.fileNo.toLowerCase().includes(term) ||
          file.subject.toLowerCase().includes(term) ||
          file.details.toLowerCase().includes(term)
      );
    }

    setFilteredFiles(result);
  };

  const handleCreateFile = async (fileData) => {
    try {
      const response = await api.createFile(fileData);
      setFiles([...files, response.data]);
      setFilteredFiles([...filteredFiles, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setShowDetailsModal(true);
    navigate(`/files?id=${file._id}`);
  };

  const handleUpdateFile = async (updatedFile) => {
    try {
      await api.updateFile(selectedFile._id, updatedFile);
      const updatedFiles = files.map((file) =>
        file._id === selectedFile._id ? { ...file, ...updatedFile } : file
      );
      setFiles(updatedFiles);
      setFilteredFiles(updatedFiles);
      setSelectedFile({ ...selectedFile, ...updatedFile });
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    navigate('/files');
  };

  return (
    <FilesContainer>
      <FilesHeader>
        <h1>File Tracking System</h1>
        {user?.role !== 'Branch' && (
          <Button onClick={() => setShowCreateModal(true)}>Create New File</Button>
        )}
      </FilesHeader>

      <FilesContent>
        <FileSearch onSearch={handleSearch} />
        <FileList
          files={filteredFiles}
          loading={isLoading}
          onFileClick={handleFileClick}
        />
      </FilesContent>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New File"
      >
        <FileCreateForm
          onSubmit={handleCreateFile}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showDetailsModal}
        onClose={handleCloseDetails}
        title="File Details"
        size="large"
      >
        {selectedFile && (
          <FileDetails
            file={selectedFile}
            onUpdate={handleUpdateFile}
            onClose={handleCloseDetails}
          />
        )}
      </Modal>
    </FilesContainer>
  );
};

export default Files;