import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './repositoryList.css';

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(
        'https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc'
      );
      setRepositories(response.data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

return (
  <div>
    <h2 className="repository-list-title">Repository List</h2>
    <ul className="repository-list">
      {repositories.map(repo => (
        <li className="repository-item" key={repo.id}>
          <Link to={`/repository/${repo.id}`} className="repository-link" data-testid="repository-link">{repo.full_name}</Link>
          <span className="star-rating" data-testid="star-rating">★ {repo.stargazers_count}</span>
        </li>
      ))}
    </ul>
  </div>
);
};


export default RepositoryList;
