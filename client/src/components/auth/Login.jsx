import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";
import { pulse, shake } from "../../styles/animations";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Loading from "../common/Loading";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(30, 30, 30, 0.9)
    ),
    url("/assets/images/fire-department-bg.jpg") no-repeat center center/cover;
`;

const LoginForm = styled.form`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows[4]};
  animation: fadeIn 0.5s ease forwards;

  h2 {
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 500;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.error.main};
  margin-top: 1rem;
  text-align: center;
  animation: ${shake} 0.5s ease;
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  margin-top: 1rem;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};

  &:hover {
    background: ${({ theme }) => theme.palette.primary.light};
    animation: ${pulse} 1.5s infinite;
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.text.secondary};
    cursor: not-allowed;
    animation: none;
  }
`;

const Login = () => {
  const [credentials, setCredentials] = useState({
    idNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // ✅ Fix here
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(credentials); // ✅ Call correct login function
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Fire Department Login</h2>
        <FormGroup>
          <label htmlFor="idNumber">ID Number</label>
          <Input
            type="text"
            id="idNumber"
            name="idNumber"
            value={credentials.idNumber}
            onChange={handleChange}
            required
            placeholder="Enter your ID"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LoginButton type="submit" disabled={loading}>
          {loading ? <Loading size="small" /> : "Login"}
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;