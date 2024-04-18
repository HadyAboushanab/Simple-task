import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import OwnerDetails from './ownerDetails';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('OwnerDetails component', () => {
  test('renders owner details correctly', async () => {
    // Mock useParams hook
    const mockParams = { login: 'testuser' };
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => mockParams,
    }));

    // Mock axios.get function
    const mockData = {
      data: {
        login: 'testuser',
        avatar_url: 'testavatar',
        bio: 'testbio',
        html_url: 'testurl',
      },
    };
    axios.get.mockImplementation(() => Promise.resolve(mockData));

    // Render component
   render(
      <MemoryRouter initialEntries={['/testuser']}>
        <Route path="/:login">
          <OwnerDetails />
        </Route>
      </MemoryRouter>
    );

    // Wait for owner details to be fetched and component to rerender
    await waitFor(() => {
      expect(screen.getByText('Owner Details')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Username: testuser')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Bio: testbio')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByAltText('Owner Avatar')).toHaveAttribute('src', 'testavatar');
    });
    
    await waitFor(() => {
      expect(screen.getByText('View on GitHub')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Back to List')).toBeInTheDocument();
    });
    
  });
});
