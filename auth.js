// ==================== AUTH ====================
function registerUser(name, email, password) {
    if (password.length < 6) {
        showToast('Password minimal 6 karakter!', 'error');
        return false;
    }
    const users = getFromLocalStorage(STORAGE_USERS) || [];
    if (users.some(u => u.email === email)) {
        showToast('Email sudah terdaftar!', 'error');
        return false;
    }
    users.push({ id: Date.now(), name, email, password, createdAt: new Date().toISOString() });
    saveToLocalStorage(STORAGE_USERS, users);
    showToast('Registrasi berhasil! Silakan login.');
    return true;
}

function loginUser(email, password) {
    const users = getFromLocalStorage(STORAGE_USERS) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        saveToLocalStorage(STORAGE_SESSION, { email: user.email, name: user.name });
        showToast(`Selamat datang, ${user.name}!`);
        return true;
    }
    showToast('Email atau password salah!', 'error');
    return false;
}

function logoutUser() {
    localStorage.removeItem(STORAGE_SESSION);
    showToast('Anda telah logout');
    return true;
}

function getCurrentUser() {
    return getFromLocalStorage(STORAGE_SESSION);
}

function isAuthenticated() {
    return getFromLocalStorage(STORAGE_SESSION) !== null;
}