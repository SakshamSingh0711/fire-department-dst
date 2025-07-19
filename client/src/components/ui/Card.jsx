import React from 'react';
import styled, { css } from 'styled-components';

const CardContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius || 8}px;
  box-shadow: ${({ theme }) => theme.shadows?.[1] || '0 2px 4px rgba(0,0,0,0.1)'};
  padding: ${({ $padding }) => $padding || '1.5rem'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;

  ${({ $hover, theme }) =>
    $hover &&
    css`
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.shadows?.[4] || '0 8px 16px rgba(0,0,0,0.2)'};
      }
    `}
`;

const Card = ({ children, padding, hover = true, ...props }) => {
  return (
    <CardContainer $padding={padding} $hover={hover} {...props}>
      {children}
    </CardContainer>
  );
};

export default Card;