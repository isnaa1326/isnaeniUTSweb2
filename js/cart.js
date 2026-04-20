// ==================== CART ====================
function getCart() {
    const user = getCurrentUser();
    if (!user) return [];
    return getFromLocalStorage(`cart_${user.email}`) || [];
}

function saveCart(cart) {
    const user = getCurrentUser();
    if (user) saveToLocalStorage(`cart_${user.email}`, cart);
}

function addToCart(product, quantity = 1) {
    const user = getCurrentUser();
    if (!user) { showToast('Silakan login dulu!', 'error'); return false; }
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity += quantity;
    else cart.push({ ...product, quantity });
    saveCart(cart);
    showToast(`${product.name} ditambahkan!`);
    updateCartCount();
    return true;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    showToast('Produk dihapus');
}

function updateQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) removeFromCart(productId);
        else { item.quantity = quantity; saveCart(cart); }
    }
    updateCartCount();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getTotalBerat() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.weight * item.quantity), 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = getCartCount();
}

function clearCart() {
    const user = getCurrentUser();
    if (user) localStorage.removeItem(`cart_${user.email}`);
    updateCartCount();
}