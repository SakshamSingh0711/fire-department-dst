import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.palette.background.dark};
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Fire Department Decision Support Tool &copy; {new Date().getFullYear()}</p>
      <p>&copy; MocSoft Solutions - SakshamSingh0711</p>
    </FooterContainer>
  );
};

export default Footer;