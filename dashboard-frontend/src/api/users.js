import axios from 'axios';
import { apiUrl } from './config';

const userApi = (() => {
  return {
    getUsers: (startDay, finishDay) => {
      return axios.get(`${apiUrl}/api/users/from/${startDay}/to/${finishDay}`)
    },
  }
})();

export default userApi