import React from 'react';
import styled, { css } from 'styled-components';
import { pulse } from '../../styles/animations';

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ size }) =>
    size === 'small' ? '0.5rem 1rem' :
    size === 'large' ? '0.875rem 1.75rem' :
    '0.75rem 1.5rem'};
  font-size: ${({ size }) =>
    size === 'small' ? '0.875rem' :
    size === 'large' ? '1.125rem' :
    '1rem'};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: ${({ $variant }) => ($variant === 'outlined' ? '1px solid' : 'none')};

  ${({ $variant, theme, color }) => {
    const colorValue = color || 'primary';
    return $variant === 'outlined'
      ? css`
          background: transparent;
          color: ${theme.palette[colorValue].main};
          border-color: ${theme.palette[colorValue].main};

          &:hover {
            background: ${theme.palette[colorValue].main}10;
          }
        `
      : css`
          background: ${theme.palette[colorValue].main};
          color: ${theme.palette[colorValue].contrastText};

          &:hover {
            background: ${theme.palette[colorValue].light};
            ${colorValue === 'primary' && `animation: ${pulse} 1.5s infinite`};
          }
        `;
  }}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    animation: none;
  }

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

const Button = ({
  children,
  startIcon,
  endIcon,
  variant = 'contained',
  fullWidth = false,
  type = 'button',
  size = 'medium',
  ...props
}) => {
  return (
    <ButtonStyled
      type={type}               // ✅ Ensures "submit" is passed to <button>
      $variant={variant}
      $fullWidth={fullWidth}
      size={size}
      {...props}
    >
      {startIcon && <span style={{ marginRight: '0.5rem' }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ marginLeft: '0.5rem' }}>{endIcon}</span>}
    </ButtonStyled>
  );
};

export default Button;