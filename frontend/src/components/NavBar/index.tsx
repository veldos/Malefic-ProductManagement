import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  background-color: #ffffff;
  padding: 20px 40px;
  margin : 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3a3838;
  z-index: 1000;
  width: 93%;
  text-decoration: none; 

`;

const GetToKnowMe = styled.h2`
  margin: 0;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  text-decoration: none; 
  position: relative;

`;

const NavItem = styled.li`
  cursor: pointer;
  z-index: 1;
  text-decoration: none;
  position: relative;
`;

const NavItemHover = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 0.5rem; /* Adjust the height of the hover effect */
  border-radius: 0.25rem; /* Adjust the border-radius of the hover effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow to the hover effect */
  opacity: 0; /* Initially hide the hover effect */
  transition: opacity 0.2s ease-in-out; 
  ${NavItem}:hover & {
    opacity: 1; /* Show the hover effect on hover */
  }
`;


const Link2 = styled.a`
  color: var(--text-ui-fg-default); /* Assuming default text color */
  text-decoration: none; /* Remove underline */
  transition: color 0.2s ease-in-out; /* Add hover transition */
  cursor: pointer; /* Indicate clickable behavior */

  &:hover {
    color: var(--text-ui-fg-base); /* Hover color */
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <GetToKnowMe>
      <Link2 href='/'> Malefic </Link2> 

      </GetToKnowMe>
      <NavList>
        <NavItem>
            <Link2 href='/'> Home </Link2> 
            <NavItemHover />
        </NavItem>
        <NavItem>
          <Link2 href='/products'> Store </Link2> 
            <NavItemHover />

        </NavItem>
        <NavItem>
          <Link2 href='/login'> Account </Link2> 
            <NavItemHover />

        </NavItem>
        {/* <NavItem>
        <Link2 href='/client/cart'> Cart </Link2> 
            <NavItemHover />
        </NavItem> */}
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;