import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { renderWithProviders } from 'test-utils';
import LoginPage from '../LoginPage';
import '@testing-library/jest-dom';

const initialState = { mode: 'light', user: {}, token: null, posts: [] };
const mockStore = configureStore();
let store, wrapper;
store = mockStore(initialState);

const MockLoginPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );
};

describe('LoginPage', () => {
  it("should render title - Qiqi's FullStack Project on LoginPage", () => {
    // render(<MockLoginPage />);
    renderWithProviders(<MockLoginPage />); //clean way

    const typographyElement = screen.getByText(/Qiqi's FullStack Project/i);
    expect(typographyElement).toBeInTheDocument();
  });

  it('should render subtitle - Welcome to my fullstack website, please contact me if you have questions!', () => {
    // render(<MockLoginPage />);
    renderWithProviders(<MockLoginPage />); //clean way

    const typography2Element = screen.getByText(
      /Welcome to my fullstack website, please contact me if you have questions!/i
    );
    expect(typography2Element).toBeInTheDocument();
  });
});
