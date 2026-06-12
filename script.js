// ==============================================
// 1. قاعدة البيانات والمنتجات الافتراضية
// ==============================================
let products = [
    {
        id: 1,
        name: "LMIXI Phone 15 Pro Max",
        category: "phones",
        price: 9500000,
        icon: "📱",
        desc: "معالج نانو فائق السرعة، كاميرا تيتانيوم ثلاثية الأبعاد بدقة 108 ميجابكسل، وشاشة أموليد متطورة بمعدل تحديث 120 هرتز."
    },
    {
        id: 2,
        name: "LMIXI Watch Ultra Neon",
        category: "watches",
        price: 3200000,
        icon: "⌚",
        desc: "هيكل تيتانيوم مقوى، مقاومة للماء والغبار بمعيار عسكري، مستشعر ذكي لضربات القلب ومستويات الأوكسجين."
    },
    {
        id: 3,
        name: "LMIXI Pods Studio Pro",
        category: "audio",
        price: 2800000,
        icon: "🎧",
        desc: "تقنية عزل الصوت النشط (ANC) فائقة الذكاء، تدعم الصوت المكاني ثلاثي الأبعاد مع بطارية تدوم 40 ساعة متواصلة."
    },
    {
        id: 4,
        name: "LMIXI Vision Glass AR",
        category: "accessories",
        price: 6400000,
        icon: "🕶️",
        desc: "شاشات مايكرو أوليد بدقة 4K لكل عين لتجربة واقع معزز وسينمائية استثنائية، تحكم متقدم بحركات اليد والعين."
    },
    {
        id: 5,
        name: "LMIXI SuperCharge 120W GaN",
        category: "accessories",
        price: 450000,
        icon: "⚡",
        desc: "شاحن جيل ثالث ذو كفاءة طاقة عالية، حماية مدمجة ضد الجهد الزائد، يشحن الهواتف من 0 إلى 80% في 15 دقيقة فقط."
    },
    {
        id: 6,
        name: "LMIXI Watch Active Lite",
        category: "watches",
        price: 1400000,
        icon: "⏱️",
        desc: "شاشة رياضية رشيقة، خفيفة الوزن ومتوافقة بالكامل مع أنظمة آندرويد وآيفون، تتبع التمارين اليومية والنوم."
    }
];

let pendingProducts = [
    {
        id: 101,
        name: "LMIXI Phone Lite",
        category: "phones",
        price: 4800000,
        icon: "📱",
        desc: "نسخة خفيفة واقتصادية لعشاق السرعة والأداء العملي، بطارية تدوم يومين كاملين.",
        seller: "متجر التكنولوجيا السريع"
    }
];

let pendingSellers = [
    {
        name: "التقنية الحديثة المحدودة",
        email: "tech@modern.sy",
        phone: "0998877665"
    }
];

// ==============================================
// 2. حالة التطبيق (App State)
// ==============================================
let cart = [];
let currentUser = {
    loggedIn: false,
    name: "",
    email: "",
    role: "customer" // customer, seller, admin
};

// ==============================================
// 3. مستمعي الأحداث والتشغيل الأول للتطبيق
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initCartEvents();
    initAuthEvents();
    initSellerEvents();
    initAdminEvents();
    initCheckoutEvents();
    
    // رندرة المنتجات لأول مرة
    renderStoreProducts();
});

// ==============================================
// 4. نظام التنقل والتبويبات (Navigation System)
// ==============================================
function initNavigation() {
    // التنقل في الشريط العلوي والسفلي
    const navTabs = document.querySelectorAll(".nav-tab, .bottom-nav-item, #logo-btn");
    
    navTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            
            // سحب الهدف
            let target = tab.getAttribute("data-target");
            if (!target && tab.id === "logo-btn") {
                target = "home-view";
            }
            
            switchView(target);
        });
    });
}

