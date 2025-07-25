import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { glow } from "../../styles/animations";
import Badge from "../ui/Badge";

const NavbarContainer = styled.nav`
  background: ${({ theme }) => theme.palette.background.dark};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 60px;
    margin-right: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.palette.primary.main},
      ${({ theme }) => theme.palette.secondary.main}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.light};
    background: rgba(207, 16, 32, 0.1);
  }

  &.active {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 600;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    animation: ${glow} 1.5s infinite;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[4]};
  padding: 0.5rem 0;
  min-width: 180px;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;

  ${UserInfo}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.palette.text.primary};

  &:hover {
    background: ${({ theme }) => theme.palette.background.dark};
    color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : parts[0][0];
  };

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate("/")}>
        <img src="/image.png" alt="Fire Department Logo" />
        <h1> FD-DST : Fire Department Decision Support Tool</h1>
      </Logo>
      <NavItems>
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/files">File Tracking</NavLink>
            <NavLink to="/personnel">Personnel</NavLink>
            <NavLink to="/branches">Branches</NavLink>
            {user?.role === "Master" && <NavLink to="/admin">Admin</NavLink>}
            <UserInfo>
              <Badge content={user.role} position="top-right">
                <UserAvatar>{getInitials(user.name)}</UserAvatar>
              </Badge>
              <DropdownMenu>
                <DropdownItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </UserInfo>
          </>
        )}
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
