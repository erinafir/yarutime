import axios from 'axios'

const serverApi = axios.create({
    // baseURL: 'https://server-yarutime.rinafira.my.id'
    baseURL: 'http://localhost:4000'
  });

export default serverApi