function switchView(viewId) {
    // إخفاء جميع الواجهات
    const views = document.querySelectorAll("main.view");
    views.forEach(v => {
        v.style.display = "none";
        v.classList.remove("active-view");
    });
    
    // إظهار الواجهة المطلوبة
    const activeView = document.getElementById(viewId);
    if (activeView) {
        if (viewId === "home-view") {
            activeView.style.display = "grid";
        } else {
            activeView.style.display = "block";
        }
        setTimeout(() => activeView.classList.add("active-view"), 50);
    }
    
    // تحديث الحالة النشطة للأزرار في الهيدر والفوتر السفلي
    const tabs = document.querySelectorAll(".nav-tab, .bottom-nav-item");
    tabs.forEach(t => {
        if (t.getAttribute("data-target") === viewId) {
            t.classList.add("active");
        } else {
            t.classList.remove("active");
        }
    });

    // سكرول لأعلى الصفحة
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==============================================
// 5. متجر المنتجات (Store Management)
// ==============================================
let activeFilter = 'all';
let searchQuery = '';

function renderStoreProducts() {
    const grid = document.getElementById("store-products-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    // فلترة المنتجات
    const filtered = products.filter(p => {
        const matchesCategory = (activeFilter === 'all' || p.category === activeFilter);
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);">
                <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🔍</span>
                <p>عذراً، لم نجد أي منتجات تطابق بحثك حالياً.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "glass-panel product-card";
        card.innerHTML = `
            <button class="wishlist-btn" onclick="toggleWishlist(event, ${p.id})">❤️</button>
            <div class="product-image-container">
                <span style="font-size: 4rem;">${p.icon}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-meta">
                    <span class="product-price">${p.price.toLocaleString('ar-SY')} ل.س</span>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(event, ${p.id})">إضافة 🛒</button>
                </div>
            </div>
        `;
        
        // النقر على الكرت لمشاهدة التفاصيل (باستثناء أزرار الإضافة والمفضلة)
        card.addEventListener("click", (e) => {
            if (e.target.tagName !== "BUTTON") {
                openProductDetails(p);
            }
        });
        
        grid.appendChild(card);
    });
}

function filterStore(category) {
    activeFilter = category;
    
    // تحديث كلاس الأزرار الفلتر
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        if (btn.getAttribute("onclick").includes(`'${category}'`)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    renderStoreProducts();
}

function filterCategory(category) {
    switchView("store-view");
    filterStore(category);
}

// مستمع حقل البحث
const searchInput = document.getElementById("store-search");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderStoreProducts();
    });
}

// المفضلة
function toggleWishlist(e, id) {
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.classList.toggle("active");
    if (btn.classList.contains("active")) {
        btn.style.color = "#FF2E93";
        showToast("تمت الإضافة إلى المفضلة");
    } else {
        btn.style.color = "rgba(255, 255, 255, 0.6)";
        showToast("تمت الإزالة من المفضلة");
    }
}

// ==============================================
// 6. تفاصيل المنتج (Product Details Modal)
// ==============================================
const prodDetailsModal = document.getElementById("product-details-modal");
const prodModalClose = document.getElementById("prod-modal-close");
const prodModalBg = document.getElementById("prod-modal-bg");

function openProductDetails(product) {
    document.getElementById("detail-prod-image").innerText = product.icon;
    document.getElementById("detail-prod-name").innerText = product.name;
    document.getElementById("detail-prod-desc").innerText = product.desc;
    document.getElementById("detail-prod-price").innerText = `${product.price.toLocaleString('ar-SY')} ل.س`;
    
    const catNames = {
        phones: "الهواتف الذكية",
        watches: "الساعات الذكية",
        audio: "السماعات والصوتيات",
        accessories: "الإكسسوارات"
    };
    document.getElementById("detail-prod-category").innerText = catNames[product.category] || "عام";
    
    // تعيين زر الإضافة في المودال
    const addBtn = document.getElementById("detail-add-to-cart");
    addBtn.onclick = (e) => {
        addToCart(e, product.id);
        closeProductDetails();
    };

    prodDetailsModal.classList.add("active");
}

