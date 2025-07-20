// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { darkTheme } from './styles/theme';
// import { GlobalStyles } from './styles/GlobalStyles';
// import store, { persistor } from './redux/store';
// import AuthContextProvider from './contexts/AuthContext';
// import Navbar from './components/common/Navbar';
// import Sidebar from './components/common/Sidebar';
// import Footer from './components/common/Footer';
// import Alert from './components/common/Alert';
// import Home from './pages/Home';
// import Branches from './pages/Branches';
// import Files from './pages/Files';
// import Personnel from './pages/Personnel';
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import useMediaQuery from './hooks/useMediaQuery';
// import styled from 'styled-components';

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// `;

// const MainContent = styled.div`
//   display: flex;
//   flex: 1;
//   margin-top: 70px;
// `;

// const ContentWrapper = styled.div`
//   flex: 1;
//   padding: 2rem;
//   margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '250px' : '0')};
//   transition: margin-left 0.3s ease;

//   @media (max-width: 768px) {
//     margin-left: 0;
//     padding: 1rem;
//   }
// `;

// const App = () => {
//   const isMobile = useMediaQuery('(max-width: 768px)');
//   const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Router>
//           <ThemeProvider theme={darkTheme}>
//             <GlobalStyles />
//             <AuthContextProvider>
//               <AppContainer>
//                 <Navbar toggleSidebar={toggleSidebar} />
//                 <MainContent>
//                   <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//                   <ContentWrapper $sidebarOpen={sidebarOpen && !isMobile}>
//                     <Alert />
//                     <Routes>
//                       <Route path="/login" element={<Login />} />
//                       <Route path="/register" element={<Register />} />
//                       <Route path="/" element={<Home />} />
//                       <Route
//                         path="/branches/*"
//                         element={
//                           <ProtectedRoute>
//                             <Branches />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/files/*"
//                         element={
//                           <ProtectedRoute>
//                             <Files />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/personnel/*"
//                         element={
//                           <ProtectedRoute>
//                             <Personnel />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/admin/*"
//                         element={
//                           <ProtectedRoute roles={['Master']}>
//                             <Admin />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route
//                         path="/profile"
//                         element={
//                           <ProtectedRoute>
//                             <Profile />
//                           </ProtectedRoute>
//                         }
//                       />
//                       <Route path="*" element={<NotFound />} />
//                     </Routes>
//                   </ContentWrapper>
//                 </MainContent>
//                 <Footer />
//               </AppContainer>
//             </AuthContextProvider>
//           </ThemeProvider>
//         </Router>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import store, { persistor } from './redux/store';
import { AuthContextProvider } from './contexts/AuthContext';
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
import ProtectedRoute from './components/common/ProtectedRoute';
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
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <AuthContextProvider>
              <AppContainer>
                <Navbar toggleSidebar={toggleSidebar} />
                <MainContent>
                  <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                  <ContentWrapper $sidebarOpen={sidebarOpen && !isMobile}>
                    <Alert />
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/branches/*"
                        element={
                          <ProtectedRoute>
                            <Branches />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/files/*"
                        element={
                          <ProtectedRoute>
                            <Files />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/personnel/*"
                        element={
                          <ProtectedRoute>
                            <Personnel />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/*"
                        element={
                          <ProtectedRoute roles={["Master"]}>
                            <Admin />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ContentWrapper>
                </MainContent>
                <Footer />
              </AppContainer>
            </AuthContextProvider>
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;