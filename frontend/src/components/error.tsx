import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <ErrorOutlineIcon color="error" fontSize="large" />
      <Typography variant="h6" color="error" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;