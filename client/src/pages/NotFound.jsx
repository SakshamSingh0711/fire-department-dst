import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;

  h1 {
    font-size: 5rem;
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    max-width: 600px;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Button
        as={Link}           // ✅ use styled-components' built-in polymorphic prop
        to="/"
        $startIcon={<FiArrowLeft />}   // ✅ use transient prop
      >
        Back to Home
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;