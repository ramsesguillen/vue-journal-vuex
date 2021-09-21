

import axios from 'axios'



const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyCr5x4wi-SmRDuhD4XJepOpSsUqVMS-L7A'
    }
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});


export default authApi
