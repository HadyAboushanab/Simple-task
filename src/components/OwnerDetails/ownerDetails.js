import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ownerDetails.css';


const OwnerDetails = () => {
  const { login } = useParams();
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${login}`);
        setOwner(response.data);
      } catch (error) {
        console.error('Error fetching owner details:', error);
      }
    };

    fetchOwnerDetails();
  }, [login]);

  if (!owner) return <div>Loading...</div>;

  return (
    <div className="owner-details-container">
      <h2 className="owner-name">Owner Details</h2>
      <div>
        <img src={owner.avatar_url} alt="Owner Avatar" className="owner-avatar" />
        <p className="owner-name">Username: {owner.login}</p>
      </div>
      <p className="owner-bio">Bio: {owner.bio}</p>
      <p>
        <button onClick={() => window.open(owner.html_url, '_blank')} className="github-button">View on GitHub</button>
      </p>
      <p>
        <Link to="/" className="back-button">Back to List</Link>
      </p>
    </div>
  );
};


export default OwnerDetails;
