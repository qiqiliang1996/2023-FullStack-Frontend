import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from 'pages/homePage/HomePage';
import ProfilePage from 'pages/profilePage/ProfilePage';
import LoginPage from 'pages/loginPage/LoginPage';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

function App() {
  // const mode = useSelector((state) => state.mode);
  const { user, mode, token } = useSelector((state) => state);
  // console.log('1 -- App.js page user,', user);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* css reset */}
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route
              path='/home'
              element={token ? <HomePage /> : <Navigate to='/' />}
            />
            <Route
              path='/profile/:userId'
              element={token ? <ProfilePage /> : <Navigate to='/' />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
