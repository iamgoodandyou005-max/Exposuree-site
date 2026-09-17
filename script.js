/* ============================================================
   Ember & Bean — site script
   Menu data, cart, view routing, filtering, WhatsApp ordering.
   No localStorage is used — cart lives in memory for the session,
   which keeps this safe to preview anywhere including sandboxed
   viewers. Replace WHATSAPP_NUMBER + placeholder contact details
   below with the real ones before this goes live.
   ============================================================ */

// ---------- CONFIG — replace before launch ----------
const WHATSAPP_NUMBER = "8801404237472"; // digits only, country code, no plus sign
const RESTAURANT_NAME = "Ember & Bean";

// ---------- MENU DATA ----------
const CATEGORIES = ["Pizza", "Burgers", "Pasta", "Rice", "Snacks", "Coffee", "Drinks", "Desserts"];

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=75`;

const MENU_ITEMS = [
  // Pizza
  { id: "1", name: "Chicken Pizza", category: "Pizza", price: 450, desc: "Grilled chicken, mozzarella, and roasted peppers on a hand-tossed base.", image: img("photo-1513104890138-7c749659a591"), featured: true },
  { id: "2", name: "Margherita Pizza", category: "Pizza", price: 380, desc: "San Marzano tomato, fresh basil, and buffalo mozzarella. Simple, done right.", image: "Food Items images/Margherita Pizza.jpg" },
  { id: "3", name: "BBQ Chicken Pizza", category: "Pizza", price: 480, desc: "Smoky BBQ sauce, pulled chicken, red onion, and a cheddar-mozzarella blend.", image: "Food Items images/BBQ Chicken Pizza.jpg" },
  { id: "4", name: "Veggie Supreme Pizza", category: "Pizza", price: 420, desc: "Bell peppers, mushroom, olives, and sweet corn over melted mozzarella.", image: "Food Items images/Veggie Supreme Pizza.jpg" },

  // Burgers
  { id: "5", name: "Beef Burger", category: "Burgers", price: 280, desc: "Grilled beef patty, cheddar, lettuce, and our house sauce.", image: "Food Items images/Beef Burger.jpg", featured: true },
  { id: "6", name: "Chicken Burger", category: "Burgers", price: 260, desc: "Crispy fried chicken thigh, slaw, and spicy mayo in a soft bun.", image: "Food Items images/Chicken Burger.jpg" },
  { id: "7", name: "Cheese Burger", category: "Burgers", price: 300, desc: "Double cheese, double beef patty, pickles, and mustard.", image: img("photo-1572802419224-296b0aeee0d9") },
  { id: "8", name: "Veggie Burger", category: "Burgers", price: 240, desc: "House-made vegetable patty, fresh greens, and garlic aioli.", image: img("photo-1550547660-d9450f859349") },

  // Pasta
  { id: "9", name: "Chicken Pasta", category: "Pasta", price: 320, desc: "Penne tossed with grilled chicken in a light tomato-cream sauce.", image: "Food Items images/Chicken_Pasta.jpg", featured: true },
  { id: "10", name: "Creamy Alfredo", category: "Pasta", price: 350, desc: "Fettuccine in a rich parmesan cream sauce, finished with cracked pepper.", image: "Food Items images/Creamy Alfredo.jpg", featured: true },
  { id: "11", name: "Spaghetti Bolognese", category: "Pasta", price: 340, desc: "Slow-simmered beef ragu over spaghetti, topped with parmesan.", image: img("photo-1673442635965-34f1b36d8944") },
  { id: "12", name: "Pesto Pasta", category: "Pasta", price: 310, desc: "Basil pesto, cherry tomatoes, and pine nuts tossed through penne.", image: "Food Items images/Pesto Pasta.jpg" },

  // Rice
  { id: "13", name: "Chicken Fried Rice", category: "Rice", price: 260, desc: "Wok-tossed rice with chicken, egg, and spring onion.", image: "Food Items images/Chicken Fried Rice.jpg" },
  { id: "14", name: "Chicken Biryani", category: "Rice", price: 320, desc: "Fragrant basmati rice layered with slow-cooked spiced chicken.", image: img("photo-1631515243349-e0cb75fb8d3a") },
  { id: "15", name: "Vegetable Fried Rice", category: "Rice", price: 220, desc: "Mixed vegetables and egg tossed through wok-fried rice.", image: img("photo-1603133872878-684f208fb84b") },
  { id: "16", name: "Thai Basil Rice", category: "Rice", price: 280, desc: "Stir-fried rice with holy basil, chili, and your choice of protein.", image: "Food Items images/Thai Basil Rice.jpg" },

  // Snacks
  { id: "17", name: "French Fries", category: "Snacks", price: 150, desc: "Crisp-cut fries, salted and served hot.", image: "Food Items images/French fries.jpg" },
  { id: "18", name: "Chicken Wings", category: "Snacks", price: 280, desc: "Tossed in a smoky-spicy glaze, served with dip.", image: "Food Items images/Chicken wings.jpg" },
  { id: "19", name: "Onion Rings", category: "Snacks", price: 160, desc: "Beer-battered and fried until golden.", image: "Food Items images/onion rings.jpg" },
  { id: "20", name: "Nachos with Cheese", category: "Snacks", price: 220, desc: "Tortilla chips loaded with melted cheese and jalapeños.", image: "Food Items images/Nachos with Cheese.jpg" },

  // Coffee
  { id: "21", name: "Cappuccino", category: "Coffee", price: 180, desc: "Espresso, steamed milk, and a thick layer of foam.", image: img("photo-1673568438355-6136a2034d4b"), featured: true },
  { id: "22", name: "Latte", category: "Coffee", price: 190, desc: "Smooth espresso balanced with steamed milk.", image: img("photo-1541167760496-1628856ab772") },
  { id: "23", name: "Espresso", category: "Coffee", price: 140, desc: "A short, strong shot for when you need it fast.", image: img("photo-1514432324607-a09d9b4aefdd") },
  { id: "24", name: "Americano", category: "Coffee", price: 150, desc: "Espresso lengthened with hot water for a lighter cup.", image: img("photo-1559496417-e7f25cb247f3") },
  { id: "25", name: "Cold Brew", category: "Coffee", price: 210, desc: "Steeped for 18 hours, served over ice.", image: img("photo-1461023058943-07fcbe16d735") },

  // Drinks
  { id: "26", name: "Fresh Lime Soda", category: "Drinks", price: 120, desc: "Lime, soda, and a hint of mint. Sweet or salted.", image: img("photo-1634976245495-443328555f70") },
  { id: "27", name: "Iced Tea", category: "Drinks", price: 130, desc: "Chilled black tea with a touch of lemon.", image: "Food Items images/Iced Tea.jpg" },
  { id: "28", name: "Mango Smoothie", category: "Drinks", price: 180, desc: "Blended mango, yogurt, and a little honey.", image: "Food Items images/Mango Smoothie.jpg" },
  { id: "29", name: "Chocolate Milkshake", category: "Drinks", price: 200, desc: "Thick, cold, and properly chocolatey.", image: "Food Items images/Chocolate Milkshake.jpg" },

  // Desserts
  { id: "30", name: "Chocolate Brownie", category: "Desserts", price: 150, desc: "Fudgy, warm, and served with a scoop of vanilla on request.", image: img("photo-1717768024023-73768e73f630"), featured: true },
  { id: "31", name: "Cheesecake", category: "Desserts", price: 220, desc: "Baked New York-style, on a buttery biscuit base.", image: img("photo-1730988479310-cddfd20d564c") },
  { id: "32", name: "Tiramisu", category: "Desserts", price: 240, desc: "Coffee-soaked sponge layered with mascarpone cream.", image: img("photo-1530449791875-f2991d9be1a0") },
  { id: "33", name: "Molten Lava Cake", category: "Desserts", price: 230, desc: "Warm chocolate cake with a soft, molten center.", image: "Food Items images/Molten Lava Cake.jpg" },
];

const GALLERY_IMAGES = [
  { src: img("photo-1600891964092-4316c288032e"), alt: "Warm dining room with wooden tables and pendant lighting" },
  { src: img("photo-1521017432531-fbd92d768814"), alt: "Barista pouring latte art at the counter" },
  { src: img("photo-1513104890138-7c749659a591"), alt: "Freshly baked pizza ready to serve" },
  { src: img("photo-1568901346375-23c9450c58cd"), alt: "Beef burger stacked high with fresh toppings" },
  { src: img("photo-1606313564200-e75d5e30476c"), alt: "Warm chocolate brownie with vanilla ice cream" },
  { src: img("photo-1414235077428-338989a2e8c0"), alt: "Cozy restaurant seating area" },
  { src: img("photo-1466978913421-dad2ebd01d17"), alt: "Window-side seating with warm afternoon light" },
  { src: img("photo-1541167760496-1628856ab772"), alt: "Close-up of latte art in a ceramic cup" },
];

const REVIEWS = [
  { name: "Sabbir Ahmed", stars: 5, quote: "My go-to spot for group study sessions. The Wi-Fi's solid, the cappuccino's better, and nobody rushes you out." },
  { name: "Nusrat Jahan", stars: 5, quote: "Took my parents here for their anniversary. The Alfredo was the best I've had in Cumilla, hands down." },
  { name: "Rafiul Islam", stars: 4, quote: "Ordered through WhatsApp on a Friday night and it showed up faster than I expected. Burger was still hot." },
  { name: "Farzana Akter", stars: 5, quote: "The corner table by the window is basically mine now. Great place to slow down after work." },
];

// ---------- STATE ----------
const state = {
  cart: {},              // { itemId: qty }
  fulfillment: "delivery",
  activeCategory: "All",
  searchTerm: "",
  view: "home",
};

const byId = (id) => MENU_ITEMS.find((m) => m.id === id);
const fmtPrice = (n) => "\u09F3" + n.toLocaleString("en-US");

// ---------- DOM REFS ----------
const header = document.getElementById("site-header");
const mainNav = document.getElementById("main-nav");
const menuToggle = document.getElementById("menu-toggle");
const homeView = document.getElementById("home-view");
const menuView = document.getElementById("menu-view");

const featuredGrid = document.getElementById("featured-menu-grid");
const fullGrid = document.getElementById("full-menu-grid");
const galleryGrid = document.getElementById("gallery-grid");
const reviewsRow = document.getElementById("reviews-row");
const categoryPillsEl = document.getElementById("category-pills");
const searchInput = document.getElementById("menu-search");
const menuEmpty = document.getElementById("menu-empty");

const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");
const cartItemsEl = document.getElementById("cart-items");
const cartEmptyEl = document.getElementById("cart-empty");
const cartFooterEl = document.getElementById("cart-footer");
const cartCountEl = document.getElementById("cart-count");
const cartSubtotalEl = document.getElementById("cart-subtotal-amount");
const addressRow = document.getElementById("address-row");
const orderAddress = document.getElementById("order-address");
const orderPhone = document.getElementById("order-phone");
const placeOrderBtn = document.getElementById("place-order-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

const toastEl = document.getElementById("toast");
let toastTimer = null;

// ---------- RENDER: dish cards ----------
function dishFooterHTML(item) {
  const qty = state.cart[item.id] || 0;
  if (qty > 0) {
    return `
      <div class="qty-stepper" data-id="${item.id}">
        <button type="button" data-action="dec" aria-label="Remove one ${item.name}">\u2212</button>
        <span>${qty}</span>
        <button type="button" data-action="inc" aria-label="Add one more ${item.name}">+</button>
      </div>`;
  }
  return `<button class="add-btn" type="button" data-action="add" data-id="${item.id}">Add to order</button>`;
}

function dishCardHTML(item) {
  return `
    <article class="dish-card" data-id="${item.id}">
      <div class="dish-media">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="dish-body">
        <div class="dish-top">
          <h3>${item.name}</h3>
          <span class="dish-price">${fmtPrice(item.price)}</span>
        </div>
        <p class="dish-desc">${item.desc}</p>
        <div class="dish-foot" data-footer-for="${item.id}">${dishFooterHTML(item)}</div>
      </div>
    </article>`;
}

function renderFeatured() {
  featuredGrid.innerHTML = MENU_ITEMS.filter((m) => m.featured).map(dishCardHTML).join("");
}

function renderFullMenu() {
  const term = state.searchTerm.trim().toLowerCase();
  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCategory = state.activeCategory === "All" || item.category === state.activeCategory;
    const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
  fullGrid.innerHTML = filtered.map(dishCardHTML).join("");
  menuEmpty.hidden = filtered.length !== 0;
}

function refreshAllDishFooters() {
  document.querySelectorAll("[data-footer-for]").forEach((el) => {
    const item = byId(el.dataset.footerFor);
    if (item) el.innerHTML = dishFooterHTML(item);
  });
}

function renderCategoryPills() {
  const cats = ["All", ...CATEGORIES];
  categoryPillsEl.innerHTML = cats
    .map((c) => `<button type="button" role="tab" class="${c === state.activeCategory ? "is-active" : ""}" data-category="${c}">${c}</button>`)
    .join("");
}

function renderGallery() {
  galleryGrid.innerHTML = GALLERY_IMAGES.map(
    (g, i) => `
    <button type="button" data-index="${i}" aria-label="Open photo: ${g.alt}">
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
    </button>`
  ).join("");
}

function renderReviews() {
  reviewsRow.innerHTML = REVIEWS.map(
    (r) => `
    <article class="review-card">
      <div class="review-stars" aria-label="${r.stars} out of 5 stars">${"\u2605".repeat(r.stars)}${"\u2606".repeat(5 - r.stars)}</div>
      <p class="review-quote">${r.quote}</p>
      <p class="review-author">${r.name}</p>
    </article>`
  ).join("");
}

// ---------- CART ----------
function cartItemCount() {
  return Object.values(state.cart).reduce((a, b) => a + b, 0);
}
function cartSubtotal() {
  return Object.entries(state.cart).reduce((sum, [id, qty]) => sum + (byId(id)?.price || 0) * qty, 0);
}
function setQty(id, qty) {
  if (qty <= 0) delete state.cart[id];
  else state.cart[id] = qty;
  updateCartUI();
  refreshAllDishFooters();
}
function addToOrder(id) {
  const wasEmpty = !(id in state.cart);
  state.cart[id] = (state.cart[id] || 0) + 1;
  updateCartUI();
  refreshAllDishFooters();
  const item = byId(id);
  showToast(wasEmpty ? `Added ${item.name} to your order` : `${item.name} \u00d7${state.cart[id]}`);
}

function renderCartItems() {
  const entries = Object.entries(state.cart);
  cartEmptyEl.hidden = entries.length !== 0;
  cartFooterEl.hidden = entries.length === 0;
  cartItemsEl.innerHTML = entries
    .map(([id, qty]) => {
      const item = byId(id);
      return `
      <li class="cart-item" data-id="${id}">
        <img src="${item.image}" alt="" loading="lazy">
        <div class="cart-item-body">
          <div class="cart-item-top">
            <h4>${item.name}</h4>
            <span class="cart-item-price">${fmtPrice(item.price * qty)}</span>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-stepper" data-id="${id}">
              <button type="button" data-action="dec" aria-label="Remove one ${item.name}">\u2212</button>
              <span>${qty}</span>
              <button type="button" data-action="inc" aria-label="Add one more ${item.name}">+</button>
            </div>
            <button type="button" class="remove-btn" data-action="remove" data-id="${id}">Remove</button>
          </div>
        </div>
      </li>`;
    })
    .join("");
}

function updatePlaceOrderState() {
  const phoneOk = orderPhone.value.trim().length >= 6;
  const addressOk = state.fulfillment === "pickup" || orderAddress.value.trim().length > 4;
  placeOrderBtn.disabled = cartItemCount() === 0 || !phoneOk || !addressOk;
}

function updateCartUI() {
  const count = cartItemCount();
  cartCountEl.hidden = count === 0;
  cartCountEl.textContent = count;
  cartFab.classList.toggle("is-visible", count > 0 && !cartDrawer.classList.contains("is-open"));
  cartFabCount.textContent = count;
  cartSubtotalEl.textContent = fmtPrice(cartSubtotal());
  renderCartItems();
  updatePlaceOrderState();
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-open");
  cartFab.classList.remove("is-visible");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  document.body.style.overflow = "";
  if (cartItemCount() > 0) cartFab.classList.add("is-visible");
}

// delegated clicks for add / inc / dec / remove (works for both grids + cart)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  const container = btn.closest("[data-id]");
  const id = container?.dataset.id;
  if (!id) return;
  const currentQty = state.cart[id] || 0;

  if (action === "add") addToOrder(id);
  if (action === "inc") setQty(id, currentQty + 1);
  if (action === "dec") setQty(id, currentQty - 1);
  if (action === "remove") setQty(id, 0);
});

// ---------- FULFILLMENT TOGGLE ----------
document.querySelectorAll(".fulfillment-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".fulfillment-option").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.fulfillment = btn.dataset.fulfillment;
    addressRow.hidden = state.fulfillment !== "delivery";
    updatePlaceOrderState();
  });
});
orderAddress.addEventListener("input", updatePlaceOrderState);
orderPhone.addEventListener("input", updatePlaceOrderState);

// ---------- PLACE ORDER -> WHATSAPP ----------
placeOrderBtn.addEventListener("click", () => {
  const entries = Object.entries(state.cart);
  if (entries.length === 0) return;

  const lines = entries.map(([id, qty]) => {
    const item = byId(id);
    return `${qty}x ${item.name} - ${fmtPrice(item.price * qty)}`;
  });

  const messageParts = [
    `Hi ${RESTAURANT_NAME}! I'd like to place an order:`,
    "",
    ...lines,
    "",
    `Subtotal: ${fmtPrice(cartSubtotal())}`,
    `Order type: ${state.fulfillment === "delivery" ? "Delivery" : "Pickup"}`,
  ];
  if (state.fulfillment === "delivery") messageParts.push(`Address: ${orderAddress.value.trim()}`);
  messageParts.push(`Phone: ${orderPhone.value.trim()}`, "", "Thank you!");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageParts.join("\n"))}`;
  window.open(url, "_blank", "noopener");
  showToast("Opening WhatsApp to confirm your order\u2026");
});

// ---------- CONTACT FORM -> WHATSAPP ----------
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();
  const text = `Hi ${RESTAURANT_NAME}, my name is ${name} (${phone}).\n\n${message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  showToast("Opening WhatsApp with your message\u2026");
  form.reset();
});

