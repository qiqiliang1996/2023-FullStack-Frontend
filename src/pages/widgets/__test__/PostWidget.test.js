import { render, screen } from '@testing-library/react';
import { renderWithProviders } from 'test-utils';
import PostWidget from '../PostWidget';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { themeSettings } from 'theme';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(themeSettings('light'));

const MockPostWidget = () => {
  const post = {
    _id: '63e56ebfd31674f08db1aaf5',
    firstName: 'DEV TEST',
    lastName: 'REAL',
    location: 'king county1',
    likes: {},
    comments: [],
    description: 'This is REAL TEST DESCRIPTION 1',
    userId: '63e56eb2d31674f08db1a810',
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PostWidget key='1' post={post} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('PostWidget', () => {
  it('should render a single post', () => {
    // renderWithProviders(<MockPostWidget />);
    // const divElements = screen.findByText(/This User does't have any post./i);
    // expect(divElements).toBeInTheDocument();
    // screen.debug();
  });
});
