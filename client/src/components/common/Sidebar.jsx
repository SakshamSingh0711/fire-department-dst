import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { fadeIn } from '../../styles/animations';
import { FiHome, FiFile, FiUsers, FiSettings, FiChevronDown, FiChevronRight } from 'react-icons/fi';

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.dark};
  width: 250px;
  height: calc(100vh - 70px);
  position: fixed;
  top: 70px;
  left: 0;
  overflow-y: auto;
  transition: all 0.3s ease;
  z-index: 900;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease forwards;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    ${({ isOpen }) => isOpen && `transform: translateX(0);`}
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const MenuItem = styled.div`
  margin: 0.5rem 0;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;

  &:hover {
    background: rgba(207, 16, 32, 0.1);
    color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ active }) =>
    active &&
    `
    background: rgba(207, 16, 32, 0.2);
    color: ${({ theme }) => theme.palette.primary.main};
    border-left: 3px solid ${({ theme }) => theme.palette.primary.main};
  `}
`;

const MenuIcon = styled.span`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const MenuText = styled.span`
  flex-grow: 1;
`;

const SubMenu = styled.div`
  padding-left: 2.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;

  ${({ isOpen }) => isOpen && `max-height: 500px;`}
`;

const SubMenuLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ active }) =>
    active &&
    `
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 500;
  `}
`;

const ExpandIcon = styled.span`
  transition: transform 0.3s ease;
  ${({ isOpen }) => isOpen && `transform: rotate(90deg);`}
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    files: location.pathname.includes('/files'),
    personnel: location.pathname.includes('/personnel'),
    admin: location.pathname.includes('/admin'),
    branches: location.pathname.includes('/branches'),
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>Main Menu</SidebarHeader>

      <MenuItem>
        <MenuLink to="/" active={isActive('/')}>
          <MenuIcon>
            <FiHome />
          </MenuIcon>
          <MenuText>Dashboard</MenuText>
        </MenuLink>
      </MenuItem>

      <MenuItem>
        <MenuLink
          onClick={() => toggleMenu('files')}
          active={location.pathname.includes('/files')}
        >
          <MenuIcon>
            <FiFile />
          </MenuIcon>
          <MenuText>File Tracking</MenuText>
          <ExpandIcon isOpen={openMenus.files}>
            {openMenus.files ? <FiChevronDown /> : <FiChevronRight />}
          </ExpandIcon>
        </MenuLink>
        <SubMenu isOpen={openMenus.files}>
          <SubMenuLink
            to="/files/new"
            active={isActive('/files/new')}
          >
            Create New File
          </SubMenuLink>
          <SubMenuLink
            to="/files/pending"
            active={isActive('/files/pending')}
          >
            Pending Files
          </SubMenuLink>
          <SubMenuLink
            to="/files/completed"
            active={isActive('/files/completed')}
          >
            Completed Files
          </SubMenuLink>
        </SubMenu>
      </MenuItem>

      <MenuItem>
        <MenuLink
          onClick={() => toggleMenu('personnel')}
          active={location.pathname.includes('/personnel')}
        >
          <MenuIcon>
            <FiUsers />
          </MenuIcon>
          <MenuText>Personnel</MenuText>
          <ExpandIcon isOpen={openMenus.personnel}>
            {openMenus.personnel ? <FiChevronDown /> : <FiChevronRight />}
          </ExpandIcon>
        </MenuLink>
        <SubMenu isOpen={openMenus.personnel}>
          <SubMenuLink
            to="/personnel/list"
            active={isActive('/personnel/list')}
          >
            All Personnel
          </SubMenuLink>
          <SubMenuLink
            to="/personnel/transfers"
            active={isActive('/personnel/transfers')}
          >
            Transfer Requests
          </SubMenuLink>
          <SubMenuLink
            to="/personnel/vacancies"
            active={isActive('/personnel/vacancies')}
          >
            Vacancy Management
          </SubMenuLink>
        </SubMenu>
      </MenuItem>

      {user?.role === 'Master' && (
        <MenuItem>
          <MenuLink
            onClick={() => toggleMenu('admin')}
            active={location.pathname.includes('/admin')}
          >
            <MenuIcon>
              <FiSettings />
            </MenuIcon>
            <MenuText>Admin</MenuText>
            <ExpandIcon isOpen={openMenus.admin}>
              {openMenus.admin ? <FiChevronDown /> : <FiChevronRight />}
            </ExpandIcon>
          </MenuLink>
          <SubMenu isOpen={openMenus.admin}>
            <SubMenuLink
              to="/admin/dashboard"
              active={isActive('/admin/dashboard')}
            >
              Admin Dashboard
            </SubMenuLink>
            <SubMenuLink
              to="/admin/users"
              active={isActive('/admin/users')}
            >
              User Management
            </SubMenuLink>
            <SubMenuLink
              to="/admin/reports"
              active={isActive('/admin/reports')}
            >
              Reports
            </SubMenuLink>
          </SubMenu>
        </MenuItem>
      )}

      <MenuItem>
        <MenuLink
          onClick={() => toggleMenu('branches')}
          active={location.pathname.includes('/branches')}
        >
          <MenuIcon>
            <FiUsers />
          </MenuIcon>
          <MenuText>Branches</MenuText>
          <ExpandIcon isOpen={openMenus.branches}>
            {openMenus.branches ? <FiChevronDown /> : <FiChevronRight />}
          </ExpandIcon>
        </MenuLink>
        <SubMenu isOpen={openMenus.branches}>
          <SubMenuLink
            to="/branches/list"
            active={isActive('/branches/list')}
          >
            All Branches
          </SubMenuLink>
          <SubMenuLink
            to="/branches/workspaces"
            active={isActive('/branches/workspaces')}
          >
            Branch Workspaces
          </SubMenuLink>
        </SubMenu>
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;