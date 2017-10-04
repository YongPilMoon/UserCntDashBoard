import axios from 'axios';
import { apiUrl } from './config';

const userApi = (() => {
  return {
    getUsers: (untilDate) => {
      return axios.get(`${apiUrl}/api/users/sevenData/${untilDate}`)
    },
  }
})();

export default userApi