function closeProductDetails() {
    prodDetailsModal.classList.remove("active");
}

if (prodModalClose) prodModalClose.addEventListener("click", closeProductDetails);
if (prodModalBg) prodModalBg.addEventListener("click", closeProductDetails);

// ==============================================
// 7. إدارة سلة التسوق (Cart Drawer & Logic)
// ==============================================
const cartDrawer = document.getElementById("cart-drawer-panel");
const cartOverlay = document.getElementById("cart-overlay-bg");
const cartToggle = document.getElementById("cart-toggle-btn");
const cartClose = document.getElementById("cart-close-btn");

function initCartEvents() {
    cartToggle.addEventListener("click", () => toggleCart(true));
    cartClose.addEventListener("click", () => toggleCart(false));
    cartOverlay.addEventListener("click", () => toggleCart(false));
}

function toggleCart(show) {
    if (show) {
        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");
        renderCart();
    } else {
        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
    }
}

function addToCart(e, id) {
    e.stopPropagation();
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.product.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }
    
    updateCartBadge();
    showToast(`تمت إضافة ${product.name} إلى السلة 🛒`);
}

function updateCartBadge() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-badge-count").innerText = totalCount;
}

function renderCart() {
    const list = document.getElementById("cart-items-list");
    if (!list) return;
    
    list.innerHTML = "";
    let finalTotal = 0;
    
    if (cart.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
                <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🛒</span>
                <p>سلة التسوق فارغة حالياً.</p>
            </div>
        `;
        document.getElementById("cart-final-total").innerText = "0 ل.س";
        document.getElementById("checkout-btn").disabled = true;
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        finalTotal += itemTotal;
        
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <div class="cart-item-img">
                <span style="font-size: 2rem;">${item.product.icon}</span>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.product.name}</div>
                <div class="cart-item-price">${item.product.price.toLocaleString('ar-SY')} ل.س × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.product.id})">✕</button>
        `;
        list.appendChild(itemEl);
    });
    
    document.getElementById("cart-final-total").innerText = `${finalTotal.toLocaleString('ar-SY')} ل.س`;
    document.getElementById("checkout-btn").disabled = false;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.product.id !== id);
    updateCartBadge();
    renderCart();
    showToast("تم حذف المنتج من السلة");
}

// ==============================================
// 8. نظام الحسابات وتسجيل الدخول (Auth System)
// ==============================================
const authModal = document.getElementById("auth-modal-wrapper");
const authBtn = document.getElementById("auth-btn");
const authClose = document.getElementById("auth-modal-close");
const authBg = document.getElementById("auth-modal-bg");
const authForm = document.getElementById("auth-form-el");
const authSwitchBtn = document.getElementById("auth-switch-btn");

let authMode = "login"; // login, register

function initAuthEvents() {
    authBtn.addEventListener("click", () => {
        if (currentUser.loggedIn) {
            // تسجيل خروج فوري
            logoutUser();
        } else {
            openAuthModal();
        }
    });
    
    authClose.addEventListener("click", closeAuthModal);
    authBg.addEventListener("click", closeAuthModal);
    
    authSwitchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleAuthMode();
    });
    
    authForm.addEventListener("submit", handleAuthSubmit);

    // ربط مستمع لبروفايل الموبايل
    const bottomProfileBtn = document.getElementById("bottom-profile-btn");
    if (bottomProfileBtn) {
        bottomProfileBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (currentUser.loggedIn) {
                switchView(currentUser.role === "seller" ? "seller-view" : currentUser.role === "admin" ? "admin-view" : "home-view");
            } else {
                openAuthModal();
            }
        });
    }
}

function openAuthModal() {
    authModal.classList.add("active");
}

function closeAuthModal() {
    authModal.classList.remove("active");
}

