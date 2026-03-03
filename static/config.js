// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://your-year-to-do-list.onrender.com';

export default API_BASE_URL;
