import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const getRepositoryOwner = async (ownerUrl) => {
  try {
    const response = await axios.get(ownerUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository owner:', error);
    return null;
  }
};


export default githubApi;