// ---------- SEARCH / CATEGORY FILTER ----------
searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  renderFullMenu();
});
categoryPillsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-category]");
  if (!btn) return;
  state.activeCategory = btn.dataset.category;
  renderCategoryPills();
  renderFullMenu();
});

// ---------- VIEW ROUTING (Home <-> Menu) ----------
let menuInitialized = false;

function showView(view, opts = {}) {
  if (view === "menu") {
    homeView.hidden = true;
    menuView.hidden = false;
    header.classList.add("is-solid");
    if (!menuInitialized) {
      renderCategoryPills();
      renderFullMenu();
      menuInitialized = true;
    }
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: "auto" });
  } else {
    menuView.hidden = true;
    homeView.hidden = false;
    header.classList.remove("is-solid");
    if (opts.anchor) {
      requestAnimationFrame(() => {
        const target = document.getElementById(opts.anchor);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else if (!opts.keepScroll) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }
  state.view = view;
}

document.querySelectorAll("[data-view-link]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
    if (el.hasAttribute("data-close-cart")) closeCart();
    const view = el.dataset.viewLink;
    const href = el.getAttribute("href") || "";
    const anchor = href.startsWith("#") ? href.slice(1) : null;
    showView(view, { anchor: view === "home" ? anchor : null });
  });
});

