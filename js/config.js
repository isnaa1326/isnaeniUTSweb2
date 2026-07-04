const API_URL = 'https://uasbackendisnaeni-production.up.railway.app';
const OWNER_WA_NUMBER = '6285876865046'; // Nomor WhatsApp Owner Toko (Format Internasional: 62...)

// Helper untuk mengambil token autentikasi dari localStorage secara aman
function getAuthHeader() {
    let token = localStorage.getItem('UrbanStore_token');
    if (token) {
        // Coba lakukan JSON.parse secara aman untuk membuang tanda kutip bawaan JSON.stringify
        try {
            const parsed = JSON.parse(token);
            if (typeof parsed === 'string') {
                token = parsed;
            }
        } catch (e) {
            // Jika token bukan string JSON valid (misal string mentah), biarkan apa adanya
        }
        return { 'Authorization': `Bearer ${token}` };
    }
    return {};
}
