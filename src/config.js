export default {
    API_ENDPOINT: ' https://warm-ocean-22527.herokuapp.com/api',
    DEV_API_ENDPOINT: 'http://localhost:9000/api',
    API_KEY: process.env.REACT_APP_API_KEY, 
    HEADERS: {
            "Authorization": process.env.REACT_APP_API_KEY, 
            "Content-Type": "application/json"
    }
}