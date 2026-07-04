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
    
    document.getElementById('confirmPayment').onclick = async () => {
        modal.remove();
        const cart = getCart();
        const subtotal = getCartTotal();
        const total = subtotal + ongkir;
        const result = await processCheckout(formData, ongkir, kotaNama);
        if (result && result.orderId) {
            openWhatsAppNotification(formData, ongkir, kotaNama, cart, result.orderId, total);
        } else {
            navigateTo('history');
        }
    };
    
    document.getElementById('cancelPayment').onclick = () => {
        modal.remove();
    };
}

// ==================== ORDER ====================
async function fetchKota() {
    try {
        const response = await fetch(`${API_URL}/api/kota`);
        const json = await response.json();
        if (json.success) {
            KOTA = json.data;
            return true;
        }
    } catch (err) {
        console.error('Error fetch kota:', err);
    }
    return false;
}

async function processCheckout(formData, ongkir, kotaNama) {
    const user = getCurrentUser();
    if (!user) { showToast('Login dulu!', 'error'); return false; }
    const cart = getCart();
    if (cart.length === 0) { showToast('Keranjang kosong!', 'error'); return false; }
    
    const subtotal = getCartTotal();
    const total = subtotal + ongkir;
    const kotaId = window.selectedKotaId;
    
    const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
    }));
    
    try {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                customerName: formData.name,
                address: formData.address,
                phone: formData.phone,
                kota_id: parseInt(kotaId),
                kota: kotaNama,
                ongkir: ongkir,
                items: items,
                subtotal: subtotal,
                totalAmount: total
            })
        });
        const json = await response.json();
        if (json.success) {
            clearCart();
            showToast('Pembayaran berhasil! Pesanan Anda diproses.');
            return json.data;
        } else {
            showToast(json.message || 'Checkout gagal!', 'error');
            return false;
        }
    } catch (err) {
        console.error('Error checkout:', err);
        showToast('Terjadi kesalahan koneksi saat memproses checkout!', 'error');
        return false;
    }
}

async function getOrderHistory() {
    const user = getCurrentUser();
    if (!user) return [];
    try {
        const response = await fetch(`${API_URL}/api/orders/my`, {
            headers: getAuthHeader()
        });
        const json = await response.json();
        if (json.success) {
            return json.data;
        }
    } catch (err) {
        console.error('Error fetch order history:', err);
    }
    return [];
}

function openWhatsAppNotification(formData, ongkir, kotaNama, cart, orderId, totalAmount) {
    const itemList = cart
      .map(item => `  • ${item.name} x${item.quantity} = Rp${(item.price * item.quantity).toLocaleString('id-ID')}`)
      .join('\n');

    const pesan =
      `🛍️ *PESANAN BARU - UrbanStore*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Order ID:* ${orderId}\n` +
      `📅 *Waktu:* ${new Date().toLocaleString('id-ID')}\n\n` +
      `👤 *Customer:*\n` +
      `  Nama: ${formData.name}\n` +
      `  HP: ${formData.phone}\n` +
      `  Alamat: ${formData.address}, ${kotaNama}\n\n` +
      `🛒 *Produk Dipesan:*\n` +
      `${itemList}\n\n` +
      `💰 *Rincian Harga:*\n` +
      `  Subtotal: Rp${(totalAmount - ongkir).toLocaleString('id-ID')}\n` +
      `  Ongkir: Rp${ongkir.toLocaleString('id-ID')}\n` +
      `  *TOTAL: Rp${totalAmount.toLocaleString('id-ID')}*\n\n` +
      `✅ Status: LUNAS (QRIS)\n` +
      `━━━━━━━━━━━━━━━━━━`;

    let waNumber = OWNER_WA_NUMBER;
    if (waNumber.startsWith('0')) {
        waNumber = '62' + waNumber.slice(1);
    }
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`;
    window.location.href = waUrl;
}