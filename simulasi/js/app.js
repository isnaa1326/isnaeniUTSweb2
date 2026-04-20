// ==================== RENDER FUNCTIONS ====================
let currentPage = 'products';
let currentProduct = null;
let searchQuery = '';
let selectedCategory = '';

function renderNavbar() {
    const user = getCurrentUser();
    const cartCount = getCartCount();
    return `<nav class="glass-card shadow-lg sticky top-0 z-50 mb-6"><div class="container mx-auto px-6 py-4"><div class="flex justify-between items-center flex-wrap gap-4">
        <div class="flex items-center space-x-3 cursor-pointer" onclick="navigateTo('products')"><i class="fas fa-store text-purple-600 text-3xl"></i><h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">UrbanStore</h1></div>
        ${user ? `<div class="flex items-center space-x-4">
            <button onclick="navigateTo('products')" class="hover:text-purple-600 transition" style="color: var(--text-primary)"><i class="fas fa-store"></i> Shop</button>
            <button onclick="navigateTo('cart')" class="relative hover:text-purple-600 transition" style="color: var(--text-primary)"><i class="fas fa-shopping-cart"></i> Cart <span id="cartCount" class="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">${cartCount}</span></button>
            <button onclick="navigateTo('history')" class="hover:text-purple-600 transition" style="color: var(--text-primary)"><i class="fas fa-history"></i> Orders</button>
            <div class="flex items-center space-x-2 border-l pl-4" style="border-color: var(--border-color)"><i class="fas fa-user-circle text-2xl text-purple-600"></i><span class="font-medium" style="color: var(--text-primary)">${user.name}</span><button onclick="logout()" class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">Logout</button></div>
        </div>` : ''}
    </div></div></nav>`;
}

function renderLogin() {
    document.getElementById('app').innerHTML = `${renderNavbar()}
        <div class="min-h-[70vh] flex items-center justify-center"><div class="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div class="text-center mb-8"><i class="fas fa-store text-purple-600 text-5xl mb-4"></i><h2 class="text-3xl font-bold" style="color: var(--text-primary)">Welcome Back</h2><p style="color: var(--text-secondary)">Login to your account</p></div>
        <form id="loginForm"><div class="mb-4"><label style="color: var(--text-primary)">Email</label><input type="email" id="email" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <div class="mb-6"><label style="color: var(--text-primary)">Password</label><input type="password" id="password" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <button type="submit" class="btn-primary w-full text-white py-3 rounded-lg font-semibold">Login</button></form>
        <p class="text-center mt-6"><span style="color: var(--text-secondary)">Don't have account?</span> <button onclick="navigateTo('register')" class="text-purple-600 font-semibold">Register</button></p></div></div>`;
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (loginUser(document.getElementById('email').value, document.getElementById('password').value)) {
            currentPage = 'products'; render();
        }
    });
}

function renderRegister() {
    document.getElementById('app').innerHTML = `${renderNavbar()}
        <div class="min-h-[70vh] flex items-center justify-center"><div class="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div class="text-center mb-8"><i class="fas fa-user-plus text-purple-600 text-5xl mb-4"></i><h2 class="text-3xl font-bold" style="color: var(--text-primary)">Create Account</h2><p style="color: var(--text-secondary)">Join UrbanStore</p></div>
        <form id="registerForm"><div class="mb-4"><label style="color: var(--text-primary)">Full Name</label><input type="text" id="name" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <div class="mb-4"><label style="color: var(--text-primary)">Email</label><input type="email" id="email" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <div class="mb-6"><label style="color: var(--text-primary)">Password (min 6)</label><input type="password" id="password" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <button type="submit" class="btn-primary w-full text-white py-3 rounded-lg font-semibold">Register</button></form>
        <p class="text-center mt-6"><span style="color: var(--text-secondary)">Already have account?</span> <button onclick="navigateTo('login')" class="text-purple-600 font-semibold">Login</button></p></div></div>`;
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (registerUser(document.getElementById('name').value, document.getElementById('email').value, document.getElementById('password').value)) {
            currentPage = 'login'; render();
        }
    });
}

