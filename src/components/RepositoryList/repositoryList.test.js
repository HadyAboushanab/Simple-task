import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import RepositoryList from './repositoryList';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('RepositoryList component', () => {
  test('renders repository list correctly', async () => {
    // Mock axios.get function
    const mockData = {
      data: {
        items: [
          { id: 1, full_name: 'testuser/repo1', stargazers_count: 100 },
          { id: 2, full_name: 'testuser/repo2', stargazers_count: 200 },
        ],
      },
    };
    axios.get.mockResolvedValueOnce(mockData);

    // Render component
    render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/">
          <RepositoryList />
        </Route>
      </MemoryRouter>
    );
    
    
    // Wait for repository list to be fetched and component to rerender
    await waitFor(() => {
      expect(screen.getByText('Repository List')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('testuser/repo1')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('testuser/repo2')).toBeInTheDocument();
    });
    

    // Check for repository links
    const repositoryLinks = screen.getAllByTestId('repository-link');
    expect(repositoryLinks.length).toBe(2);
    expect(repositoryLinks[0]).toHaveAttribute('href', '/repository/1');
    expect(repositoryLinks[1]).toHaveAttribute('href', '/repository/2');

    // Check for star ratings
    const starRatings = screen.getAllByTestId('star-rating');
    expect(starRatings.length).toBe(2);
    expect(starRatings[0]).toHaveTextContent('★ 100');
    expect(starRatings[1]).toHaveTextContent('★ 200');
  });
});
