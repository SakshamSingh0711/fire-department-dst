import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  padding: ${({ padding }) => padding || '1.5rem'};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme, hover }) => hover ? theme.shadows[4] : theme.shadows[1]};
    transform: ${({ hover }) => hover ? 'translateY(-2px)' : 'none'};
  }
`;

const Card = ({ children, padding, hover = true, ...props }) => {
  return (
    <CardContainer padding={padding} hover={hover} {...props}>
      {children}
    </CardContainer>
  );
};

export default Card;