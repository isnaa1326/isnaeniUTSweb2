const API_URL = 'https://uasbackendisnaeni-production.up.railway.app';
const OWNER_WA_NUMBER = '6285876865046'; // Nomor WhatsApp Owner Toko (Format Internasional: 62...)

// Helper untuk mengambil token autentikasi dari localStorage
function getAuthHeader() {
    let token = localStorage.getItem('UrbanStore_token');
    if (token) {
        // Hapus tanda kutip jika disimpan sebagai JSON string oleh saveToLocalStorage
        if (token.startsWith('"') && token.endsWith('"')) {
            token = token.slice(1, -1);
        }
        return { 'Authorization': `Bearer ${token}` };
    }
    return {};
}
