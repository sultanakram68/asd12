

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Scroll Reveal Animations & Navbar Logic
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    const navbar = document.getElementById('navbar');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        // Scroll Reveal
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });

        // Navbar Solid Background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Animated Counters
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const counterTop = counter.getBoundingClientRect().top;
            if (counterTop < triggerBottom && counter.innerText === '0') {
                const target = +counter.getAttribute('data-target');
                const increment = target / 40; // سرعة العداد

                const updateCount = () => {
                    const count = +counter.innerText.replace(/,/g, '');
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment).toLocaleString();
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target.toLocaleString() + (target > 10000 ? '+' : '');
                    }
                };
                updateCount();
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Trigger on load

    // ==========================================
    // 1b. Mobile Hamburger Menu
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // ==========================================
    // 2. Modals & Drawers Logic (Cart, Auth, etc)
    // ==========================================
    function toggleModal(modalId, show) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        if (show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Auth Modal
    document.getElementById('open-auth-btn')?.addEventListener('click', () => toggleModal('auth-modal', true));
    document.getElementById('close-auth-modal')?.addEventListener('click', () => toggleModal('auth-modal', false));

    // Cart Drawer
    document.getElementById('open-cart-btn')?.addEventListener('click', () => toggleModal('cart-drawer', true));
    document.getElementById('cart-overlay')?.addEventListener('click', () => toggleModal('cart-drawer', false));
    document.getElementById('close-cart-btn')?.addEventListener('click', () => toggleModal('cart-drawer', false));

    // Checkout Modal
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        toggleModal('cart-drawer', false);
        toggleModal('checkout-modal', true);
    });
    document.getElementById('close-checkout-modal')?.addEventListener('click', () => toggleModal('checkout-modal', false));

    // Success Modal
    document.getElementById('close-success-btn')?.addEventListener('click', () => toggleModal('success-modal', false));

    // ==========================================
    // 3. User Authentication (Local Storage)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            authForms.forEach(f => {
                if (f.id === `${target}-form`) f.classList.add('active');
                else f.classList.remove('active');
            });
        });
    });

    function getUsers() { return JSON.parse(localStorage.getItem('lmixi_users')) || []; }
    function saveUsers(users) { localStorage.setItem('lmixi_users', JSON.stringify(users)); }
    function getCurrentUser() {
        const email = localStorage.getItem('current_user_email');
        if (!email) return null;
        return getUsers().find(u => u.email === email);
    }

    function updateAuthUI() {
        const user = getCurrentUser();
        const loginForm = document.getElementById('login-form');
        const regForm = document.getElementById('register-form');
        const profileInfo = document.getElementById('profile-info');
        const tabs = document.querySelector('.modal-tabs');

        if (user) {
            loginForm.classList.remove('active');
            regForm.classList.remove('active');
            if (tabs) tabs.style.display = 'none';
            profileInfo.classList.add('active');
            
            document.getElementById('profile-name-display').innerText = user.name;
            document.getElementById('profile-email-display').innerText = user.email;
            document.getElementById('profile-phone-display').innerText = user.phone;
        } else {
            if (tabs) tabs.style.display = 'flex';
            profileInfo.classList.remove('active');
            document.querySelector('[data-tab="login"]').click(); // Reset to login tab
        }
    }

    document.getElementById('register-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const users = getUsers();
        const newUser = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            phone: document.getElementById('reg-phone').value,
            password: document.getElementById('reg-password').value
        };

        if (users.find(u => u.email === newUser.email)) {
            alert('البريد الإلكتروني مسجل مسبقاً!');
            return;
        }

        users.push(newUser);
        saveUsers(users);
        localStorage.setItem('current_user_email', newUser.email);
        updateAuthUI();
        toggleModal('auth-modal', false);
    });

    document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === pass);

        if (user) {
            localStorage.setItem('current_user_email', email);
            updateAuthUI();
            toggleModal('auth-modal', false);
        } else {
            alert('بيانات الدخول خاطئة!');
        }
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('current_user_email');
        updateAuthUI();
    });

    updateAuthUI(); // Init auth state

    // ==========================================
    // 4. Shopping Cart Logic
    // ==========================================
    let cart = JSON.parse(localStorage.getItem('lmixi_cart')) || [];

    function saveCart() {
        localStorage.setItem('lmixi_cart', JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        const container = document.getElementById('cart-items-container');
        const badge = document.getElementById('cart-count');
        const totalEl = document.getElementById('cart-total-price');
        const checkoutFinal = document.getElementById('checkout-final-price');
        const checkoutBtn = document.getElementById('checkout-btn');

        container.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = '<div class="empty-cart-msg">سلتك فارغة حالياً.</div>';
            badge.innerText = '0';
            totalEl.innerText = '0 ل.س';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        if (checkoutBtn) checkoutBtn.disabled = false;
        let totalQty = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            totalQty += item.qty;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name} (x${item.qty})</h4>
                    <span>${(item.price * item.qty).toLocaleString()} ل.س</span>
                </div>
                <button class="cart-item-remove" data-index="${index}">حذف</button>
            `;
            container.appendChild(div);
        });

        badge.innerText = totalQty;
        const totalText = total.toLocaleString() + ' ل.س';
        totalEl.innerText = totalText;
        if (checkoutFinal) checkoutFinal.innerText = totalText;

        // Attach remove events
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                cart.splice(idx, 1);
                saveCart();
            });
        });
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseInt(e.target.getAttribute('data-price'));

            const existing = cart.find(i => i.id === id);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id, name, price, qty: 1 });
            }
            saveCart();
            
            // Visual feedback
            const originalText = e.target.innerText;
            e.target.innerText = 'تمت الإضافة ✓';
            e.target.style.background = 'var(--neon-orange)';
            e.target.style.color = '#fff';
            
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--neon-orange)';
            }, 1000);
        });
    });

    renderCart(); // Init cart

    // ==========================================
    // 5. Checkout Process
    // ==========================================
    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const city = document.getElementById('checkout-city').value;
        const addr = document.getElementById('checkout-address').value;
        
        if (!city || !addr) {
            alert('يرجى ملء تفاصيل العنوان');
            return;
        }

        // Trigger confetti & success
        toggleModal('checkout-modal', false);
        toggleModal('success-modal', true);
        
        // Clear cart
        cart = [];
        saveCart();
    });

    // ==========================================
    // 6. Parallax Mouse Effect for Hero
    // ==========================================
    const heroSection = document.getElementById('hero');
    const parallaxElements = document.querySelectorAll('.parallax-element');

    if (heroSection && parallaxElements.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = e.clientX - window.innerWidth / 2;
            const y = e.clientY - window.innerHeight / 2;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
                const xOffset = x * speed;
                const yOffset = y * speed;
                el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            parallaxElements.forEach(el => {
                el.style.transform = `translate(0px, 0px)`;
                el.style.transition = 'transform 0.5s ease-out';
            });
        });

        heroSection.addEventListener('mouseenter', () => {
            parallaxElements.forEach(el => {
                el.style.transition = 'none';
            });
        });
    }

    // ==========================================
    // 7. Live Search Functionality
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').innerText.toLowerCase();
                const productDesc = card.querySelector('.product-desc').innerText.toLowerCase();

                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'flex';
                    // إضافة أنيميشن خفيفة عند الظهور
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 8. Wishlist Logic
    // ==========================================
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                // Show a quick visual feedback
                const heart = document.createElement('span');
                heart.innerText = '❤️';
                heart.style.position = 'absolute';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.pointerEvents = 'none';
                heart.style.animation = 'fadeOutUp 1s ease forwards';
                btn.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1000);
            }
        });
    });

    // إضافة ستايل بسيط لحركة القلب
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOutUp {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -150%) scale(2); }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 9. Toast Notification System
    // ==========================================
    window.showToast = function(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✅' : '⚠️';
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;
        
        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOutUpToast 0.4s forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // Replace default alerts with Toasts
    const originalAlert = window.alert;
    window.alert = function(message) {
        if(document.getElementById('toast-container')) {
            showToast(message, 'success');
        } else {
            originalAlert(message);
        }
    };

    // ==========================================
    // 10. Image Error Fallback
    // ==========================================
    document.addEventListener('error', function(event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            event.target.style.display = 'none';
            // Create fallback placeholder
            const fallback = document.createElement('div');
            fallback.className = 'fallback-image';
            fallback.innerHTML = 'LMIXI<br>صورة غير متوفرة';
            event.target.parentNode.insertBefore(fallback, event.target);
        }
    }, true);

    // ==========================================
    // 11. Bottom Nav Logic
    // ==========================================
    const bottomNavCart = document.getElementById('bottom-nav-cart');
    const bottomNavAccount = document.getElementById('bottom-nav-account');

    if (bottomNavCart) {
        bottomNavCart.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.openCart) window.openCart(); // Assuming openCart function exists
            // Or fallback to checking if element exists
            const cartDrawer = document.getElementById('cart-drawer');
            const cartOverlay = document.getElementById('cart-overlay');
            if(cartDrawer && cartOverlay) {
                cartDrawer.classList.add('open');
                cartOverlay.classList.add('active');
            }
        });
    }

    if (bottomNavAccount) {
        bottomNavAccount.addEventListener('click', (e) => {
            e.preventDefault();
            const authModal = document.getElementById('auth-modal');
            if(authModal) authModal.classList.add('active');
        });
    }

    // ==========================================
    // Navbar Search Toggle
    // ==========================================
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const navSearchContainer = document.getElementById('nav-search-container');
    const navSearchInput = document.getElementById('search-input');

    if (searchToggleBtn && navSearchContainer) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navSearchContainer.classList.toggle('active');
            if (navSearchContainer.classList.contains('active')) {
                setTimeout(() => navSearchInput?.focus(), 100);
            }
        });

        // إغلاق البحث عند النقر خارجه
        document.addEventListener('click', (e) => {
            if (!navSearchContainer.contains(e.target)) {
                navSearchContainer.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 12. Spline 3D Removed for Performance
    // ==========================================

    // ==========================================
    // 13. Application Logic (Cart, Auth, Search)
    // ==========================================

    // Toast Notification System
    const toastContainer = document.getElementById('toast-container');
    function showToast(message) {
        if(!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
    }

    // Modal Control Logic
    const modals = {
        cart: document.getElementById('cart-drawer'),
        cartOverlay: document.getElementById('cart-overlay'),
        auth: document.getElementById('auth-modal'),
        checkout: document.getElementById('checkout-modal'),
        success: document.getElementById('success-modal')
    };
            parallaxElements.forEach(el => {
                el.style.transition = 'none';
            });
        });
    }

    // ==========================================
    // 7. Live Search Functionality
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').innerText.toLowerCase();
                const productDesc = card.querySelector('.product-desc').innerText.toLowerCase();

                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'flex';
                    // إضافة أنيميشن خفيفة عند الظهور
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 8. Wishlist Logic
    // ==========================================
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                // Show a quick visual feedback
                const heart = document.createElement('span');
                heart.innerText = '❤️';
                heart.style.position = 'absolute';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.pointerEvents = 'none';
                heart.style.animation = 'fadeOutUp 1s ease forwards';
                btn.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1000);
            }
        });
    });

    // إضافة ستايل بسيط لحركة القلب
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOutUp {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -150%) scale(2); }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 9. Toast Notification System
    // ==========================================
    window.showToast = function(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✅' : '⚠️';
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;
        
        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOutUpToast 0.4s forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // Replace default alerts with Toasts
    const originalAlert = window.alert;
    window.alert = function(message) {
        if(document.getElementById('toast-container')) {
            showToast(message, 'success');
        } else {
            originalAlert(message);
        }
    };

    // ==========================================
    // 10. Image Error Fallback
    // ==========================================
    document.addEventListener('error', function(event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            event.target.style.display = 'none';
            // Create fallback placeholder
            const fallback = document.createElement('div');
            fallback.className = 'fallback-image';
            fallback.innerHTML = 'LMIXI<br>صورة غير متوفرة';
            event.target.parentNode.insertBefore(fallback, event.target);
        }
    }, true);

    // ==========================================
    // 11. Bottom Nav Logic
    // ==========================================
    const bottomNavCart = document.getElementById('bottom-nav-cart');
    const bottomNavAccount = document.getElementById('bottom-nav-account');

    if (bottomNavCart) {
        bottomNavCart.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.openCart) window.openCart(); // Assuming openCart function exists
            // Or fallback to checking if element exists
            const cartDrawer = document.getElementById('cart-drawer');
            const cartOverlay = document.getElementById('cart-overlay');
            if(cartDrawer && cartOverlay) {
                cartDrawer.classList.add('open');
                cartOverlay.classList.add('active');
            }
        });
    }

    if (bottomNavAccount) {
        bottomNavAccount.addEventListener('click', (e) => {
            e.preventDefault();
            const authModal = document.getElementById('auth-modal');
            if(authModal) authModal.classList.add('active');
        });
    }

    // ==========================================
    // Navbar Search Toggle
    // ==========================================
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const navSearchContainer = document.getElementById('nav-search-container');
    const navSearchInput = document.getElementById('search-input');

    if (searchToggleBtn && navSearchContainer) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navSearchContainer.classList.toggle('active');
            if (navSearchContainer.classList.contains('active')) {
                setTimeout(() => navSearchInput?.focus(), 100);
            }
        });

        // إغلاق البحث عند النقر خارجه
        document.addEventListener('click', (e) => {
            if (!navSearchContainer.contains(e.target)) {
                navSearchContainer.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 12. Spline 3D Removed for Performance
    // ==========================================

    // ==========================================
    // 13. Application Logic (Cart, Auth, Search)
    // ==========================================

    // Modal Control Logic
    const modals = {
        cart: document.getElementById('cart-drawer'),
        cartOverlay: document.getElementById('cart-overlay'),
        auth: document.getElementById('auth-modal'),
        checkout: document.getElementById('checkout-modal'),
        success: document.getElementById('success-modal')
    };

    function openModal(modalEl) { if(modalEl) modalEl.classList.add('active', 'open'); }
    function closeModal(modalEl) { if(modalEl) modalEl.classList.remove('active', 'open'); }

    // Close buttons
    document.getElementById('close-cart-btn')?.addEventListener('click', () => { closeModal(modals.cart); closeModal(modals.cartOverlay); });
    document.getElementById('cart-overlay')?.addEventListener('click', () => { closeModal(modals.cart); closeModal(modals.cartOverlay); });
    document.getElementById('close-auth-modal')?.addEventListener('click', () => closeModal(modals.auth));
    document.getElementById('close-checkout-modal')?.addEventListener('click', () => closeModal(modals.checkout));
    document.getElementById('close-success-btn')?.addEventListener('click', () => closeModal(modals.success));

    // ---- Cart System ----
    cart = JSON.parse(localStorage.getItem('lmixi_cart')) || [];
    
    function updateCart() {
        localStorage.setItem('lmixi_cart', JSON.stringify(cart));
        const badge = document.getElementById('bottom-cart-count');
        if(badge) badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        const container = document.getElementById('cart-items-container');
        const totalPriceEl = document.getElementById('cart-total-price');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if(!container) return;
        container.innerHTML = '';
        let total = 0;

        if(cart.length === 0) {
            container.innerHTML = '<div class="empty-cart-msg">سلتك فارغة حالياً.</div>';
            if(checkoutBtn) checkoutBtn.disabled = true;
            if(totalPriceEl) totalPriceEl.textContent = '0 ل.س';
            return;
        }

        if(checkoutBtn) checkoutBtn.disabled = false;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} ل.س (${item.quantity}x)</div>
                </div>
                <button class="cart-item-remove" data-index="${index}">🗑</button>
            `;
            container.appendChild(div);
        });

        if(totalPriceEl) totalPriceEl.textContent = total.toLocaleString() + ' ل.س';

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                cart.splice(idx, 1);
                updateCart();
                showToast('تم إزالة المنتج من السلة');
            });
        });
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price') || 0);

            const existing = cart.find(i => i.id === id);
            if(existing) existing.quantity++;
            else cart.push({id, name, price, quantity: 1});

            updateCart();
            showToast('تمت الإضافة إلى السلة بنجاح! 🛒');
        });
    });

    // Checkout Logic
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        closeModal(modals.cart);
        closeModal(modals.cartOverlay);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('checkout-final-price').textContent = total.toLocaleString() + ' ل.س';
        openModal(modals.checkout);
    });

    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        cart = [];
        updateCart();
        closeModal(modals.checkout);
        openModal(modals.success);
    });

    // ---- Auth System ----
    let currentUser = JSON.parse(localStorage.getItem('lmixi_user'));
    
    function updateAuthUI() {
        const loginForm = document.getElementById('login-form');
        const regForm = document.getElementById('register-form');
        const profileInfo = document.getElementById('profile-info');
        const tabs = document.querySelector('.modal-tabs');
        
        if(!loginForm) return;

        if(currentUser) {
            loginForm.classList.remove('active');
            regForm.classList.remove('active');
            if(tabs) tabs.style.display = 'none';
            if(profileInfo) profileInfo.classList.add('active');
            document.getElementById('profile-name-display') && (document.getElementById('profile-name-display').textContent = currentUser.name);
            document.getElementById('profile-email-display') && (document.getElementById('profile-email-display').textContent = currentUser.email);
            document.getElementById('profile-phone-display') && (document.getElementById('profile-phone-display').textContent = currentUser.phone);
        } else {
            if(tabs) tabs.style.display = 'flex';
            if(profileInfo) profileInfo.classList.remove('active');
            loginForm.classList.add('active');
        }
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            document.getElementById(e.target.getAttribute('data-tab') + '-form').classList.add('active');
        });
    });

    document.getElementById('register-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            phone: document.getElementById('reg-phone').value
        };
        localStorage.setItem('lmixi_user', JSON.stringify(currentUser));
        updateAuthUI();
        showToast('تم إنشاء الحساب بنجاح! أهلاً بك 🎉');
    });

    document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!currentUser) currentUser = { name: "العميل", email: document.getElementById('login-email').value, phone: "غير محدد" };
        localStorage.setItem('lmixi_user', JSON.stringify(currentUser));
        updateAuthUI();
        showToast('تم تسجيل الدخول بنجاح! 🔓');
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('lmixi_user');
        updateAuthUI();
        showToast('تم تسجيل الخروج');
    });

    // ---- Search Logic ----
    const searchInputEl = document.getElementById('search-input');
    if(searchInputEl) {
        searchInputEl.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const title = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
                if(title.includes(query)) card.style.display = '';
                else card.style.display = 'none';
            });
            if(query.length > 0) document.getElementById('store')?.scrollIntoView({behavior: 'smooth'});
        });
    }

    // Initialize UI
    updateCart();
    updateAuthUI();

    // ==========================================
    // 14. AI Chatbot Logic (LMIXI Assistant)
    // ==========================================
    const openAiBtn = document.getElementById('open-ai-btn');
    const closeAiBtn = document.getElementById('close-ai-btn');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiInput = document.getElementById('ai-input');
    const aiMessages = document.getElementById('ai-chat-messages');

    if(openAiBtn && aiChatWindow) {
        openAiBtn.addEventListener('click', () => {
            aiChatWindow.classList.add('open');
            setTimeout(() => aiInput.focus(), 100);
        });

        closeAiBtn.addEventListener('click', () => {
            aiChatWindow.classList.remove('open');
        });

        // Smart Mock AI Algorithm
        function generateAIResponse(text) {
            const query = text.toLowerCase();
            if (query.includes('لاب') || query.includes('حاسوب') || query.includes('كمبيوتر')) {
                return 'شراء لابتوب يعتمد على استخدامك. للعمل الثقيل والألعاب، أنصحك بمعالجات قوية وكرت شاشة منفصل. لدينا في LMIXI خيارات ممتازة مثل LMX ProBook.';
            } else if (query.includes('ساع') || query.includes('watch')) {
                return 'الساعات الذكية رائعة لتتبع الصحة. ساعة LMX Ultra لدينا تقدم أداء ممتازاً وعمراً طويلاً للبطارية. هل ترغب برؤيتها في المتجر؟';
            } else if (query.includes('قارن') || query.includes('افضل') || query.includes('أفضل') || query.includes('احسن')) {
                return 'المقارنة تعتمد على الميزانية والاستخدام (عمل، دراسة، أم ألعاب؟). حدد لي هدفك، وسأقوم بترشيح أفضل الأجهزة من تشكيلة LMIXI.';
            } else if (query.includes('تقني') || query.includes('شرح') || query.includes('كيف') || query.includes('نصيح')) {
                return 'في عالم التقنية، أنصحك دائماً بالاستثمار في أجهزة تدعم التحديثات المستقبلية لتدوم معك طويلاً. نحن في LMIXI نضمن لك أحدث التقنيات وأفضل خدمة ما بعد البيع.';
            } else if (query.includes('ترجم') || query.includes('معنى')) {
                return 'بالتأكيد، يمكنني مساعدتك بترجمة أو شرح أي مصطلح تقني معقد لتتخذ قرار شراء سليم. تفضل الكلمة!';
            } else if (query.includes('سعر') || query.includes('بكم') || query.includes('مصاري')) {
                return 'أسعارنا في LMIXI تنافسية جداً وتأتي مع ضمان حقيقي. يمكنك تصفح المتجر وإضافة المنتجات للسلة لرؤية التكلفة الإجمالية بدقة.';
            } else if (query.includes('مرحبا') || query.includes('هلا') || query.includes('السلام')) {
                return 'أهلاً بك! أنا مساعد LMIXI الذكي. يسعدني جداً الرد على أي سؤال تقني، مساعدتك في التسوق، أو تقديم نصائح عامة.';
            } else {
                return 'سؤال رائع! بصفتي مساعد LMIXI، أنا هنا لأقدم لك استشارات تقنية، نصائح شراء، وأسهل عليك اختيار الأجهزة. هل تبحث عن جهاز محدد اليوم؟';
            }
        }

        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `ai-msg ${sender}`;
            msgDiv.textContent = text;
            aiMessages.appendChild(msgDiv);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }

        function showTypingIndicator() {
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.id = 'ai-typing';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            aiMessages.appendChild(indicator);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('ai-typing');
            if(indicator) indicator.remove();
        }

        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = aiInput.value.trim();
            if(!text) return;
            
            appendMessage(text, 'user');
            aiInput.value = '';
            
            showTypingIndicator();
            
            // Simulate network delay
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateAIResponse(text);
                appendMessage(response, 'bot');
            }, 1500);
        });
    }

});
