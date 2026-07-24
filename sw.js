/* sw.js — service worker per PWA offline (app shell + dati).
   Bump CACHE ad ogni release per invalidare la cache. */
const CACHE = "fisiologia-v11";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/vendor/three.min.js",
  "./assets/js/data.js",
  "./assets/js/punti_data.js",
  "./assets/js/app.js",
  "./assets/js/punti.js",
  "./assets/favicon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: risponde dalla cache e aggiorna in background.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
