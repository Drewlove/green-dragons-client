export default {
    API_ENDPOINT_LOCAL: 'http://localhost:9000/api',
    API_ENDPOINT: 'https://stormy-shore-17390.herokuapp.com/',
    HEADERS: {
        "Authorization": process.env.REACT_APP_API_TOKEN, 
        "Content-Type": "application/json"
    },
}