function toggleAuthMode() {
    const title = document.getElementById("auth-modal-title");
    const switchText = document.getElementById("auth-switch-text");
    const nameGroup = document.getElementById("reg-name-group");
    const roleGroup = document.getElementById("reg-role-group");
    const submitBtn = document.getElementById("auth-submit-btn");
    
    if (authMode === "login") {
        authMode = "register";
        title.innerText = "إنشاء حساب جديد";
        switchText.innerText = "لديك حساب بالفعل؟";
        authSwitchBtn.innerText = "تسجيل الدخول";
        nameGroup.style.display = "block";
        roleGroup.style.display = "block";
        submitBtn.innerText = "إنشاء حساب";
    } else {
        authMode = "login";
        title.innerText = "تسجيل الدخول";
        switchText.innerText = "ليس لديك حساب؟";
        authSwitchBtn.innerText = "إنشاء حساب جديد";
        nameGroup.style.display = "none";
        roleGroup.style.display = "none";
        submitBtn.innerText = "دخول";
    }
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;
    
    if (authMode === "login") {
        // فحص ما إذا كان مسؤولاً أو بائعاً أو مستخدماً عادياً
        if (email.includes("admin")) {
            currentUser.role = "admin";
            currentUser.name = "مدير المنصة";
        } else if (email.includes("seller")) {
            currentUser.role = "seller";
            currentUser.name = "متجر الأمل الذكي";
        } else {
            currentUser.role = "customer";
            currentUser.name = "أحمد السوري";
        }
        
        currentUser.email = email;
        currentUser.loggedIn = true;
        
        showToast(`أهلاً بك مجدداً، ${currentUser.name} 👋`);
    } else {
        // إنشاء حساب
        const name = document.getElementById("auth-name").value;
        const role = document.getElementById("auth-role").value;
        
        currentUser.name = name;
        currentUser.email = email;
        currentUser.role = role;
        currentUser.loggedIn = true;
        
        showToast("تم إنشاء حسابك بنجاح ونقلك إلى لوحة التحكم 🎉");
    }
    
    // تحديث أزرار الواجهة
    updateAuthUI();
    closeAuthModal();
    
    // تحويل تلقائي للوحة التحكم حسب الدور
    if (currentUser.role === "seller") {
        switchView("seller-view");
    } else if (currentUser.role === "admin") {
        switchView("admin-view");
    }
}

function updateAuthUI() {
    const textEl = document.getElementById("auth-btn-text");
    if (currentUser.loggedIn) {
        textEl.innerText = `${currentUser.name} (تسجيل خروج)`;
    } else {
        textEl.innerText = "تسجيل الدخول";
    }
    
    // رندرة وتحديث لوحات التحكم
    renderSellerProducts();
    renderAdminPanel();
}

function logoutUser() {
    currentUser.loggedIn = false;
    currentUser.name = "";
    currentUser.email = "";
    currentUser.role = "customer";
    
    updateAuthUI();
    switchView("home-view");
    showToast("تم تسجيل خروجك بنجاح");
}

// ==============================================
// 9. لوحة البائع وإضافة المنتجات (Seller Logic)
// ==============================================
function initSellerEvents() {
    const form = document.getElementById("add-product-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // التحقق من تسجيل الدخول والصفة كبائع
            if (!currentUser.loggedIn || currentUser.role !== "seller") {
                showToast("الرجاء تسجيل الدخول كـ (بائع) لإضافة منتجاتك.");
                openAuthModal();
                return;
            }
            
            const name = document.getElementById("new-prod-name").value;
            const category = document.getElementById("new-prod-category").value;
            const price = parseFloat(document.getElementById("new-prod-price").value);
            const desc = document.getElementById("new-prod-desc").value;
            
            const iconMap = {
                phones: "📱",
                watches: "⌚",
                audio: "🎧",
                accessories: "🕶️"
            };
            
            const newPending = {
                id: Date.now(),
                name,
                category,
                price,
                icon: iconMap[category] || "📦",
                desc,
                seller: currentUser.name
            };
            
            pendingProducts.push(newPending);
            renderSellerProducts();
            renderAdminPanel();
            
            form.reset();
            showToast("تم رفع المنتج بنجاح، وهو قيد المراجعة حالياً من الإدارة ⏳");
        });
    }
}

