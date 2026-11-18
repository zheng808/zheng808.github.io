/*
 * Kill switch for the service worker registered by the previous Create React App
 * build of this site. The new site does not use a service worker. Visitors who
 * still have the old one installed fetch this file at the same URL; it clears every
 * cache, unregisters itself, and reloads open tabs so they get the live site.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) client.navigate(client.url);
    })(),
  );
});
