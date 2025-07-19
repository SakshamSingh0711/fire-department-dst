import React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { fadeIn, slideIn } from '../../styles/animations';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[5]};
  width: ${({ size }) => 
    size === 'small' ? '400px' : 
    size === 'large' ? '900px' : 
    '600px'};
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease forwards;

  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.text.secondary};
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const Modal = ({ isOpen, onClose, title, children, size }) => {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent
        size={size}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <h2>{title}</h2>
          <button onClick={onClose}>
            <FiX />
          </button>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
};

export default Modal;