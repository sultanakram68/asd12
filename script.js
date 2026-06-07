document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // Translations (EN, AR, TR)
    // =====================
    const translations = {
        en: {
            nav_home: 'Home',
            nav_about: 'About',
            nav_features: 'Features',
            nav_pricing: 'Pricing',
            nav_contact: 'Contact',
            nav_signin: 'Sign In',
            nav_getstarted: 'Get Started',
            hero_tagline: 'Build. Ship. Scale. — The modern way.',
            hero_explore: 'Start Exploring',
            hero_learn: 'Learn More',
            // About
            about_badge: 'About Us',
            about_title: 'We build the future of digital experiences',
            about_desc: 'lmixi is a cutting-edge platform designed to help teams and individuals create, collaborate, and ship premium digital products faster than ever. Our mission is to empower creators worldwide with tools that are intuitive, powerful, and beautiful.',
            about_stat1: 'Active Users',
            about_stat2: 'Projects Shipped',
            about_stat3: 'Countries',
            about_stat4: 'Uptime %',
            // Features
            features_badge: 'Features',
            features_title: 'Why choose us?',
            feature1_title: 'Clean Design',
            feature1_desc: 'Minimalist aesthetics combined with powerful functionality.',
            feature2_title: 'Fast Performance',
            feature2_desc: 'Optimized for speed, delivering lightning-fast experiences.',
            feature3_title: 'Secure Built',
            feature3_desc: 'Your data is safe with our industry-leading security measures.',
            // Pricing
            pricing_badge: 'Pricing',
            pricing_title: 'Simple, transparent pricing',
            pricing_subtitle: 'Choose the plan that fits your needs',
            price_period: '/month',
            price_popular: 'Most Popular',
            price_free_name: 'Free',
            price_free_desc: 'Perfect for getting started',
            price_free_f1: '✓ 3 Projects',
            price_free_f2: '✓ Basic Analytics',
            price_free_f3: '✓ Community Support',
            price_free_f4: '✗ Custom Domain',
            price_free_f5: '✗ Priority Support',
            price_free_btn: 'Get Started Free',
            price_pro_name: 'Pro',
            price_pro_desc: 'Best for professionals',
            price_pro_f1: '✓ Unlimited Projects',
            price_pro_f2: '✓ Advanced Analytics',
            price_pro_f3: '✓ Priority Support',
            price_pro_f4: '✓ Custom Domain',
            price_pro_f5: '✓ API Access',
            price_pro_btn: 'Upgrade to Pro',
            price_ent_name: 'Enterprise',
            price_ent_desc: 'For large teams & orgs',
            price_ent_f1: '✓ Everything in Pro',
            price_ent_f2: '✓ Dedicated Manager',
            price_ent_f3: '✓ SLA Guarantee',
            price_ent_f4: '✓ SSO & Security',
            price_ent_f5: '✓ Custom Integrations',
            price_ent_btn: 'Contact Sales',
            // Testimonials
            testi_badge: 'Testimonials',
            testi_title: 'What our users say',
            testi1_text: 'lmixi completely transformed our workflow. The speed and design quality are unmatched. We shipped our product 3x faster!',
            testi1_name: 'Sarah Johnson',
            testi1_role: 'Product Manager, TechCorp',
            testi2_text: 'The best platform I\'ve ever used. Clean, intuitive, and incredibly powerful. Our team collaboration improved by 200%.',
            testi2_name: 'Ahmed Al-Rashid',
            testi2_role: 'CTO, StartupX',
            testi3_text: 'Security was our top concern, and lmixi delivered beyond expectations. Enterprise-grade protection with consumer-grade simplicity.',
            testi3_name: 'Elena Kowalski',
            testi3_role: 'Security Lead, FinBank',
            // Contact
            contact_badge: 'Get In Touch',
            contact_title: "Let's work together",
            contact_desc: "Have a question or want to collaborate? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            contact_location: 'San Francisco, CA',
            contact_name: 'Your Name',
            contact_email: 'Your Email',
            contact_message: 'Message',
            contact_send: 'Send Message',
            contact_success: '✓ Message sent successfully!',
            // Sign In Modal
            signin_title: 'Welcome Back',
            signin_subtitle: 'Sign in to your account',
            signin_email: 'Email',
            signin_password: 'Password',
            signin_remember: 'Remember me',
            signin_forgot: 'Forgot password?',
            signin_noaccount: "Don't have an account?",
            signin_signup: 'Sign Up',
            // Footer
            footer_tagline: 'Building the future, one pixel at a time.',
            footer_text: '© 2026 lmixi. All rights reserved.',
            // Menu
            menu_title: 'Menu',
            menu_language: '🌐 Language',
        },
        ar: {
            nav_home: 'الرئيسية',
            nav_about: 'حولنا',
            nav_features: 'المميزات',
            nav_pricing: 'الأسعار',
            nav_contact: 'تواصل',
            nav_signin: 'تسجيل الدخول',
            nav_getstarted: 'ابدأ الآن',
            hero_tagline: 'ابنِ. أطلق. وسّع. — بالطريقة الحديثة.',
            hero_explore: 'ابدأ الاستكشاف',
            hero_learn: 'اعرف المزيد',
            about_badge: 'من نحن',
            about_title: 'نبني مستقبل التجارب الرقمية',
            about_desc: 'lmixi منصة متطورة مصممة لمساعدة الفرق والأفراد على الإنشاء والتعاون وإطلاق منتجات رقمية احترافية بسرعة فائقة. مهمتنا تمكين المبدعين حول العالم بأدوات بديهية وقوية وجميلة.',
            about_stat1: 'مستخدم نشط',
            about_stat2: 'مشروع منجز',
            about_stat3: 'دولة',
            about_stat4: '% وقت التشغيل',
            features_badge: 'المميزات',
            features_title: 'لماذا تختارنا؟',
            feature1_title: 'تصميم أنيق',
            feature1_desc: 'جماليات بسيطة مع وظائف قوية.',
            feature2_title: 'أداء سريع',
            feature2_desc: 'مُحسَّن للسرعة لتقديم تجارب فائقة.',
            feature3_title: 'أمان متين',
            feature3_desc: 'بياناتك آمنة مع إجراءاتنا الأمنية الرائدة.',
            pricing_badge: 'الأسعار',
            pricing_title: 'أسعار بسيطة وشفافة',
            pricing_subtitle: 'اختر الخطة المناسبة لك',
            price_period: '/شهر',
            price_popular: 'الأكثر شعبية',
            price_free_name: 'مجاني',
            price_free_desc: 'مثالي للبدء',
            price_free_f1: '✓ ٣ مشاريع',
            price_free_f2: '✓ تحليلات أساسية',
            price_free_f3: '✓ دعم المجتمع',
            price_free_f4: '✗ نطاق مخصص',
            price_free_f5: '✗ دعم أولوية',
            price_free_btn: 'ابدأ مجاناً',
            price_pro_name: 'احترافي',
            price_pro_desc: 'الأفضل للمحترفين',
            price_pro_f1: '✓ مشاريع غير محدودة',
            price_pro_f2: '✓ تحليلات متقدمة',
            price_pro_f3: '✓ دعم أولوية',
            price_pro_f4: '✓ نطاق مخصص',
            price_pro_f5: '✓ وصول API',
            price_pro_btn: 'ترقية للاحترافي',
            price_ent_name: 'المؤسسات',
            price_ent_desc: 'للفرق والمنظمات الكبيرة',
            price_ent_f1: '✓ كل شيء في الاحترافي',
            price_ent_f2: '✓ مدير مخصص',
            price_ent_f3: '✓ ضمان SLA',
            price_ent_f4: '✓ SSO والأمان',
            price_ent_f5: '✓ تكاملات مخصصة',
            price_ent_btn: 'تواصل مع المبيعات',
            testi_badge: 'آراء العملاء',
            testi_title: 'ماذا يقول مستخدمونا',
            testi1_text: 'lmixi غيّرت سير عملنا بالكامل. السرعة وجودة التصميم لا مثيل لهما. أطلقنا منتجنا أسرع ٣ مرات!',
            testi1_name: 'سارة جونسون',
            testi1_role: 'مدير منتجات، TechCorp',
            testi2_text: 'أفضل منصة استخدمتها على الإطلاق. نظيفة وبديهية وقوية بشكل لا يصدق. تعاون فريقنا تحسن بنسبة ٢٠٠٪.',
            testi2_name: 'أحمد الراشد',
            testi2_role: 'مدير التقنية، StartupX',
            testi3_text: 'الأمان كان اهتمامنا الأول، وlmixi تجاوزت التوقعات. حماية بمستوى المؤسسات مع بساطة المستهلك.',
            testi3_name: 'إيلينا كوالسكي',
            testi3_role: 'قائدة الأمان، FinBank',
            contact_badge: 'تواصل معنا',
            contact_title: 'لنعمل معاً',
            contact_desc: 'عندك سؤال أو تبي تتعاون؟ نحب نسمع منك. أرسل لنا رسالة وبنرد عليك بأسرع وقت.',
            contact_location: 'سان فرانسيسكو، كاليفورنيا',
            contact_name: 'اسمك',
            contact_email: 'بريدك الإلكتروني',
            contact_message: 'الرسالة',
            contact_send: 'إرسال الرسالة',
            contact_success: '✓ تم إرسال الرسالة بنجاح!',
            signin_title: 'مرحباً بعودتك',
            signin_subtitle: 'سجل دخولك إلى حسابك',
            signin_email: 'البريد الإلكتروني',
            signin_password: 'كلمة المرور',
            signin_remember: 'تذكرني',
            signin_forgot: 'نسيت كلمة المرور؟',
            signin_noaccount: 'ما عندك حساب؟',
            signin_signup: 'سجل الآن',
            footer_tagline: 'نبني المستقبل، بكسل تلو الآخر.',
            footer_text: '© 2026 lmixi. جميع الحقوق محفوظة.',
            menu_title: 'القائمة',
            menu_language: '🌐 اللغة',
        },
        tr: {
            nav_home: 'Ana Sayfa',
            nav_about: 'Hakkımızda',
            nav_features: 'Özellikler',
            nav_pricing: 'Fiyatlar',
            nav_contact: 'İletişim',
            nav_signin: 'Giriş Yap',
            nav_getstarted: 'Başla',
            hero_tagline: 'Oluştur. Gönder. Ölçekle. — Modern yol.',
            hero_explore: 'Keşfetmeye Başla',
            hero_learn: 'Daha Fazla Bilgi',
            about_badge: 'Hakkımızda',
            about_title: 'Dijital deneyimlerin geleceğini inşa ediyoruz',
            about_desc: 'lmixi, ekiplerin ve bireylerin premium dijital ürünleri her zamankinden daha hızlı oluşturmasına, işbirliği yapmasına ve göndermesine yardımcı olmak için tasarlanmış son teknoloji bir platformdur.',
            about_stat1: 'Aktif Kullanıcı',
            about_stat2: 'Gönderilen Proje',
            about_stat3: 'Ülke',
            about_stat4: 'Çalışma Süresi %',
            features_badge: 'Özellikler',
            features_title: 'Neden bizi seçmelisiniz?',
            feature1_title: 'Temiz Tasarım',
            feature1_desc: 'Güçlü işlevsellikle birleşen minimalist estetik.',
            feature2_title: 'Hızlı Performans',
            feature2_desc: 'Hız için optimize edilmiş, yıldırım hızında deneyimler.',
            feature3_title: 'Güvenli Yapı',
            feature3_desc: 'Verileriniz sektör lideri güvenlik önlemleriyle güvende.',
            pricing_badge: 'Fiyatlar',
            pricing_title: 'Basit, şeffaf fiyatlandırma',
            pricing_subtitle: 'İhtiyaçlarınıza uygun planı seçin',
            price_period: '/ay',
            price_popular: 'En Popüler',
            price_free_name: 'Ücretsiz',
            price_free_desc: 'Başlamak için mükemmel',
            price_free_f1: '✓ 3 Proje',
            price_free_f2: '✓ Temel Analitik',
            price_free_f3: '✓ Topluluk Desteği',
            price_free_f4: '✗ Özel Alan Adı',
            price_free_f5: '✗ Öncelikli Destek',
            price_free_btn: 'Ücretsiz Başla',
            price_pro_name: 'Pro',
            price_pro_desc: 'Profesyoneller için en iyisi',
            price_pro_f1: '✓ Sınırsız Proje',
            price_pro_f2: '✓ Gelişmiş Analitik',
            price_pro_f3: '✓ Öncelikli Destek',
            price_pro_f4: '✓ Özel Alan Adı',
            price_pro_f5: '✓ API Erişimi',
            price_pro_btn: "Pro'ya Yükselt",
            price_ent_name: 'Kurumsal',
            price_ent_desc: 'Büyük ekipler ve kuruluşlar için',
            price_ent_f1: "✓ Pro'daki her şey",
            price_ent_f2: '✓ Özel Yönetici',
            price_ent_f3: '✓ SLA Garantisi',
            price_ent_f4: '✓ SSO ve Güvenlik',
            price_ent_f5: '✓ Özel Entegrasyonlar',
            price_ent_btn: 'Satışla İletişim',
            testi_badge: 'Görüşler',
            testi_title: 'Kullanıcılarımız ne diyor',
            testi1_text: "lmixi iş akışımızı tamamen dönüştürdü. Hız ve tasarım kalitesi eşsiz. Ürünümüzü 3 kat daha hızlı gönderdik!",
            testi1_name: 'Sarah Johnson',
            testi1_role: 'Ürün Müdürü, TechCorp',
            testi2_text: "Kullandığım en iyi platform. Temiz, sezgisel ve inanılmaz güçlü. Ekip işbirliğimiz %200 arttı.",
            testi2_name: 'Ahmed Al-Rashid',
            testi2_role: 'CTO, StartupX',
            testi3_text: "Güvenlik en büyük endişemizdi ve lmixi beklentilerin ötesine geçti. Kurumsal düzeyde koruma, tüketici düzeyinde basitlik.",
            testi3_name: 'Elena Kowalski',
            testi3_role: 'Güvenlik Lideri, FinBank',
            contact_badge: 'İletişime Geçin',
            contact_title: 'Birlikte çalışalım',
            contact_desc: 'Bir sorunuz mu var veya işbirliği yapmak mı istiyorsunuz? Sizden duymak isteriz. Bize mesaj gönderin, en kısa sürede yanıtlayalım.',
            contact_location: 'San Francisco, CA',
            contact_name: 'Adınız',
            contact_email: 'E-postanız',
            contact_message: 'Mesaj',
            contact_send: 'Mesaj Gönder',
            contact_success: '✓ Mesaj başarıyla gönderildi!',
            signin_title: 'Tekrar Hoş Geldiniz',
            signin_subtitle: 'Hesabınıza giriş yapın',
            signin_email: 'E-posta',
            signin_password: 'Şifre',
            signin_remember: 'Beni hatırla',
            signin_forgot: 'Şifremi unuttum?',
            signin_noaccount: 'Hesabınız yok mu?',
            signin_signup: 'Kayıt Ol',
            footer_tagline: 'Geleceği inşa ediyoruz, piksel piksel.',
            footer_text: '© 2026 lmixi. Tüm hakları saklıdır.',
            menu_title: 'Menü',
            menu_language: '🌐 Dil',
        }
    };

    const langFlags = { en: '🇬🇧', ar: '🇸🇦', tr: '🇹🇷' };
    const langLabels = { en: 'EN', ar: 'عر', tr: 'TR' };
    let currentLang = 'en';

    // =====================
    // Apply translations
    // =====================
    function applyLanguage(lang) {
        currentLang = lang;
        const dict = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });

        // Update language button
        const flagEl = document.getElementById('current-lang-flag');
        const textEl = document.getElementById('current-lang-text');
        if (flagEl) flagEl.textContent = langFlags[lang];
        if (textEl) textEl.textContent = langLabels[lang];

        // Update language attribute (keep layout LTR)
        const html = document.documentElement;
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', lang);

        // Close dropdown
        const dd = document.getElementById('lang-dropdown');
        const ls = document.getElementById('lang-selector');
        if (dd) dd.classList.remove('active');
        if (ls) ls.classList.remove('active');

        // Close side menu
        closeMenuFn();
    }

    // =====================
    // Language Selector
    // =====================
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langSelector = document.getElementById('lang-selector');

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langDropdown) langDropdown.classList.toggle('active');
            if (langSelector) langSelector.classList.toggle('active');
        });
    }

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = btn.getAttribute('data-lang');
            applyLanguage(lang);
        });
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', () => {
        if (langDropdown) langDropdown.classList.remove('active');
        if (langSelector) langSelector.classList.remove('active');
    });

    // =====================
    // Hamburger & Side Menu
    // =====================
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('close-menu');

    function openMenu() {
        hamburger.classList.add('active');
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFn() {
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (sideMenu.classList.contains('active')) {
            closeMenuFn();
        } else {
            openMenu();
        }
    });

    closeMenu.addEventListener('click', closeMenuFn);
    overlay.addEventListener('click', closeMenuFn);

    // Close menu when clicking a side link
    document.querySelectorAll('.side-link').forEach(link => {
        link.addEventListener('click', closeMenuFn);
    });

    // =====================
    // Sign In Modal
    // =====================
    const signinModal = document.getElementById('signin-modal');
    const signinOpenBtn = document.getElementById('signin-open-btn');
    const sideSigninBtn = document.getElementById('side-signin-btn');
    const signinClose = document.getElementById('signin-close');
    const signinForm = document.getElementById('signin-form');

    function openSigninModal() {
        signinModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeMenuFn();
    }

    function closeSigninModal() {
        signinModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (signinOpenBtn) signinOpenBtn.addEventListener('click', openSigninModal);
    if (sideSigninBtn) sideSigninBtn.addEventListener('click', openSigninModal);
    if (signinClose) signinClose.addEventListener('click', closeSigninModal);

    signinModal.addEventListener('click', (e) => {
        if (e.target === signinModal) closeSigninModal();
    });

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate sign in
            closeSigninModal();
        });
    }

    // =====================
    // Contact Form
    // =====================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formSuccess.classList.add('visible');
            contactForm.reset();
            setTimeout(() => {
                formSuccess.classList.remove('visible');
            }, 4000);
        });
    }

    // =====================
    // Smooth scrolling
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =====================
    // Navbar scroll effect
    // =====================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =====================
    // Logo follows mouse
    // =====================
    const heroLogo = document.querySelector('.hero-logo');
    const logoSvg = document.querySelector('.logo-svg');

    if (heroLogo && logoSvg) {
        heroLogo.addEventListener('mouseenter', () => {
            logoSvg.style.transform = 'scale(0.85)';
        });

        heroLogo.addEventListener('mouseleave', () => {
            logoSvg.style.transform = 'scale(1) translate(0, 0)';
        });

        heroLogo.addEventListener('mousemove', (e) => {
            const rect = heroLogo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = (e.clientX - centerX) / (rect.width / 2);
            const offsetY = (e.clientY - centerY) / (rect.height / 2);
            const moveX = offsetX * 40;
            const moveY = offsetY * 40;
            logoSvg.style.transform = `scale(0.85) translate(${moveX}px, ${moveY}px)`;
        });

        // Touch support for mobile
        let touchActive = false;
        let logoStartX, logoStartY;

        heroLogo.addEventListener('touchstart', (e) => {
            touchActive = true;
            const rect = heroLogo.getBoundingClientRect();
            logoStartX = rect.left + rect.width / 2;
            logoStartY = rect.top + rect.height / 2;
            logoSvg.style.transition = 'transform 0.1s ease-out';
            logoSvg.style.transform = 'scale(0.85)';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!touchActive) return;
            const touch = e.touches[0];
            const moveX = touch.clientX - logoStartX;
            const moveY = touch.clientY - logoStartY;
            logoSvg.style.transition = 'none';
            logoSvg.style.transform = `scale(0.85) translate(${moveX}px, ${moveY}px)`;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!touchActive) return;
            touchActive = false;
            logoSvg.style.transition = 'transform 0.4s ease-out';
            logoSvg.style.transform = 'scale(1) translate(0, 0)';
        });
    }

    // =====================
    // Scroll Reveal (Intersection Observer)
    // =====================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =====================
    // Animated Counters (About Stats)
    // =====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) counterObserver.observe(aboutStats);

    function animateCounters() {
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                // Format number with comma/plus
                if (target >= 1000) {
                    el.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    el.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
                }
            }, 16);
        });
    }

    // =====================
    // Testimonials Carousel
    // =====================
    const testiTrack = document.getElementById('testi-track');
    const testiDots = document.querySelectorAll('.testi-dot');
    let currentSlide = 0;
    const totalSlides = 3;
    let autoSlideInterval;

    function goToSlide(index) {
        currentSlide = index;
        testiTrack.style.transform = `translateX(-${index * 100}%)`;
        testiDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    testiDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToSlide(index);
            resetAutoSlide();
        });
    });

    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            const next = (currentSlide + 1) % totalSlides;
            goToSlide(next);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }

    autoSlide();

    // Touch swipe for testimonials
    let testiStartX = 0;
    const testiCarousel = document.getElementById('testi-carousel');

    if (testiCarousel) {
        testiCarousel.addEventListener('touchstart', (e) => {
            testiStartX = e.touches[0].clientX;
        }, { passive: true });

        testiCarousel.addEventListener('touchend', (e) => {
            const diff = testiStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                } else if (diff < 0 && currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
                resetAutoSlide();
            }
        });
    }

    // =====================
    // Floating Particles
    // =====================
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        const count = window.innerWidth < 768 ? 12 : 25;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // =====================
    // Keyboard Escape
    // =====================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSigninModal();
            closeMenuFn();
        }
    });
});
