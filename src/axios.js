import axios from 'axios';

// Set up the base URL on which other paths will be appended to
const instance = axios.create({
    baseURL: 'https://moove-fit-demo-default-rtdb.firebaseio.com/',
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;