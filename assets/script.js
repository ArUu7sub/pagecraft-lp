// Footer year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 16) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  hamburgerBtn.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    iconMenu.style.display = isOpen ? 'none' : 'block';
    iconClose.style.display = isOpen ? 'block' : 'none';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      iconMenu.style.display = 'block';
      iconClose.style.display = 'none';
    });
  });

  // Pricing toggle
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleAnnual = document.getElementById('toggle-annual');
  const starterPrice = document.getElementById('starter-price');
  const growthPrice = document.getElementById('growth-price');

  const prices = {
    starter: { monthly: 9800, annual: 7840 },
    growth: { monthly: 29800, annual: 23840 }
  };

  function formatPrice(n) {
    return '¥' + n.toLocaleString('ja-JP');
  }

  function setAnnual(isAnnual) {
    starterPrice.textContent = formatPrice(isAnnual ? prices.starter.annual : prices.starter.monthly);
    growthPrice.textContent = formatPrice(isAnnual ? prices.growth.annual : prices.growth.monthly);
    if (isAnnual) {
      toggleAnnual.classList.add('active');
      toggleMonthly.classList.remove('active');
    } else {
      toggleMonthly.classList.add('active');
      toggleAnnual.classList.remove('active');
    }
  }

  toggleAnnual.addEventListener('click', function() { setAnnual(true); });
  toggleMonthly.addEventListener('click', function() { setAnnual(false); });

  // FAQ accordion
  document.querySelectorAll('.faq-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function(el) {
        el.classList.remove('open');
        el.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 64;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });