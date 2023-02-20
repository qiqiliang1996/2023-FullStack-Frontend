import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import authReducer from '../src/state';

// const authReducer = {
//   mode: 'light',
//   user: {
//     email: 'test1@gmail.com',
//     firstName: 'test',
//     lastName: 'liang',
//     location: 'new york',
//     occupation: 'teacher',
//     picturePath: 'profile3.jpg',
//     _id: '63e2fe1aee8944e32fdb7391',
//   },
//   token: null,
//   posts: [],
// };

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: authReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
