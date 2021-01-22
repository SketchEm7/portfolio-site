import axios from 'axios';

const service = {
  fetchChess: async () => {
    return await axios.get('/api/chess/quick_mismatch');
  },

  fetchLongestStomp: async () => {
    return await axios.get('/api/chess/long_mismatch');
  }
};

export default service;
