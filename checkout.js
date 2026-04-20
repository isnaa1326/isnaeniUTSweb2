// ==================== QRIS MODAL ====================
function showQRISModal(formData, totalAmount, ongkir, kotaNama) {
    const modal = document.createElement('div');
    modal.className = 'qris-modal';
    modal.innerHTML = `
        <div class="qris-content">
            <i class="fas fa-qrcode text-6xl text-purple-600 mb-4"></i>
            <h2 class="text-2xl font-bold mb-2">Scan QRIS untuk Membayar</h2>
            <p class="text-gray-600 mb-2">Total Pembayaran: <span class="font-bold text-xl text-purple-600">${formatRupiah(totalAmount)}</span></p>
            <p class="text-gray-500 text-sm mb-4">(Termasuk Ongkir: ${formatRupiah(ongkir)})</p>
            <div class="qris-code bg-gray-100 p-4 rounded-lg">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
                    <rect width="200" height="200" fill="white"/>
                    <g transform="translate(10,10)">
                        ${Array(18).fill().map((_, i) => Array(18).fill().map((_, j) => {
                            if ((i * j) % 3 === 0 || (i + j) % 5 === 0) {
                                return `<rect x="${i*10}" y="${j*10}" width="8" height="8" fill="black"/>`;
                            }
                            return '';
                        }).join('')).join('')}
                    </g>
                </svg>
                <p class="text-sm text-gray-500 mt-2">Scan QR Code dengan Aplikasi M-Banking (Gopay, OVO, ShopeePay, dll)</p>
            </div>
            <div class="flex gap-3 mt-4">
                <button id="cancelPayment" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                <button id="confirmPayment" class="flex-1 btn-primary text-white py-2 rounded-lg">Konfirmasi Pembayaran</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('confirmPayment').onclick = () => {
        modal.remove();
        processCheckout(formData, ongkir, kotaNama);
        navigateTo('history');
    };
    
    document.getElementById('cancelPayment').onclick = () => {
        modal.remove();
    };
}

// ==================== ORDER ====================
function processCheckout(formData, ongkir, kotaNama) {
    const user = getCurrentUser();
    if (!user) { showToast('Login dulu!', 'error'); return false; }
    const cart = getCart();
    if (cart.length === 0) { showToast('Keranjang kosong!', 'error'); return false; }
    
    const subtotal = getCartTotal();
    const total = subtotal + ongkir;
    
    const transaction = {
        id: generateId(),
        userId: user.email,
        customerName: formData.name,
        address: formData.address,
        phone: formData.phone,
        kota: kotaNama,
        ongkir: ongkir,
        items: cart,
        subtotal: subtotal,
        totalAmount: total,
        status: 'paid',
        date: new Date().toISOString()
    };
    
    const orders = getFromLocalStorage(`orders_${user.email}`) || [];
    orders.unshift(transaction);
    saveToLocalStorage(`orders_${user.email}`, orders);
    clearCart();
    showToast('Pembayaran berhasil! Pesanan Anda diproses.');
    return transaction;
}

function getOrderHistory() {
    const user = getCurrentUser();
    if (!user) return [];
    return getFromLocalStorage(`orders_${user.email}`) || [];
}