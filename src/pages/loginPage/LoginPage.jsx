import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';
function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1100px)');

  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color='primary'>
          Qiqi's FullStack
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='3rem'
        m='3rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight='500'
          variant='h5'
          sx={{ mb: '1.5rem', textAlign: 'center' }}
        >
          Welcome to Qiqi's fullstack website, please contact me if you have
          questions!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default LoginPage;
