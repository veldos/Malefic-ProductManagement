import React from 'react';
import AppRoutes from './Routes';
import styled from 'styled-components';
// import { AuthProvider } from './utils/AuthContext';
const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
`;
const App: React.FC = () => {
  return(
        <Container>

          <AppRoutes />
        </Container>
  

  );
};

export default App;
