const CACHE = "king-aqua-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/menu.html",
  "/commande.html",
  "/galerie.html",
  "/contact.html",
  "/css/style.css",
  "/js/app.js",
  "/js/menu-data.js",
  "/images/optimized/logo.webp",
  "/images/optimized/bar-americain.webp",
  "/images/optimized/bellevue-fleuve.webp",
  "/images/optimized/deventure-fleuve.webp",
  "/images/optimized/photo-exterieur.webp",
  "/images/optimized/interieur-lounge.webp",
  "/images/optimized/restau-fleuve.webp",
  "/images/optimized/fond-accueil.webp",
  "/images/optimized/terrasse-lounge.webp",
  "/images/optimized/menu-brochettes.webp",
  "/images/optimized/menu-entrees.webp",
  "/images/optimized/menu-grillades.webp",
  "/images/optimized/menu-pates.webp",
  "/images/optimized/menu-volailles.webp",
  "/images/optimized/menu-entrees-chaudes.webp",
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

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const networkFetch = fetch(e.request, { redirect: "follow" }).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => null);

      return cached || networkFetch;
    })
  );
});