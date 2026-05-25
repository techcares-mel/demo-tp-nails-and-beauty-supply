/* ============================================================
   TP Nails and Beauty Supply — script.js
   ============================================================ */

'use strict';

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}

// ============================================================
// NAV — scroll behaviour + top offset
// ============================================================
const mainNav = document.getElementById('mainNav');
const topBar = document.querySelector('.top-bar');
const promoBanner = document.querySelector('.ticker-banner');
const heroSection = document.getElementById('home');

function updateNavOffset() {
  const topBarH = topBar ? topBar.offsetHeight : 0;
  const promoH = promoBanner ? promoBanner.offsetHeight : 0;
  const totalAbove = topBarH + promoH;

  // Keep ticker pinned just below the top-bar
  if (promoBanner) promoBanner.style.top = topBarH + 'px';

  // Keep nav pinned just below the ticker
  mainNav.style.top = totalAbove + 'px';

  // Push hero content to start just below the nav
  if (heroSection) {
    const navH = mainNav ? mainNav.offsetHeight : 0;
    heroSection.style.paddingTop = (totalAbove + navH + 16) + 'px';
  }
}

function handleNavScroll() {
  if (window.scrollY > 50) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
}

// ============================================================
// BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// COMBINED SCROLL HANDLER
// ============================================================
window.addEventListener('scroll', () => {
  updateScrollProgress();
  handleNavScroll();
  handleBackToTop();
  updateNavOffset();
}, { passive: true });

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    closeCart();
    closeProductModal();
  }
});

// ============================================================
// ACTIVE NAV LINK (IntersectionObserver)
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================================
// CATEGORY FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ============================================================
// CART
// ============================================================
let cart = [];

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cartTotal').textContent = 'A$' + total.toFixed(2);
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    return;
  }
  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHtml(item.name)}</div>
        <div class="cart-item-price">A$${item.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Remove ${escapeHtml(item.name)}">✕</button>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function addToCart(name, price, qty = 1) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price: parseFloat(price), qty });
  }
  updateCartBadge();
  updateCartTotal();
  renderCartItems();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  updateCartTotal();
  renderCartItems();
}

// Make removeFromCart globally accessible (called from onclick in innerHTML)
window.removeFromCart = removeFromCart;

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// PRODUCT DETAIL MODAL
// ============================================================
let modalQty = 1;
let modalCurrentName = '';
let modalCurrentPrice = 0;

function openProductModal(card) {
  const name    = card.querySelector('.product-name').textContent;
  const cat     = card.querySelector('.product-cat').textContent;
  const priceEl = card.querySelector('.product-price').textContent;
  const img     = card.querySelector('.product-img-wrap img');
  const desc    = card.dataset.description || '';

  modalCurrentName  = name;
  modalCurrentPrice = parseFloat(priceEl.replace('A$', ''));
  modalQty = 1;

  document.getElementById('modalProductName').textContent = name;
  document.getElementById('modalCat').textContent         = cat;
  document.getElementById('modalPrice').textContent       = priceEl;
  document.getElementById('modalDesc').textContent        = desc;
  document.getElementById('qtyVal').textContent           = '1';

  const modalImg = document.getElementById('modalImg');
  if (img) {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  }

  document.getElementById('productModal').classList.add('open');
  document.getElementById('productModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.getElementById('productModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');
const formThanks = document.getElementById('formThanks');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.transition = 'opacity 0.3s ease';
    contactForm.style.opacity = '0';
    setTimeout(() => {
      contactForm.style.display = 'none';
      formThanks.style.display = 'block';
    }, 300);
  });
}

// ============================================================
// WIRE UP BUTTONS + INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Nav offset
  updateNavOffset();
  window.addEventListener('resize', updateNavOffset);

  // Cart buttons
  document.querySelectorAll('.add-to-cart-btn, .quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.name, btn.dataset.price);
    });
  });

  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('This is a demo website. No real orders are processed.\n\nTo place an order, please contact us at 0451 228 899.');
    });
  }

  // Nav filter links (Nail dropdown, Hair, Beauty, Salon Supplies)
  function applyFilter(filter) {
    filterBtns.forEach(b => b.classList.remove('active'));
    const targetBtn = [...filterBtns].find(b => b.dataset.filter === filter);
    if (targetBtn) targetBtn.classList.add('active');
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  document.querySelectorAll('.nav-filter-link, .mobile-filter-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.dataset.filter;
      if (filter) {
        e.preventDefault();
        closeMobileMenu();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => applyFilter(filter), 400);
      }
    });
  });

  // Promo banner Shop Now buttons
  document.querySelectorAll('.promo-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.dataset.filter;
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => applyFilter(filter), 500);
    });
  });

  // Product modal
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn') || e.target.closest('.quick-add')) return;
      openProductModal(card);
    });
  });

  const modalClose   = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('productModalOverlay');
  const qtyMinus     = document.getElementById('qtyMinus');
  const qtyPlus      = document.getElementById('qtyPlus');
  const modalAddBtn  = document.getElementById('modalAddBtn');

  if (modalClose)   modalClose.addEventListener('click', closeProductModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal);

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (modalQty > 1) {
        modalQty--;
        document.getElementById('qtyVal').textContent = modalQty;
      }
    });
  }
  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      modalQty++;
      document.getElementById('qtyVal').textContent = modalQty;
    });
  }
  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
      addToCart(modalCurrentName, modalCurrentPrice, modalQty);
      closeProductModal();
    });
  }

  // Initial state
  updateScrollProgress();
  handleNavScroll();
  handleBackToTop();
});
