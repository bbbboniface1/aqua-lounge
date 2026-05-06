// Fixed: JavaScript syntax errors and UTF-8 encoding issues
(function () {
  const phone = "22377777477";
  const storageKey = "king-aqua-cart";

  const formatPrice = (value) => new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
  const allItems = () => (window.KING_AQUA_MENU || []).flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));
  const getCart = () => JSON.parse(localStorage.getItem(storageKey) || "[]");
  const saveCart = (cart) => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
    updateCartCount();
  };

  function placeholder(label = "Plat signature") {
    return `<div class="placeholder"><span>${label}</span></div>`;
  }

  function fallbackImage(item = {}) {
    const text = `${item.category || ""} ${item.name || ""}`.toLowerCase();
    if (text.includes("salade") || text.includes("entrée")) return "images/optimized/menu-entrees.webp";
    if (text.includes("soupe") || text.includes("beignet") || text.includes("nems")) return "images/optimized/menu-entrees-chaudes.webp";
    if (text.includes("spaghetti") || text.includes("pâte")) return "images/optimized/menu-pates.webp";
    if (text.includes("poulet")) return "images/optimized/menu-volailles.webp";
    if (text.includes("brochette") || text.includes("gambas") || text.includes("crevette")) return "images/optimized/menu-brochettes.webp";
    return "images/optimized/menu-grillades.webp";
  }

  function imageMarkup(item) {
    const source = item.image || fallbackImage(item);
    const fallback = fallbackImage(item);
    return source
      ? `<img src="${source}" alt="${item.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallback}';">`
      : placeholder(item.name);
  }

  function cardMarkup(item, popular = item.popular) {
    return `
      <article class="card reveal card-${item.id}">
        <div class="card-media">
          ${imageMarkup(item)}
          ${popular ? `<span class="badge">Populaire</span>` : ""}
          <span class="card-media-price">${formatPrice(item.price)}</span>
        </div>
        <div class="card-body">
          <p class="card-kicker">${item.category || "King Aqua"}</p>
          <div class="card-title">
            <h3>${item.name}</h3>
          </div>
          <p class="item-desc">${item.desc}</p>
          <div class="card-actions">
            <button class="btn primary add-to-cart" data-id="${item.id}" type="button">Commander</button>
            <a class="btn ghost" href="commande.html">Panier</a>
          </div>
        </div>
      </article>`;
  }

  function addToCart(id, trigger) {
    const item = allItems().find((entry) => entry.id === id);
    if (!item) return;
    const cart = getCart();
    const current = cart.find((entry) => entry.id === id);
    if (current) current.qty += 1;
    else cart.push({ id: item.id, name: item.name, price: item.price, image: item.image || fallbackImage(item), category: item.category, qty: 1 });
    saveCart(cart);
    if (trigger) {
      trigger.classList.remove("is-popping");
      window.requestAnimationFrame(() => trigger.classList.add("is-popping"));
      window.setTimeout(() => trigger.classList.remove("is-popping"), 380);
    }
    showToast(`${item.name} ajouté au panier`);
  }

  function updateQty(id, delta) {
    const cart = getCart().map((entry) => entry.id === id ? { ...entry, qty: entry.qty + delta } : entry).filter((entry) => entry.qty > 0);
    saveCart(cart);
    renderOrder();
  }

  function removeItem(id) {
    saveCart(getCart().filter((entry) => entry.id !== id));
    renderOrder();
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, entry) => sum + entry.qty, 0);
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = count;
      node.setAttribute("aria-label", `${count} article(s) dans le panier`);
    });
  }

  function showToast(message) {
    let toast = document.querySelector(".cart-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "cart-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(window.__kingToast);
    window.__kingToast = window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function renderMenu() {
    const root = document.querySelector("[data-menu-root]");
    if (!root) return;
    root.innerHTML = window.KING_AQUA_MENU.map((group) => `
      <section class="menu-category" id="${slug(group.category)}">
        <h2>${group.category}</h2>
        <div class="menu-grid">${group.items.map((item) => cardMarkup({ ...item, category: group.category })).join("")}</div>
      </section>
    `).join("");

    const tabs = document.querySelector("[data-tabs]");
    if (tabs) {
      tabs.innerHTML = window.KING_AQUA_MENU.map((group, index) => `<a class="tab ${index === 0 ? "active" : ""}" href="#${slug(group.category)}">${group.category}</a>`).join("");
    }
  }

  function renderPopular() {
    const root = document.querySelector("[data-popular-root]");
    if (!root) return;
    const items = allItems().filter((item) => window.KING_AQUA_POPULAR.includes(item.id)).slice(0, 6);
    root.innerHTML = items.map((item) => cardMarkup(item, true)).join("");
  }

  function renderOrder() {
    const lines = document.querySelector("[data-cart-lines]");
    if (!lines) return;
    const cart = getCart();
    const total = cart.reduce((sum, entry) => sum + entry.price * entry.qty, 0);

    lines.innerHTML = cart.length ? cart.map((entry) => `
      <div class="cart-line">
        <img src="${entry.image || fallbackImage(entry)}" alt="${entry.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackImage(entry)}';">
        <div>
          <strong>${entry.name}</strong>
          <div class="muted">${formatPrice(entry.price)}</div>
          <div class="qty" aria-label="Quantité">
            <button type="button" data-dec="${entry.id}">-</button>
            <span>${entry.qty}</span>
            <button type="button" data-inc="${entry.id}">+</button>
          </div>
          <button class="remove" type="button" data-remove="${entry.id}">Supprimer</button>
        </div>
        <strong class="price">${formatPrice(entry.price * entry.qty)}</strong>
      </div>
    `).join("") : `<p class="muted">Votre panier est vide. Ajoutez vos plats depuis la page menu.</p><a class="btn primary" href="menu.html">Voir le menu</a>`;

    document.querySelectorAll("[data-total]").forEach((node) => node.textContent = formatPrice(total));
    updateWhatsappLink(false);
  }

  function getCustomerData() {
    const form = document.querySelector("[data-customer-form]");
    if (!form) return null;
    const data = new FormData(form);
    return {
      nom: String(data.get("nom") || "").trim(),
      prenom: String(data.get("prenom") || "").trim(),
      telephone: String(data.get("telephone") || "").trim(),
      quartier: String(data.get("quartier") || "").trim()
    };
  }

  function validateCustomerForm() {
    const form = document.querySelector("[data-customer-form]");
    const error = document.querySelector("[data-form-error]");
    if (!form) return true;

    let firstInvalid = null;
    form.querySelectorAll("input[required]").forEach((input) => {
      const invalid = !input.value.trim();
      input.classList.toggle("is-invalid", invalid);
      if (invalid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      if (error) error.textContent = "Merci de compléter vos informations avant d’envoyer la commande.";
      firstInvalid.focus();
      return false;
    }

    if (error) error.textContent = "";
    return true;
  }

  function buildWhatsappMessage() {
    const cart = getCart();
    if (!cart.length) return "";
    const total = cart.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
    const customer = getCustomerData() || { nom: "", prenom: "", telephone: "", quartier: "" };
    const lines = [
      "Commande King Aqua Lounge :",
      "",
      ...cart.map((entry) => `- ${entry.name} x${entry.qty} — ${formatPrice(entry.price * entry.qty)}`),
      "",
      `Total : ${formatPrice(total)}`,
      "",
      "Client :",
      `Nom : ${customer.nom}`,
      `Prénom : ${customer.prenom}`,
      `Téléphone : ${customer.telephone}`,
      `Quartier : ${customer.quartier}`
    ];
    return lines.join("\n");
  }

  function updateWhatsappLink(requireValid) {
    const whatsapp = document.querySelector("[data-whatsapp-order]");
    if (!whatsapp) return false;
    const cart = getCart();

    if (!cart.length) {
      whatsapp.href = "#";
      return false;
    }

    if (requireValid && !validateCustomerForm()) {
      whatsapp.href = "#";
      return false;
    }

    const message = buildWhatsappMessage();
    whatsapp.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    return true;
  }

  function slug(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const nav = document.querySelector(".nav");
      if (nav?.classList.contains("open") && !event.target.closest(".nav-links, .burger, .brand")) {
        nav.classList.remove("open");
      }

      const target = event.target.closest("[data-id], [data-inc], [data-dec], [data-remove], [data-whatsapp-order], .burger, .nav-links a");
      if (!target) return;
      if (target.classList.contains("burger")) {
        nav?.classList.toggle("open");
      }
      if (target.matches(".nav-links a")) {
        nav?.classList.remove("open");
      }
      if (target.dataset.id) addToCart(target.dataset.id, target);
      if (target.dataset.inc) updateQty(target.dataset.inc, 1);
      if (target.dataset.dec) updateQty(target.dataset.dec, -1);
      if (target.dataset.remove) removeItem(target.dataset.remove);
      if (target.dataset.whatsappOrder !== undefined) {
        if (!getCart().length) {
          event.preventDefault();
          showToast("Ajoutez au moins un plat avant de commander");
          return;
        }
        if (!updateWhatsappLink(true)) {
          event.preventDefault();
          showToast("Complétez les informations client");
        }
      }
    });

    document.addEventListener("input", (event) => {
      const input = event.target.closest("[data-customer-form] input");
      if (!input) return;
      input.classList.remove("is-invalid");
      const error = document.querySelector("[data-form-error]");
      if (error) error.textContent = "";
      updateWhatsappLink(false);
    });
  }

  function initNavbarScroll() {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 12;

    const update = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastY;

      nav.classList.toggle("is-scrolled", currentY > 28);

      if (!nav.classList.contains("open")) {
        if (currentY > 220 && delta > threshold) {
          nav.classList.add("is-hidden");
        } else if (delta < -threshold || currentY < 90) {
          nav.classList.remove("is-hidden");
        }
      }

      lastY = currentY;
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  function reveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .14 });
    nodes.forEach((node) => observer.observe(node));
  }

  function initHeroSlider() {
    const slider = document.querySelector("[data-hero-slider]");
    if (!slider) return;
    const frames = Array.from(slider.querySelectorAll(".hero-frame"));
    if (frames.length < 2) return;
    let active = frames.findIndex((frame) => frame.classList.contains("is-active"));
    if (active < 0) active = 0;

    const showFrame = (next) => {
      frames[active].classList.remove("is-active");
      active = (next + frames.length) % frames.length;
      frames[active].classList.add("is-active");
    };

    let timer = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const schedule = () => {
      if (reducedMotion) return;
      window.clearInterval(timer);
      timer = window.setInterval(() => showFrame(active + 1), 5200);
    };

    slider.querySelector("[data-slider-prev]")?.addEventListener("click", () => {
      showFrame(active - 1);
      schedule();
    });

    slider.querySelector("[data-slider-next]")?.addEventListener("click", () => {
      showFrame(active + 1);
      schedule();
    });

    schedule();
  }

  function initParallax() {
    const blocks = Array.from(document.querySelectorAll("[data-parallax]"));
    const canAnimate = blocks.length &&
      window.matchMedia("(min-width: 961px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !("ontouchstart" in window);
    if (!canAnimate) return;

    let viewport = window.innerHeight || 1;
    let scrollY = window.scrollY;
    let ticking = false;

    const cache = blocks.map((block) => {
      const rect = block.getBoundingClientRect();
      return {
        el: block,
        top: rect.top + scrollY,
        height: rect.height,
      };
    });

    const update = () => {
      scrollY = window.scrollY;
      cache.forEach(({ el, top, height }) => {
        const relTop = top - scrollY;
        if (relTop > viewport || relTop + height < 0) return;
        const progress = (relTop + height / 2 - viewport / 2) / viewport;
        el.style.setProperty("--parallax-y", `${Math.max(-24, Math.min(24, progress * -28))}px`);
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const onResize = () => {
      viewport = window.innerHeight || 1;
      scrollY = window.scrollY;
      cache.forEach((item) => {
        const rect = item.el.getBoundingClientRect();
        item.top = rect.top + scrollY;
        item.height = rect.height;
      });
      requestUpdate();
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
  }

  function initTypewriter() {
    const nodes = Array.from(document.querySelectorAll(".home-page [data-typewrite]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!nodes.length || reducedMotion) return;

    let startDelay = 140;
    nodes.forEach((node) => {
      const text = node.dataset.typewrite || node.textContent || "";
      node.textContent = "";
      node.classList.add("is-typewriting");

      window.setTimeout(() => {
        let index = 0;
        const speed = node.tagName === "H1" ? 24 : 14;
        const write = () => {
          node.textContent = text.slice(0, index);
          index += 1;
          if (index <= text.length) {
            window.setTimeout(write, speed);
          } else {
            node.classList.remove("is-typewriting");
            node.classList.add("is-written");
          }
        };
        write();
      }, startDelay);

      startDelay += Math.min(620, text.length * 14 + 120);
    });
  }

  function renderReviews() {
    const root = document.querySelector("[data-reviews-root]");
    if (!root || !window.KING_AQUA_REVIEWS) return;
    root.innerHTML = window.KING_AQUA_REVIEWS.map((r) => {
      const stars = Array.from({ length: 5 }, (_, i) =>
        `<span class="${i < r.rating ? "" : "empty"}">★</span>`
      ).join("");
      return `
        <article class="review-card reveal">
          <div class="review-stars">${stars}</div>
          <p class="review-text">"${r.text}"</p>
          <div class="review-author">
            <div class="review-avatar">${r.initial}</div>
            <div class="review-meta">
              <strong>${r.author}</strong>
              <span>${r.occasion}</span>
            </div>
          </div>
        </article>`;
    }).join("");
    reveal();
  }

  function hideLoader() {
    document.body.classList.remove("loading");
    document.querySelector(".loader")?.classList.add("is-hidden");
  }

  window.addEventListener("load", hideLoader);
  window.setTimeout(hideLoader, 900);

  document.addEventListener("DOMContentLoaded", () => {
    hideLoader();
    bindEvents();
    renderMenu();
    renderPopular();
    renderReviews();
    renderOrder();
    updateCartCount();
    reveal();
    initTypewriter();
    initHeroSlider();
    initNavbarScroll();
    initParallax();
  });
})();
