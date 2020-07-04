importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
console.log(`Workbox berhasil dimuat`);
else
console.log(`Workbox gagal dimuat`);

workbox.skipWaiting();
workbox.clientsClaim();
workbox.core.setCacheNameDetails({
  prefix: 'cache-pwa-football',
  precache: 'precache',
  runtime: 'runtime',
});
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-football-data.org',
      cacheExpiration: {
          maxAgeSeconds: 60 * 7 //7hr
      }
  })
);
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/fav.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/page/home.html', revision: '1' },
  { url: '/page/Favorit.html', revision: '1' }
], {
  ignoreUrlParametersMatching: [/.*/]
});
workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css'
  })
);
workbox.routing.registerRoute(
  new RegExp('/img/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'img'
  })
);
workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js'
  })
);
workbox.routing.registerRoute(
  new RegExp('/page/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'page'
  })
);
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 14, // 14 hari
      }),
    ],
  }),
);
//----PUSH-----
self.addEventListener('push', function(event) {
  var body;
  if(event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/72.webp',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1 
    }
  };
  event.waitUntil(
    self.registration.showNotification('The News Football', options)
  );
})