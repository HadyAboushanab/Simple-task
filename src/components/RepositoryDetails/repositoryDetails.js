import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './repositoryDetails.css';

const RepositoryDetails = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repositories/${id}`);
        setRepository(response.data);
      } catch (error) {
        console.error('Error fetching repository details:', error);
      }
    };

    fetchRepositoryDetails();
  }, [id]);

  if (!repository) return <div>Loading...</div>;
  return (
    <div className="repository-details-container">
      <h2 className="repository-name">Repository Details</h2>
      <p className="repository-name">Name: {repository.full_name}</p>
      <p className="repository-description">Description: {repository.description}</p>
      <p>
        <button onClick={() => window.open(repository.html_url, '_blank')} className="github-button">View on GitHub</button>
      </p>
      <p>
        Owner: <Link to={`/owner/${repository.owner.login}`} className="owner-link" data-testid="owner-link">{repository.owner.login}</Link>
      </p>
    </div>
  );
};

export default RepositoryDetails;
