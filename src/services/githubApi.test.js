import axios from 'axios'; 
import { getRepositoryOwner } from './githubApi';

jest.mock('axios'); 

describe('getRepositoryOwner', () => {
  it('should return owner data on successful response', async () => {
    const mockData = { name: 'test-repo' };
    const ownerUrl = 'https://api.github.com/repos/owner/test-repo';

    axios.get.mockResolvedValueOnce({ data: mockData }); 

    const owner = await getRepositoryOwner(ownerUrl);

    expect(axios.get).toBeCalledWith(ownerUrl); 
    expect(owner).toEqual(mockData); 
  });

});
