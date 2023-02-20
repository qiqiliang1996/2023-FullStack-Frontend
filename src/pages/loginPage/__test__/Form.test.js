import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { themeSettings } from 'theme';
import { createTheme } from '@mui/material/styles';
import { renderWithProviders } from 'test-utils';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '../Form';
import '@testing-library/jest-dom';
// import { act } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const initialState = { mode: 'light', user: {}, token: null, posts: [] };
const mockStore = configureStore();
const theme = createTheme(themeSettings('light'));
let store, wrapper;
store = mockStore(initialState);

// const MockForm = () => {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <Form />
//         </ThemeProvider>
//       </BrowserRouter>
//     </Provider>
//   );
// }; //old way

//new way
const MockForm = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Form', () => {
  it("should initially render 'Don't have an account? Sign Up here.' ", () => {
    renderWithProviders(<MockForm />);

    const typographyElement = screen.queryByText(
      "Don't have an account? Sign Up here."
    );
    // screen.debug();
    expect(typographyElement).not.toBeNull();
  });

  it("should render 'Already have an account? Login here.' ", () => {
    // render(<MockForm />);
    renderWithProviders(<MockForm />);

    const typographyElement = screen.queryByText(
      "Don't have an account? Sign Up here."
    );
    fireEvent.click(typographyElement);
    expect(typographyElement.textContent).toMatch(
      'Already have an account? Login here.'
    );
  });

  it("should render input element' ", () => {
    // render(<MockForm />);
    renderWithProviders(<MockForm />);

    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type into input', async () => {
    renderWithProviders(<MockForm />);

    const inputElement = screen.getByLabelText(/email/i);
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'test1@gmail.com' } });
    });

    //SAME as
    // await act(async () => {
    //   userEvent.type(inputElement, 'test1@gmail.com');
    // });
    // expect(inputElement).toHaveValue('test1@gmail.com');

    expect(inputElement.value).toBe('test1@gmail.com');
  });

  it('should have empty input when add button is cliked', async () => {
    renderWithProviders(<MockForm />);

    const emailElement = screen.getByLabelText(/email/i);

    await act(async () => {
      fireEvent.change(emailElement, { target: { value: 'test1@gmail.com' } });
    });
    const passwordElement = screen.getByLabelText(/password/i);
    await act(async () => {
      fireEvent.change(passwordElement, { target: { value: '123456' } });
    });

    const buttonElement = screen.getByRole('button', { name: /LOGIN/i });
    fireEvent.click(buttonElement);

    await waitFor(() => expect(emailElement.value).toBe(''));
  });

  //   it('should update redux store if email and password are correct', async () => {
  //     renderWithProviders(<MockForm />);

  //     const emailElement = screen.getByLabelText(/email/i);

  //     await act(async () => {
  //       fireEvent.change(emailElement, { target: { value: 'test1@gmail.com' } });
  //     });
  //     const passwordElement = screen.getByLabelText(/password/i);
  //     await act(async () => {
  //       fireEvent.change(passwordElement, { target: { value: '123456' } });
  //     });

  //     const buttonElement = screen.getByRole('button', { name: /LOGIN/i });
  //     await act(async () => {
  //       fireEvent.click(buttonElement);
  //     });

  //   });
});
