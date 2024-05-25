import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes, css } from '@emotion/react';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <CircularProgress
        size={80}
        sx={{
          animation: `${css(rotation)} 1s linear infinite`,
        }}
      />
      {showMessage && (
        <Typography variant="body1" mt={2}>
          This is taking longer than expected...
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;