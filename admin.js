// ==========================================
// Admin Dashboard Logic (admin.js)
// ==========================================

const ADMIN_EMAIL = 'Sultanakram682@gmail.com';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Auth Guard & Login Logic
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        // We are on the login page
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value.trim();
            const pass = document.getElementById('admin-pass').value.trim();
            const errorMsg = document.getElementById('login-error');

            if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
                // Success (accept any password for now since it's frontend demo)
                localStorage.setItem('lmixi_admin_auth', 'true');
                window.location.href = 'admin.html';
            } else {
                errorMsg.style.display = 'block';
                errorMsg.innerText = 'عذراً، هذا البريد غير مصرح له بالدخول للوحة التحكم.';
                // Simple shake animation
                loginForm.parentElement.style.animation = 'shake 0.4s';
                setTimeout(() => loginForm.parentElement.style.animation = '', 400);
            }
        });

        // Add shake animation to document
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                50% { transform: translateX(10px); }
                75% { transform: translateX(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Dashboard Protection (if on admin.html)
    const isAdminPage = document.querySelector('.admin-dashboard-layout');
    if (isAdminPage) {
        if (localStorage.getItem('lmixi_admin_auth') !== 'true') {
            window.location.href = 'admin-login.html';
        }

        // Logout
        const logoutBtn = document.getElementById('admin-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('lmixi_admin_auth');
                window.location.href = 'admin-login.html';
            });
        }

        // ==========================================
        // Tab Switching Logic (SPA)
        // ==========================================
        const navLinks = document.querySelectorAll('.admin-nav-item');
        const sections = document.querySelectorAll('.admin-section');
        const sidebar = document.getElementById('admin-sidebar');
        const overlay = document.getElementById('admin-overlay');
        const menuToggle = document.getElementById('admin-menu-toggle');

        function switchTab(targetId) {
            // Update Nav Links
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.admin-nav-item[data-target="${targetId}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Update Sections
            sections.forEach(section => section.classList.remove('active'));
            const activeSection = document.getElementById(targetId);
            if (activeSection) activeSection.classList.add('active');

            // Close mobile sidebar
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                switchTab(targetId);
            });
        });

        // Mobile Sidebar Toggle
        if (menuToggle && sidebar && overlay) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.add('open');
                overlay.classList.add('active');
            });
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }

        // ==========================================
        // Modal Logic (Add/Edit)
        // ==========================================
        const addProductBtn = document.getElementById('btn-add-product');
        const productModal = document.getElementById('product-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');

        if (addProductBtn && productModal) {
            addProductBtn.addEventListener('click', () => {
                productModal.classList.add('active');
            });
        }

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-overlay');
                if (modal) modal.classList.remove('active');
            });
        });

        // Form Submit Demos (Mock Data)
        const productForm = document.getElementById('product-form');
        if (productForm) {
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();
                productModal.classList.remove('active');
                if (window.showToast) {
                    window.showToast('تمت إضافة المنتج بنجاح!', 'success');
                } else {
                    alert('تمت إضافة المنتج بنجاح!');
                }
            });
        }

    }

    // Reuse showToast from script.js if not available (for standalone usage)
    if (!window.showToast) {
        window.showToast = function(message, type = 'success') {
            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-container';
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            const icon = type === 'success' ? '✅' : '⚠️';
            toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => {
                toast.style.animation = 'fadeOutUpToast 0.4s forwards';
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        };
    }
});
