import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../redux/slices/alertSlice';
import { FiX, FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const AlertContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  max-width: 400px;
`;

const AlertItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  display: flex;
  align-items: center;
  background: ${({ theme, variant }) => 
    variant === 'success' ? theme.palette.success.main :
    variant === 'error' ? theme.palette.error.main :
    variant === 'warning' ? theme.palette.warning.main :
    theme.palette.info.main};
  color: white;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  animation: fadeIn 0.3s ease forwards;
`;

const AlertMessage = styled.div`
  flex: 1;
  padding: 0 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const Alert = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.alert);

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheckCircle size={20} />;
      case 'error': return <FiAlertTriangle size={20} />;
      default: return <FiInfo size={20} />;
    }
  };

  return (
    <AlertContainer>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} variant={alert.type}>
          {getIcon(alert.type)}
          <AlertMessage>{alert.message}</AlertMessage>
          <CloseButton onClick={() => dispatch(hideAlert(alert.id))}>
            <FiX size={20} />
          </CloseButton>
        </AlertItem>
      ))}
    </AlertContainer>
  );
};

export default Alert;