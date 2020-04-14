export default {
    API_ENDPOINT: 'http://localhost:9000/api',
    HEADERS: {
        "Authorization": process.env.REACT_APP_API_TOKEN, 
        "Content-Type": "application/json"
    },
}