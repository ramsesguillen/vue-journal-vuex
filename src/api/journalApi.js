

import axios from 'axios'



const journalApi = axios.create({
    baseURL: 'https://vue-demos-efff0-default-rtdb.firebaseio.com',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});


export default journalApi