function renderProducts() {
    let filtered = [...PRODUCTS];
    if (searchQuery && searchQuery.trim() !== '') {
        filtered = searchProducts(searchQuery);
    }
    if (selectedCategory && selectedCategory !== '') {
        filtered = filterByCategory(selectedCategory);
    }
    
    const categories = getCategories();
    
    document.getElementById('app').innerHTML = `${renderNavbar()}
        <div class="mb-8"><div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 relative"><i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input type="text" id="searchInput" placeholder="Cari produk..." value="${searchQuery}" class="w-full pl-10 pr-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
            <select id="categoryFilter" class="px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)">
                <option value="">Semua Kategori</option>
                ${categories.map(cat => `<option value="${cat}" ${selectedCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
            </select>
        </div></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${filtered.map(p => `
                <div class="product-card overflow-hidden shadow-lg"><img src="${p.image}" class="w-full h-48 object-cover cursor-pointer" onclick="viewProduct('${p.id}')">
                <div class="p-4"><div class="flex justify-between"><h3 class="font-bold cursor-pointer hover:text-purple-600" onclick="viewProduct('${p.id}')" style="color: var(--text-primary)">${p.name}</h3><span class="text-purple-600 font-bold">${formatRupiah(p.price)}</span></div>
                <div class="flex items-center mt-2 mb-3"><div class="flex text-yellow-400">${Array(5).fill().map((_, i) => `<i class="fas fa-star ${i < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm"></i>`).join('')}</div><span class="text-sm ml-2" style="color: var(--text-secondary)">(${p.rating})</span><span class="text-xs ml-2" style="color: var(--text-secondary)">${p.category}</span></div>
                <p class="text-sm mb-4" style="color: var(--text-secondary)">${p.description.substring(0, 50)}...</p>
                <button onclick="addToCartById('${p.id}')" class="btn-primary w-full text-white py-2 rounded-lg"><i class="fas fa-shopping-cart mr-2"></i>Tambah</button></div></div>
            `).join('')}
        </div>
        ${filtered.length === 0 ? `<div class="text-center py-20"><i class="fas fa-box-open text-6xl mb-4" style="color: var(--text-secondary)"></i><p style="color: var(--text-secondary)">Tidak ada produk ditemukan</p></div>` : ''}`;
    
    const searchInput = document.getElementById('searchInput');
    const categoryFilterElem = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            render();
        });
    }
    if (categoryFilterElem) {
        categoryFilterElem.addEventListener('change', (e) => {
            selectedCategory = e.target.value;
            render();
        });
    }
    updateCartCount();
}

function renderCart() {
    const cart = getCart();
    const total = getCartTotal();
    document.getElementById('app').innerHTML = `${renderNavbar()}<div class="glass-card p-6 rounded-2xl"><h2 class="text-2xl font-bold mb-6" style="color: var(--text-primary)">Shopping Cart</h2>
        ${cart.length === 0 ? `<div class="text-center py-20"><i class="fas fa-shopping-cart text-6xl mb-4" style="color: var(--text-secondary)"></i><p class="mb-4" style="color: var(--text-secondary)">Keranjang kosong</p><button onclick="navigateTo('products')" class="btn-primary text-white px-6 py-2 rounded-lg">Belanja</button></div>` : `
        <div class="overflow-x-auto"><table class="w-full"><thead class="border-b" style="border-color: var(--border-color)"><tr><th class="pb-3 text-left" style="color: var(--text-primary)">Produk</th><th style="color: var(--text-primary)">Harga</th><th style="color: var(--text-primary)">Jumlah</th><th style="color: var(--text-primary)">Subtotal</th><th></th></tr></thead>
        <tbody>${cart.map(item => `<tr class="border-b" style="border-color: var(--border-color)"><td class="py-4"><div class="flex items-center gap-3"><img src="${item.image}" class="w-16 h-16 object-cover rounded"><span class="font-medium" style="color: var(--text-primary)">${item.name}</span></div></td>
        <td style="color: var(--text-primary)">${formatRupiah(item.price)}</td>
        <td><input type="number" value="${item.quantity}" min="1" onchange="updateCartItem('${item.id}', this.value)" class="w-20 px-2 py-1 border rounded text-center" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></td>
        <td style="color: var(--text-primary)">${formatRupiah(item.price * item.quantity)}</td>
        <td><button onclick="removeCartItem('${item.id}')" class="text-red-500"><i class="fas fa-trash"></i></button></td>
        </tr>`).join('')}</tbody>
        <tfoot><tr class="border-t-2" style="border-color: var(--border-color)"><td colspan="3" class="pt-4 text-right font-bold" style="color: var(--text-primary)">Total:</td><td class="pt-4 font-bold text-xl text-purple-600">${formatRupiah(total)}</td><td class="pt-4"></td></tr></tfoot>
        </table></div>
        <div class="mt-6 flex justify-end gap-4"><button onclick="navigateTo('products')" class="px-6 py-2 border rounded-lg" style="border-color: var(--border-color); color: var(--text-primary)">Lanjutkan</button><button onclick="navigateTo('checkout')" class="btn-primary text-white px-6 py-2 rounded-lg">Checkout</button></div>`}</div>`;
    updateCartCount();
}

function renderCheckout() {
    const cart = getCart();
    const subtotal = getCartTotal();
    const beratTotal = getTotalBerat();
    
    if (cart.length === 0) { navigateTo('cart'); return; }
    
    document.getElementById('app').innerHTML = `${renderNavbar()}
        <div class="grid md:grid-cols-2 gap-6"><div class="glass-card p-6 rounded-2xl"><h2 class="text-2xl font-bold mb-6" style="color: var(--text-primary)">Informasi Pengiriman</h2>
        <form id="checkoutForm"><div class="mb-4"><label style="color: var(--text-primary)">Nama Lengkap</label><input type="text" id="name" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <div class="mb-4"><label style="color: var(--text-primary)">Alamat</label><textarea id="address" required rows="3" class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></textarea></div>
                <div class="mb-4"><label style="color: var(--text-primary)">Nomor HP</label><input type="tel" id="phone" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)"></div>
        <div class="mb-6"><label style="color: var(--text-primary)">Kota Tujuan</label>
            <select id="kota" required class="w-full px-4 py-2 border rounded-lg" style="background: var(--bg-card); color: var(--text-primary); border-color: var(--border-color)">
                <option value="">Pilih Kota</option>
                ${KOTA.map(k => `<option value="${k.id}">${k.nama}</option>`).join('')}
            </select>
        </div>
        <div class="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p style="color: var(--text-primary)"><i class="fas fa-weight-hanging"></i> Total Berat: ${(beratTotal / 1000).toFixed(1)} kg</p>
            <p id="ongkirDisplay" style="color: var(--text-primary)"><i class="fas fa-truck"></i> Ongkos Kirim: -</p>
        </div>
        <button type="submit" class="btn-primary w-full text-white py-3 rounded-lg font-semibold"><i class="fas fa-qrcode mr-2"></i>Bayar dengan QRIS</button></form></div>
        <div class="glass-card p-6 rounded-2xl"><h2 class="text-2xl font-bold mb-6" style="color: var(--text-primary)">Ringkasan Pesanan</h2>
        ${cart.map(item => `<div class="flex justify-between mb-3 pb-3 border-b" style="border-color: var(--border-color)"><div><span class="font-medium" style="color: var(--text-primary)">${item.name}</span><span class="text-sm ml-2" style="color: var(--text-secondary)">x${item.quantity}</span></div><span style="color: var(--text-primary)">${formatRupiah(item.price * item.quantity)}</span></div>`).join('')}
        <div class="flex justify-between mt-3"><span style="color: var(--text-primary)">Subtotal</span><span style="color: var(--text-primary)">${formatRupiah(subtotal)}</span></div>
        <div class="flex justify-between mt-2" id="ongkirRow" style="display: none;"><span style="color: var(--text-primary)">Ongkos Kirim</span><span id="ongkirValue" style="color: var(--text-primary)">-</span></div>
        <div class="flex justify-between mt-4 pt-4 border-t-2" style="border-color: var(--border-color)"><span class="font-bold text-lg" style="color: var(--text-primary)">Total</span><span class="font-bold text-xl text-purple-600" id="totalBayar">${formatRupiah(subtotal)}</span></div></div></div>`;
    
    document.getElementById('kota').addEventListener('change', (e) => {
        const kotaId = e.target.value;
        if (kotaId) {
            const ongkir = hitungOngkir(kotaId, beratTotal);
            document.getElementById('ongkirDisplay').innerHTML = `<i class="fas fa-truck"></i> Ongkos Kirim: ${formatRupiah(ongkir)}`;
            document.getElementById('ongkirRow').style.display = 'flex';
            document.getElementById('ongkirValue').innerHTML = formatRupiah(ongkir);
            const total = subtotal + ongkir;
            document.getElementById('totalBayar').innerHTML = formatRupiah(total);
            window.selectedOngkir = ongkir;
            window.selectedKotaNama = KOTA.find(k => k.id === kotaId)?.nama;
        } else {
            document.getElementById('ongkirDisplay').innerHTML = `<i class="fas fa-truck"></i> Ongkos Kirim: -`;
            document.getElementById('ongkirRow').style.display = 'none';
            document.getElementById('totalBayar').innerHTML = formatRupiah(subtotal);
        }
    });
    
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const kotaId = document.getElementById('kota').value;
        if (!kotaId) {
            showToast('Pilih kota tujuan terlebih dahulu!', 'error');
            return;
        }
        const formData = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value
        };
        const total = subtotal + (window.selectedOngkir || 0);
        showQRISModal(formData, total, window.selectedOngkir || 0, window.selectedKotaNama || '');
    });
}

function renderHistory() {
    const orders = getOrderHistory();
    document.getElementById('app').innerHTML = `${renderNavbar()}<div class="glass-card p-6 rounded-2xl"><h2 class="text-2xl font-bold mb-6" style="color: var(--text-primary)">Riwayat Pesanan</h2>
        ${orders.length === 0 ? `<div class="text-center py-20"><i class="fas fa-receipt text-6xl mb-4" style="color: var(--text-secondary)"></i><p style="color: var(--text-secondary)">Belum ada pesanan</p><button onclick="navigateTo('products')" class="btn-primary text-white px-6 py-2 rounded-lg mt-4">Belanja</button></div>` :
        `<div class="space-y-6">${orders.map(order => `<div class="border rounded-xl p-4" style="border-color: var(--border-color); background: var(--bg-card)">
            <div class="flex justify-between flex-wrap gap-2"><div><span class="text-sm" style="color: var(--text-secondary)">ID: ${order.id}</span><p class="text-sm" style="color: var(--text-secondary)">${new Date(order.date).toLocaleString('id-ID')}</p></div>
            <div class="flex gap-2 flex-wrap"><span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"><i class="fas fa-check-circle"></i> Lunas</span>
            ${order.ongkir ? `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"><i class="fas fa-truck"></i> Ongkir: ${formatRupiah(order.ongkir)}</span>` : ''}</div></div>
            ${order.items.map(item => `<div class="flex justify-between border-b py-2" style="border-color: var(--border-color)"><div class="flex gap-3"><img src="${item.image}" class="w-12 h-12 object-cover rounded"><div><p class="font-medium" style="color: var(--text-primary)">${item.name}</p><p class="text-sm" style="color: var(--text-secondary)">x${item.quantity}</p></div></div><span style="color: var(--text-primary)">${formatRupiah(item.price * item.quantity)}</span></div>`).join('')}
            <div class="flex justify-between mt-3 pt-3 border-t" style="border-color: var(--border-color)"><div><p class="text-sm" style="color: var(--text-primary)"><i class="fas fa-user"></i> ${order.customerName}</p><p class="text-sm" style="color: var(--text-primary)"><i class="fas fa-map-marker-alt"></i> ${order.address}${order.kota ? `, ${order.kota}` : ''}</p></div><div><p class="text-sm" style="color: var(--text-secondary)">Total</p><p class="text-xl font-bold text-purple-600">${formatRupiah(order.totalAmount)}</p></div></div></div>`).join('')}</div>`}</div>`;
    updateCartCount();
}

function renderProductDetail() {
    const p = currentProduct;
    if (!p) { navigateTo('products'); return; }
    document.getElementById('app').innerHTML = `${renderNavbar()}
        <div class="glass-card rounded-2xl overflow-hidden"><div class="grid md:grid-cols-2 gap-8 p-6">
        <div><img src="${p.image}" class="w-full h-96 object-cover rounded-xl"></div>
        <div><span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">${p.category}</span>
        <h1 class="text-3xl font-bold mt-4 mb-4" style="color: var(--text-primary)">${p.name}</h1>
        <div class="flex items-center mb-4"><div class="flex text-yellow-400">${Array(5).fill().map((_, i) => `<i class="fas fa-star ${i < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-300'}"></i>`).join('')}</div><span class="ml-2" style="color: var(--text-secondary)">(${p.rating})</span></div>
        <div class="mb-4"><span class="text-3xl font-bold text-purple-600">${formatRupiah(p.price)}</span></div>
        <p class="mb-6" style="color: var(--text-secondary)">${p.description}</p>
        <div class="flex items-center gap-3 mb-6"><div class="flex items-center border rounded-lg" style="border-color: var(--border-color)"><button onclick="let qty=document.getElementById('detailQty'); if(qty.value>1) qty.value--" class="px-3 py-2 border-r" style="border-color: var(--border-color)">-</button><input type="number" id="detailQty" value="1" min="1" max="${p.stock}" class="w-16 text-center border-0 focus:outline-none" style="background: var(--bg-card); color: var(--text-primary)"><button onclick="let qty=document.getElementById('detailQty'); if(qty.value<${p.stock}) qty.value++" class="px-3 py-2 border-l" style="border-color: var(--border-color)">+</button></div>
        <button onclick="addToCart(getProductById('${p.id}'), parseInt(document.getElementById('detailQty').value)); navigateTo('cart')" class="btn-primary flex-1 text-white py-3 rounded-lg"><i class="fas fa-shopping-cart mr-2"></i>Beli Sekarang</button></div>
        <div class="border-t pt-4" style="border-color: var(--border-color)"><p class="text-sm" style="color: var(--text-secondary)"><i class="fas fa-check-circle text-green-500 mr-2"></i>Stok: ${p.stock} item | Berat: ${p.weight}g</p></div></div></div></div>`;
}

// ==================== GLOBAL FUNCTIONS ====================
function navigateTo(page) { currentPage = page; currentProduct = null; render(); }
function logout() { logoutUser(); currentPage = 'login'; render(); }
function viewProduct(id) { currentProduct = getProductById(id); currentPage = 'detail'; render(); }
function addToCartById(id) { addToCart(getProductById(id), 1); }
function updateCartItem(id, qty) { updateQuantity(id, parseInt(qty)); render(); }
function removeCartItem(id) { removeFromCart(id); render(); }

function render() {
    if (!isAuthenticated() && currentPage !== 'login' && currentPage !== 'register') currentPage = 'login';
    const pages = { login: renderLogin, register: renderRegister, products: renderProducts, cart: renderCart, checkout: renderCheckout, history: renderHistory, detail: renderProductDetail };
    (pages[currentPage] || renderProducts)();
}

// ==================== START APP ====================
initDarkMode();
render();