function renderSellerProducts() {
    const tbody = document.getElementById("seller-products-list");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    // منتجات البائع الحالية (التي وافق عليها المسؤول أو التي قيد المراجعة)
    let currentSellerProds = products.filter(p => p.id > 1000); // منتجات مضافة جديدة
    
    // عرض المنتجات في جدول
    if (currentSellerProds.length === 0 && pendingProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    لا توجد منتجات معروضة لك حالياً. أضف منتجك الأول!
                </td>
            </tr>
        `;
        return;
    }
    
    // عرض المنتجات المعلقة أولاً
    pendingProducts.forEach(p => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        tr.style.opacity = "0.7";
        tr.innerHTML = `
            <td style="padding: 10px; display: flex; align-items: center; gap: 8px;">
                <span>${p.icon}</span> ${p.name}
            </td>
            <td style="padding: 10px;">${p.category}</td>
            <td style="padding: 10px;">${p.price.toLocaleString('ar-SY')} ل.س</td>
            <td style="padding: 10px; color: var(--primary-orange); font-weight: 700;">قيد المراجعة ⏳</td>
        `;
        tbody.appendChild(tr);
    });

    // عرض المنتجات النشطة والمثبتة
    products.forEach(p => {
        // محاكاة منتجات تتبع للبائع الحالي
        if (p.id > 10) { 
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
            tr.innerHTML = `
                <td style="padding: 10px; display: flex; align-items: center; gap: 8px;">
                    <span>${p.icon}</span> ${p.name}
                </td>
                <td style="padding: 10px;">${p.category}</td>
                <td style="padding: 10px;">${p.price.toLocaleString('ar-SY')} ل.س</td>
                <td style="padding: 10px; color: #27C93F; font-weight: 700;">نشط ✅</td>
            `;
            tbody.appendChild(tr);
        }
    });
}

// ==============================================
// 10. لوحة الرقابة والإدارة (Admin Management)
// ==============================================
function initAdminEvents() {
    renderAdminPanel();
}

function renderAdminPanel() {
    const pendingProdsContainer = document.getElementById("admin-pending-products");
    const pendingSellersContainer = document.getElementById("admin-pending-sellers");
    
    if (pendingProdsContainer) {
        pendingProdsContainer.innerHTML = "";
        
        if (pendingProducts.length === 0) {
            pendingProdsContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">لا توجد منتجات بانتظار المراجعة.</p>`;
        } else {
            pendingProducts.forEach(p => {
                const item = document.createElement("div");
                item.className = "glass-panel";
                item.style.padding = "1rem";
                item.style.display = "flex";
                item.style.justifyContent = "space-between";
                item.style.alignItems = "center";
                item.innerHTML = `
                    <div>
                        <strong>${p.icon} ${p.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                            البائع: ${p.seller} | السعر: ${p.price.toLocaleString('ar-SY')} ل.س
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-primary" onclick="approveProduct(${p.id})" style="padding: 4px 10px; font-size: 0.8rem;">موافقة</button>
                        <button class="btn btn-outline" onclick="rejectProduct(${p.id})" style="padding: 4px 10px; font-size: 0.8rem; color: #FF2E93; border-color: #FF2E93;">رفض</button>
                    </div>
                `;
                pendingProdsContainer.appendChild(item);
            });
        }
    }
    
    if (pendingSellersContainer) {
        pendingSellersContainer.innerHTML = "";
        
        if (pendingSellers.length === 0) {
            pendingSellersContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">لا توجد طلبات توثيق بائعين جديدة.</p>`;
        } else {
            pendingSellers.forEach(s => {
                const item = document.createElement("div");
                item.className = "glass-panel";
                item.style.padding = "1rem";
                item.style.display = "flex";
                item.style.justifyContent = "space-between";
                item.style.alignItems = "center";
                item.innerHTML = `
                    <div>
                        <strong>👑 ${s.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                            الهاتف: ${s.phone} | بريد: ${s.email}
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="approveSeller('${s.name}')" style="padding: 4px 10px; font-size: 0.8rem;">توثيق الآن</button>
                `;
                pendingSellersContainer.appendChild(item);
            });
        }
    }
}

