import React from 'react';
import Navbar from './components/NavBar/index';
import Contact from './components/Contact';
import { Outlet } from 'react-router-dom';
// import styled from 'styled-components';
// const Container = styled.div`
//   margin-top: 2px;
//   padding: 6px;
//   /* background-image: url('./images/1.png'); // Set the background image using the imported  */

// `;

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
        <Outlet />
      <Contact/>
    </>
  );
};

export default Layout;