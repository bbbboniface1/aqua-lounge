const CACHE = "king-aqua-v9-local-fonts";
const ASSETS = [
  "/",
  "/index.html",
  "/menu.html",
  "/commande.html",
  "/galerie.html",
  "/contact.html",
  "/css/fonts.css",
  "/css/style.css",
  "/js/app.js",
  "/js/menu-data.js",
  "/fonts/montserrat-latin.woff2",
  "/fonts/cormorant-garamond-latin.woff2",
  "/images/optimized/logo.webp",
  "/images/optimized/bar-americain.webp",
  "/favicon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const isNavigation =
    e.request.mode === "navigate" ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/";

  if (isNavigation) {
    e.respondWith(
      caches.match(e.request, { ignoreSearch: true }).then((cached) => {
        const fresh = fetch(e.request)
          .then((res) => {
            if (res && res.status === 200) {
              const clone = res.clone();
              caches.open(CACHE).then((cache) => cache.put(e.request, clone));
            }
            return res;
          })
          .catch(() => cached || caches.match("/index.html", { ignoreSearch: true }));
        return cached || fresh;
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
