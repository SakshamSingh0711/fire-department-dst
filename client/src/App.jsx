import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import store, { persistor } from './redux/store';
import { AuthContextProvider, AuthContext } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Alert from './components/common/Alert';
import Home from './pages/Home';
import Branches from './pages/Branches';
import Files from './pages/Files';
import Personnel from './pages/Personnel';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './pages/NotFound';
import useMediaQuery from './hooks/useMediaQuery';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  margin-top: 70px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: ${({ $sidebarOpen, $isMobile }) => 
    $isMobile ? '0' : $sidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContextProvider>
          <Router>
            <ThemeProvider theme={darkTheme}>
              <GlobalStyles />
              <AppContainer>
                <Navbar 
                  toggleSidebar={toggleSidebar} 
                  isMobile={isMobile} 
                  sidebarOpen={sidebarOpen}
                />
                <MainContent>
                  <Sidebar 
                    isOpen={sidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                    isMobile={isMobile} 
                  />
                  <ContentWrapper 
                    $sidebarOpen={sidebarOpen} 
                    $isMobile={isMobile}
                  >
                    <Alert />
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route 
                        path="/"
                        element={
                          <PrivateRoute>
                            <Home />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/branches/*"
                        element={
                          <PrivateRoute>
                            <Branches />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/files/*"
                        element={
                          <PrivateRoute>
                            <Files />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/personnel/*"
                        element={
                          <PrivateRoute>
                            <Personnel />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/admin/*"
                        element={
                          <PrivateRoute roles={["Master"]}>
                            <Admin />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <PrivateRoute>
                            <Profile />
                          </PrivateRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ContentWrapper>
                </MainContent>
                <Footer />
              </AppContainer>
            </ThemeProvider>
          </Router>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;