import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login', () => {
  test('renders the Login component', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    getByPlaceholderText('enter username');
    getByPlaceholderText('enter password');
    getByRole('button', { name: 'Login' });
    getByText('SIGN IN');
    getByText('Forgot password?');
  });
});
