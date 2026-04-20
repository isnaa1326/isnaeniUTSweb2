// ==================== PRODUCT FUNCTIONS ====================
function getProductById(id) { 
    return PRODUCTS.find(p => p.id === id); 
}

function searchProducts(q) { 
    if (!q) return PRODUCTS; 
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())); 
}

function filterByCategory(cat) { 
    if (!cat) return PRODUCTS; 
    return PRODUCTS.filter(p => p.category === cat); 
}

function getCategories() { 
    return [...new Set(PRODUCTS.map(p => p.category))]; 
}