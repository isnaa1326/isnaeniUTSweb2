const API_URL = 'https://uasbackendisnaeni-production.up.railway.app';

// Helper untuk mengambil token autentikasi dari localStorage
function getAuthHeader() {
    const token = localStorage.getItem('UrbanStore_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}
