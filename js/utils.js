// ==================== DARK MODE ====================
function initDarkMode() {
    const saved = localStorage.getItem(STORAGE_DARK_MODE);
    if (saved === 'dark') {
        document.body.classList.add('dark');
        const icon = document.getElementById('darkModeIcon');
        const text = document.getElementById('darkModeText');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        if (text) text.innerText = 'Light Mode';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem(STORAGE_DARK_MODE, isDark ? 'dark' : 'light');
    const icon = document.getElementById('darkModeIcon');
    const text = document.getElementById('darkModeText');
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
        text.innerText = 'Light Mode';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        text.innerText = 'Dark Mode';
    }
}

// ==================== ONGKIR ====================
function hitungOngkir(kotaId, beratTotal) {
    const kota = KOTA.find(k => k.id === kotaId);
    if (!kota) return 0;
    const beratKg = Math.ceil(beratTotal / 1000);
    return kota.ongkir * beratKg;
}

// ==================== UTILITY ====================
function showToast(message, type = 'success') {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        background: document.body.classList.contains('dark') ? '#1f2937' : '#fff',
        color: document.body.classList.contains('dark') ? '#fff' : '#000'
    });
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
}

function generateId() {
    return 'TRX_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}