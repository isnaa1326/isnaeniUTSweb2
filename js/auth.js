// ==================== AUTH ====================
async function registerUser(name, email, password) {
    if (password.length < 6) {
        showToast('Password minimal 6 karakter!', 'error');
        return false;
    }
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.success) {
            showToast(data.message || 'Registrasi berhasil! Silakan login.');
            return true;
        } else {
            showToast(data.message || 'Registrasi gagal!', 'error');
            return false;
        }
    } catch (err) {
        console.error('Error register:', err);
        showToast('Terjadi kesalahan koneksi ke server!', 'error');
        return false;
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            saveToLocalStorage(STORAGE_TOKEN, data.data.token);
            saveToLocalStorage(STORAGE_SESSION, data.data.user);
            showToast(data.message || `Selamat datang, ${data.data.user.name}!`);
            return true;
        } else {
            showToast(data.message || 'Email atau password salah!', 'error');
            return false;
        }
    } catch (err) {
        console.error('Error login:', err);
        showToast('Terjadi kesalahan koneksi ke server!', 'error');
        return false;
    }
}

function logoutUser() {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_SESSION);
    showToast('Anda telah logout');
    return true;
}

function getCurrentUser() {
    return getFromLocalStorage(STORAGE_SESSION);
}

function isAuthenticated() {
    return localStorage.getItem(STORAGE_TOKEN) !== null;
}