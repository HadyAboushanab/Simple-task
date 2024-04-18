import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import RepositoryDetails from './repositoryDetails';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('RepositoryDetails component', () => {
  test('renders repository details correctly', async () => {
    // Mock useParams hook
    const mockParams = { id: '123' };
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => mockParams,
    }));

    // Mock axios.get function
    const mockData = {
      data: {
        full_name: 'testuser/testrepo',
        description: 'Test repository description',
        html_url: 'https://github.com/testuser/testrepo',
        owner: {
          login: 'testuser',
        },
      },
    };
    axios.get.mockResolvedValueOnce(mockData);

    // Render component
    render(
      <MemoryRouter initialEntries={['/repositories/123']}>
        <Route path="/repositories/:id">
          <RepositoryDetails />
        </Route>
      </MemoryRouter>
    );

    // Wait for repository details to be fetched and component to rerender
    await waitFor(() => {
      expect(screen.getByText('Repository Details')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Name: testuser/testrepo')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Description: Test repository description')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('View on GitHub')).toBeInTheDocument();
    });
    
    // Check for Owner link
    const ownerLink = screen.getByTestId('owner-link');
    expect(ownerLink).toBeInTheDocument();
    expect(ownerLink.href).toBe('http://localhost/owner/testuser');
    expect(ownerLink.textContent).toBe('testuser');
  });
});
