import axios from 'axios'

const serverApi = axios.create({
    baseURL: 'https://server-yarutime.rinafira.my.id'
  });

export default serverApi