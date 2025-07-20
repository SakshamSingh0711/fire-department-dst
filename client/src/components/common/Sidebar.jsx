import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import {
  FiHome, FiFile, FiUsers, FiSettings,
  FiChevronDown, FiChevronRight,
} from 'react-icons/fi';

const slideDown = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 500px; opacity: 1; }
`;

const slideUp = keyframes`
  from { max-height: 500px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
`;

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.dark};
  width: 250px;
  height: calc(100vh - 70px);
  position: fixed;
  top: 70px;
  left: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 900;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    transform: translateX(-100%);
    ${({ $isOpen }) => $isOpen && css`transform: translateX(0);`}
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const MenuItem = styled.div`margin: 0.25rem 0;`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  transition: background 0.2s ease;
  border-left: 3px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.transparent};
    color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: rgba(207, 16, 32, 0.2);
      color: ${theme.palette.primary.main};
      border-left: 3px solid ${theme.palette.primary.main};
    `}
`;

const MenuIcon = styled.span`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const MenuText = styled.span`flex-grow: 1;`;

const ExpandIcon = styled.span`
  transition: transform 0.3s ease;
  ${({ $isOpen }) => $isOpen && css`transform: rotate(90deg);`}
`;

const SubMenu = styled.div`
  padding-left: 2.5rem;
  overflow: hidden;
  animation: ${({ $isOpen }) => ($isOpen ? slideDown : slideUp)} 0.3s ease forwards;
`;

const SubMenuLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.palette.primary.main};
      font-weight: 500;
    `}
`;

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const reduxUser = useSelector((state) => state.auth.user);

  const user = useMemo(() => {
    if (reduxUser?.role) return reduxUser;
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  }, [reduxUser]);

  const role = user?.role?.toLowerCase();

  const [openMenus, setOpenMenus] = useState({
    files: location.pathname.startsWith('/files'),
    personnel: location.pathname.startsWith('/personnel'),
    admin: location.pathname.startsWith('/admin'),
    branches: location.pathname.startsWith('/branches'),
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  if (!role) return null;

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>Main Menu</SidebarHeader>

      <MenuItem>
        <MenuLink to="/" $active={isActive('/')}>
          <MenuIcon><FiHome /></MenuIcon>
          <MenuText>Dashboard</MenuText>
        </MenuLink>
      </MenuItem>

      {(role === 'master' || role === 'branch' || role === 'office') && (
        <MenuItem>
          <MenuLink as="div" onClick={() => toggleMenu('files')} $active={location.pathname.startsWith('/files')}>
            <MenuIcon><FiFile /></MenuIcon>
            <MenuText>File Tracking</MenuText>
            <ExpandIcon $isOpen={openMenus.files}>
              {openMenus.files ? <FiChevronDown /> : <FiChevronRight />}
            </ExpandIcon>
          </MenuLink>
          <SubMenu $isOpen={openMenus.files}>
            <SubMenuLink to="/files/new" $active={isActive('/files/new')}>Create New File</SubMenuLink>
            <SubMenuLink to="/files/pending" $active={isActive('/files/pending')}>Pending Files</SubMenuLink>
            <SubMenuLink to="/files/completed" $active={isActive('/files/completed')}>Completed Files</SubMenuLink>
          </SubMenu>
        </MenuItem>
      )}

      {(role === 'master' || role === 'branch' || role === 'office') && (
        <MenuItem>
          <MenuLink as="div" onClick={() => toggleMenu('personnel')} $active={location.pathname.startsWith('/personnel')}>
            <MenuIcon><FiUsers /></MenuIcon>
            <MenuText>Personnel</MenuText>
            <ExpandIcon $isOpen={openMenus.personnel}>
              {openMenus.personnel ? <FiChevronDown /> : <FiChevronRight />}
            </ExpandIcon>
          </MenuLink>
          <SubMenu $isOpen={openMenus.personnel}>
            <SubMenuLink to="/personnel/list" $active={isActive('/personnel/list')}>All Personnel</SubMenuLink>
            <SubMenuLink to="/personnel/transfers" $active={isActive('/personnel/transfers')}>Transfer Requests</SubMenuLink>
            <SubMenuLink to="/personnel/vacancies" $active={isActive('/personnel/vacancies')}>Vacancy Management</SubMenuLink>
          </SubMenu>
        </MenuItem>
      )}

      {role === 'master' && (
        <MenuItem>
          <MenuLink as="div" onClick={() => toggleMenu('admin')} $active={location.pathname.startsWith('/admin')}>
            <MenuIcon><FiSettings /></MenuIcon>
            <MenuText>Admin</MenuText>
            <ExpandIcon $isOpen={openMenus.admin}>
              {openMenus.admin ? <FiChevronDown /> : <FiChevronRight />}
            </ExpandIcon>
          </MenuLink>
          <SubMenu $isOpen={openMenus.admin}>
            <SubMenuLink to="/admin/dashboard" $active={isActive('/admin/dashboard')}>Admin Dashboard</SubMenuLink>
            <SubMenuLink to="/admin/users" $active={isActive('/admin/users')}>User Management</SubMenuLink>
            <SubMenuLink to="/admin/reports" $active={isActive('/admin/reports')}>Reports</SubMenuLink>
          </SubMenu>
        </MenuItem>
      )}

      {(role === 'master' || role === 'branch' || role === 'office') && (
        <MenuItem>
          <MenuLink as="div" onClick={() => toggleMenu('branches')} $active={location.pathname.startsWith('/branches')}>
            <MenuIcon><FiUsers /></MenuIcon>
            <MenuText>Branches</MenuText>
            <ExpandIcon $isOpen={openMenus.branches}>
              {openMenus.branches ? <FiChevronDown /> : <FiChevronRight />}
            </ExpandIcon>
          </MenuLink>
          <SubMenu $isOpen={openMenus.branches}>
            <SubMenuLink to="/branches/list" $active={isActive('/branches/list')}>All Branches</SubMenuLink>
            <SubMenuLink to="/branches/workspaces" $active={isActive('/branches/workspaces')}>Branch Workspaces</SubMenuLink>
          </SubMenu>
        </MenuItem>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;