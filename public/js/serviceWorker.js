const assets = [
 "/",
 "css/style.css",
 "js/app.js",
 "/images/logo.png",
 "/images/blog2.jpg",
 "/images/favicon.jpg",

 // Template icons (can remove)
 "/icons/icon-96x96.png",
 "/icons/icon-128x128.png",
 "/icons/icon-192x192.png",
 "/icons/icon-384x384.png",
 "/icons/icon-512x512.png",

 // Game images
 "/icons/Apex Legends.png",
 "/icons/Battlefield 1.png",
 "/icons/Battlefield 3.png",
 "/icons/Battlefield 4.png",
 "/icons/Battlefield 5.png",
 "/icons/Battlefield 6.png",
 "/icons/Battlefield 2042.png",
 "/icons/Battlefield 2142.png",
 "/icons/Dead Space Remake.png",
 "/icons/Dead Space.png",
 "/icons/Dragon Age Inquisition.png",
 "/icons/FIFA 23.png",
 "/icons/Madden NFL 23.png",
 "/icons/Madden NFL 24.png",
 "/icons/Mass Effect 2.png",
 "/icons/Mass Effect 3.png",
 "/icons/Mass Effect.png",
 "/icons/NBA Live Mobile.png",
 "/icons/Need for Speed Heat.png",
 "/icons/Need for Speed Unbound.png",
 "/icons/PvZ Battle for Neighborville.png",
 "/icons/PvZ Garden Warfare 2.png",
 "/icons/Star Wars Battlefront II.png",
 "/icons/Star Wars Battlefront.png",
 "/icons/Star Wars Jedi Fallen Order.png",
 "/icons/Star Wars Jedi Survivor.png",
 "/icons/Star Wars The Old Republic.png",
 "/icons/The Sims 3.png",
 "/icons/The Sims 4.png",
 "/icons/Titanfall 2.png",
 "/icons/Titanfall.png",
];

const CATALOGUE_ASSETS = "catalogue-assets";

self.addEventListener("install", (installEvt) => {
 installEvt.waitUntil(
  caches
   .open(CATALOGUE_ASSETS)
   .then((cache) => {
    console.log(cache);
    cache.addAll(assets);
   })
   .then(self.skipWaiting())
   .catch((e) => {
    console.log(e);
   })
 );
});

self.addEventListener("activate", function (evt) {
 evt.waitUntil(
  caches
   .keys()
   .then((keyList) => {
    return Promise.all(
     keyList.map((key) => {
      if (key === CATALOGUE_ASSETS) {
       console.log("Removed old cache from", key);
       return caches.delete(key);
      }
     })
    );
   })
   .then(() => self.clients.claim())
 );
});

self.addEventListener("fetch", function (evt) {
 evt.respondWith(
  fetch(evt.request).catch(() => {
   return caches.open(CATALOGUE_ASSETS).then((cache) => {
    return cache.match(evt.request);
   });
  })
 );
});
