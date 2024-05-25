import React from 'react';
import { Heading } from "@medusajs/ui";
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Using react-router-dom for routing

// Define base styles for the outer container
const Container = styled.div`
  height: 99vh;
  width: 100%; /* Ensures full width */
  border-bottom: 1px solid ${({ theme }) => theme.colors.uiBorderBase}; /* Assuming theme object for colors */
  background-color: ${({ theme }) => theme.colors.uiBgSubtle}; /* Assuming theme object for colors */
  position: relative;
`;

// Define styles for the inner container
const InnerContainer = styled.div`
  position: absolute;
  inset: 0; /* Top, right, bottom, left: 0 */
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px ; /* Conditional padding for small screens */
  gap: 6px;
`;

// Define styles for the text content
const TextContent = styled.span`
  display: flex; /* Ensures content alignment within the flex container */
  flex-direction: column;
  align-items: center;
`;
 const Button = styled.button`
   background-color: #f1eeee; // Blue color
   color: #0f0f0f; // White text
   border: 1px solid  #000000;
   padding: 10px 20px;
   border-radius: 5px;
   cursor: pointer;
   transition: all 0.2s ease-in-out;

   &:hover {
     background-color: #a3a7a4; // Darker blue on hover
   }
 `;

const HomePage: React.FC = () => {
  
  const theme = {
    colors: {
      uiBorderBase: '#F9FAFB',
      uiBgSubtle: '#F9FAFB',
    },
  };

  return (
    <Container theme={theme}>
      <InnerContainer>
        <TextContent>
          <Heading>Brilliant Emporuim</Heading>
          <Heading level="h2"> Product management Website</  Heading>
        </TextContent>
        <Link to="/products"> {/* Replace "/productList" with your actual product list route */}
          <Button >View Product List
          </Button>
        </Link>
      </InnerContainer>
    </Container>
  );
};
export default HomePage;