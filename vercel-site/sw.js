const CACHE = "king-aqua-v7";
const ASSETS = [
  "/",
  "/index.html",
  "/menu.html",
  "/commande.html",
  "/galerie.html",
  "/contact.html",
  "/css/style.css",
  "/js/app.js",
  "/images/optimized/logo.webp",
  "/images/optimized/bar-americain.webp",
  "/images/optimized/bellevue-fleuve.webp",
  "/images/optimized/deventure-fleuve.webp",
  "/images/optimized/photo-exterieur.webp",
  "/images/optimized/interieur-lounge.webp",
  "/images/optimized/restau-fleuve.webp",
  "/images/optimized/fond-accueil.webp",
  "/images/optimized/terrasse-lounge.webp",
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
      fetch(e.request)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
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
