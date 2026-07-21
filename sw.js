/* Kaikudata service worker – offline cache for app shell + map tiles.
   HTML/data use network-first so deploys show up; tiles use cache-first. */
const APP_CACHE = "kaikudata-app-v15";
const TILE_CACHE = "kaikudata-tiles-v1";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./sample/Archive_19_07_2026B_fixed.gpx",
  "./sample/A.gpx",
  "./sample/E.gpx",
  "./sample/TracksO.gpx",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(APP_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== APP_CACHE && k !== TILE_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = req.url;

  // Map tiles: cache-first (they never change), bounded in their own cache
  if (url.includes("avoin-karttakuva.maanmittauslaitos.fi")) {
    e.respondWith(
      caches.open(TILE_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok) cache.put(req, res.clone());
          return res;
        } catch (err) {
          return hit || Response.error();
        }
      })
    );
    return;
  }

  // Versioned CDN assets: cache-first is safe
  if (url.includes("unpkg.com")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const c = res.clone(); caches.open(APP_CACHE).then(k => k.put(req, c)); }
      return res;
    })));
    return;
  }

  // Everything else (our HTML/JS/GPX): network-first, fall back to cache offline
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok && url.startsWith(self.location.origin)) {
        const clone = res.clone();
        caches.open(APP_CACHE).then(c => c.put(req, clone));
      }
      return res;
    }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
  );
});
