document.addEventListener('DOMContentLoaded', () => {


// AD Tech Shop - Main JavaScript

// ==================== DOM Elements ====================
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const toTopBtn = document.getElementById('toTopBtn');
const scrollProgress = document.getElementById('scrollProgress');
const saleTimer = document.getElementById('saleTimer');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ==================== State Management ====================
const cart = {
    items: [],
    load() {
        const saved = localStorage.getItem('cart');
        this.items = saved ? JSON.parse(saved) : [];
        this.updateUI();
    },
    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    add(product, price) {
        const existing = this.items.find(item => item.product === product);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ product, price: parseFloat(price), quantity: 1 });
        }
        this.save();
        this.updateUI();
        this.showToast(`${product} added to cart!`);
    },
    remove(product) {
        this.items = this.items.filter(item => item.product !== product);
        this.save();
        this.updateUI();
    },
    updateQuantity(product, quantity) {
        const item = this.items.find(item => item.product === product);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity));
            this.save();
            this.updateUI();
        }
    },
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    updateUI() {
        this.updateBadges();
        this.renderCart();
        this.updateSubtotal();
    },
    updateBadges() {
        const cartCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-icon .count-badge').textContent = cartCount;
    },
    renderCart() {
        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-row">
                <div>
                    <p><strong>${item.product}</strong></p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="qty-ctl">
                    <button onclick="cart.updateQuantity('${item.product.replace(/'/g, "\\'")}', ${item.quantity - 1})">−</button>
                    <span style="min-width: 20px; text-align: center; color: #fff;">${item.quantity}</span>
                    <button onclick="cart.updateQuantity('${item.product.replace(/'/g, "\\'")}', ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="cart.remove('${item.product.replace(/'/g, "\\'")}')">✕</button>
                </div>
            </div>
        `).join('');
    },
    updateSubtotal() {
        cartSubtotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
    },
    showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

const wishlist = {
    items: new Set(),
    load() {
        const saved = localStorage.getItem('wishlist');
        this.items = new Set(saved ? JSON.parse(saved) : []);
        this.updateUI();
    },
    save() {
        localStorage.setItem('wishlist', JSON.stringify(Array.from(this.items)));
    },
    toggle(product) {
        if (this.items.has(product)) {
            this.items.delete(product);
        } else {
            this.items.add(product);
        }
        this.save();
        this.updateUI();
    },
    updateUI() {
        document.querySelectorAll('.wish-btn').forEach(btn => {
            const product = btn.dataset.product;
            btn.classList.toggle('active', this.items.has(product));
        });
        const count = this.items.size;
        document.querySelector('.wishlist-icon .count-badge').textContent = count;
    }
};

// ==================== Event Listeners ====================

// Mobile Menu Toggle
menuBtn?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Cart Drawer
cartBtn?.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    overlay.classList.add('show');
});

drawerClose?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);

function closeCart() {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('show');
}

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = btn.dataset.product;
        const price = btn.dataset.price;
        cart.add(product, price);
    });
});

// Wishlist Buttons
document.querySelectorAll('.wish-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = btn.dataset.product;
        wishlist.toggle(product);
    });
});

// Wishlist Button Header
wishlistBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const count = wishlist.items.size;
    if (count === 0) {
        alert('Your wishlist is empty');
    } else {
        alert(`You have ${count} item${count > 1 ? 's' : ''} in your wishlist`);
    }
});

// Checkout Button
checkoutBtn?.addEventListener('click', () => {
    if (cart.items.length === 0) {
        alert('Your cart is empty');
        return;
    }
    alert(`Checkout: $${cart.getSubtotal().toFixed(2)}\n\nThis is a demo. Processing would happen here.`);
    cart.items = [];
    cart.save();
    cart.updateUI();
    closeCart();
});

// To Top Button
toTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== Scroll Effects ====================

window.addEventListener('scroll', () => {
    // Scroll Progress
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';

    // To Top Button
    toTopBtn?.classList.toggle('show', scrolled > 300);

    // Lazy Load Product Cards
    document.querySelectorAll('.product-card:not(.in-view)').forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight * 0.8) {
            card.classList.add('in-view');
        }
    });
});

// ==================== Filter & Search ====================

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortPrice = document.getElementById('sortPrice');
const shopGrid = document.getElementById('shopGrid');

function filterProducts() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || '';
    const products = Array.from(shopGrid?.querySelectorAll('.product-card') || []);

    products.forEach(product => {
        const title = product.querySelector('h3')?.textContent.toLowerCase() || '';
        const productCategory = product.dataset.category || '';
        
        const matchesSearch = !searchTerm || title.includes(searchTerm);
        const matchesCategory = !category || productCategory === category;

        product.style.display = matchesSearch && matchesCategory ? '' : 'none';
    });
}

function sortProducts() {
    const sortValue = sortPrice?.value || 'default';
    const products = Array.from(shopGrid?.querySelectorAll('.product-card:not([style*="display: none"])') || []);

    products.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);

        if (sortValue === 'low') return priceA - priceB;
        if (sortValue === 'high') return priceB - priceA;
        return 0;
    });

    products.forEach(product => shopGrid?.appendChild(product));
}

function applyFilters() {
    filterProducts();
    sortProducts();
}

searchInput?.addEventListener('input', applyFilters);
categoryFilter?.addEventListener('change', applyFilters);
sortPrice?.addEventListener('change', applyFilters);

// ==================== Flash Sale Timer ====================

function updateFlashSaleTimer() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    function tick() {
        const time = endOfDay - new Date();
        
        if (time <= 0) {
            saleTimer.textContent = '00:00:00';
            return;
        }

        const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');

        if (saleTimer) {
            saleTimer.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    tick();
    setInterval(tick, 1000);
}

// ==================== Contact Form ====================

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const message = inputs[2].value;

    if (name && email && message) {
        cart.showToast('Message sent! We\'ll get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// ==================== Smooth Scroll for Navigation ====================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== Initialize App ====================

function init() {
    cart.load();
    wishlist.load();
    updateFlashSaleTimer();
    
    // Initial filter/sort setup
    applyFilters();
    
    // Trigger initial animation for visible products
    window.dispatchEvent(new Event('scroll'));
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== Keyboard Shortcuts ====================

document.addEventListener('keydown', (e) => {
    // Press 'c' to open cart
    if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        cartBtn?.click();
    }
    
    // Press 'Escape' to close cart
    if (e.key === 'Escape') {
        closeCart();
    }
});

// ==================== Accessibility Enhancements ====================

// Add focus indicators
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-nav');
});


});