function approveProduct(id) {
    const prodIdx = pendingProducts.findIndex(p => p.id === id);
    if (prodIdx > -1) {
        const approved = pendingProducts.splice(prodIdx, 1)[0];
        
        // إعطاء آي دي فريد لمتجرنا الأساسي
        approved.id = Date.now();
        products.push(approved);
        
        showToast(`تم قبول منتج ${approved.name} وإضافته إلى المتجر ✅`);
        
        renderStoreProducts();
        renderSellerProducts();
        renderAdminPanel();
    }
}

function rejectProduct(id) {
    pendingProducts = pendingProducts.filter(p => p.id !== id);
    showToast("تم رفض المنتج وحذفه من المراجعة.");
    renderSellerProducts();
    renderAdminPanel();
}

function approveSeller(name) {
    pendingSellers = pendingSellers.filter(s => s.name !== name);
    showToast(`تم توثيق متجر البائع "${name}" بنجاح 👑`);
    renderAdminPanel();
}

// ==============================================
// 11. إتمام الدفع والشراء (Checkout & Success Modals)
// ==============================================
const checkoutModal = document.getElementById("checkout-modal-wrapper");
const checkoutClose = document.getElementById("checkout-close-btn");
const checkoutBg = document.getElementById("checkout-modal-bg");
const checkoutForm = document.getElementById("checkout-form-el");

const successModal = document.getElementById("success-modal-wrapper");
const successDoneBtn = document.getElementById("success-done-btn");
const successBg = document.getElementById("success-modal-bg");

function initCheckoutEvents() {
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", () => {
        toggleCart(false);
        openCheckoutModal();
    });
    
    checkoutClose.addEventListener("click", closeCheckoutModal);
    checkoutBg.addEventListener("click", closeCheckoutModal);
    
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
    
    successDoneBtn.addEventListener("click", closeSuccessModal);
    successBg.addEventListener("click", closeSuccessModal);
}

function openCheckoutModal() {
    let totalVal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    document.getElementById("checkout-total-val").innerText = `${totalVal.toLocaleString('ar-SY')} ل.س`;
    checkoutModal.classList.add("active");
}

function closeCheckoutModal() {
    checkoutModal.classList.remove("active");
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    // محاكاة إرسال الطلب بنجاح
    closeCheckoutModal();
    cart = [];
    updateCartBadge();
    
    // فتح نافذة النجاح
    successModal.classList.add("active");
}

function closeSuccessModal() {
    successModal.classList.remove("active");
    switchView("home-view");
}

// ==============================================
// 12. إشعارات التنبيه الذكية (Toasts Alert System)
// ==============================================
function showToast(message) {
    let toastContainer = document.getElementById("toast-box");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-box";
        toastContainer.style.position = "fixed";
        toastContainer.style.bottom = "80px";
        toastContainer.style.right = "20px";
        toastContainer.style.zIndex = "9999";
        toastContainer.style.display = "flex";
        toastContainer.style.flexDirection = "column";
        toastContainer.style.gap = "10px";
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement("div");
    toast.className = "glass-panel";
    toast.style.padding = "0.8rem 1.5rem";
    toast.style.color = "#FFFFFF";
    toast.style.fontSize = "0.9rem";
    toast.style.fontWeight = "700";
    toast.style.borderLeft = "4px solid var(--primary-orange)";
    toast.style.boxShadow = "0 10px 25px rgba(255, 106, 0, 0.15)";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "var(--transition-smooth)";
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    // إظهار تدريجي
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 50);
    
    // إخفاء وحذف بعد 3.5 ثانية
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}