function handleOrderNowClick() {
  if (cartItemCount() > 0) openCart();
  else showView("menu");
}
document.getElementById("order-now-btn").addEventListener("click", handleOrderNowClick);
document.getElementById("hero-order-btn").addEventListener("click", handleOrderNowClick);
document.getElementById("cta-order-btn").addEventListener("click", handleOrderNowClick);

// ---------- MOBILE NAV ----------
function closeMobileNav() {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// ---------- CART DRAWER OPEN/CLOSE ----------
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ---------- LIGHTBOX ----------
function openLightbox(index) {
  const g = GALLERY_IMAGES[index];
  lightboxImg.src = g.src.replace("w=600", "w=1400");
  lightboxImg.alt = g.alt;
  lightbox.classList.add("is-open");
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxImg.src = "";
}
galleryGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  openLightbox(Number(btn.dataset.index));
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (lightbox.classList.contains("is-open")) closeLightbox();
  else if (cartDrawer.classList.contains("is-open")) closeCart();
  else if (mainNav.classList.contains("is-open")) closeMobileNav();
});

// ---------- TOAST ----------
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-open");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-open"), 2600);
}

// ---------- HEADER SCROLL STATE ----------
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

// ---------- CART FAB (floating quick-access button, mobile-friendly) ----------
const cartFab = document.createElement("button");
cartFab.type = "button";
cartFab.className = "cart-fab";
cartFab.setAttribute("aria-label", "View your order");
cartFab.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 6h2l2.4 11.2A2 2 0 0 0 10.35 19H18a2 2 0 0 0 1.95-1.55L21.5 10H6.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>View order (<span id="cart-fab-count">0</span>)</span>`;
document.body.appendChild(cartFab);
const cartFabCount = cartFab.querySelector("#cart-fab-count");
cartFab.addEventListener("click", openCart);

// ---------- SCROLL REVEAL (kept to two moments, per design guidance) ----------
function setupReveal() {
  const targets = [featuredGrid, galleryGrid];
  targets.forEach((t) => t.classList.add("reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => observer.observe(t));
}

// ---------- IMAGE FALLBACK ----------
// If a placeholder photo fails to load, swap to a transparent 1x1 pixel so
// the container's own background shows through instead of a broken-image icon.
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7";
    }
  },
  true
);

// ---------- INIT ----------
function init() {
  document.getElementById("footer-year").textContent = new Date().getFullYear();
  renderFeatured();
  renderGallery();
  renderReviews();
  updateCartUI();
  setupReveal();

  if (window.location.hash === "#menu") {
    showView("menu", { keepScroll: true });
  }
}

init();
