import React from 'react';
import { Box, Container } from '@mui/material';
import '../index.css';

const CentralizaBox = ({ children }) => {
  return (
    <Container
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        }}
    >
        <Box
        sx={{
            width: '100%',
            maxWidth: '400px',
            p: 3,
            boxShadow: 3,
            borderRadius: 1,
        }}
        >
        {children}
        </Box>
    </Container>
  );
};


export default CentralizaBox;
