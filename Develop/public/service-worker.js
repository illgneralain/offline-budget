const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js"
  ];
  
  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";
  
  // install
  self.addEventListener("install", function(e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        (cache.addAll(FILES_TO_CACHE))
        .then(self.skipWaiting())
      }
    ));
  
    
  
  self.addEventListener("activate", function(e) {
      const currentCaches = [CACHE_NAME, DATA_CACHE_NAME];
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return cacheNames.filter(
          cacheNames => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
             return Promise.all(cachesToDelete.map(cachesToDelete => {
                return caches.delete(cachesToDelete);
             }));
            }).then(() =>  self.clients.claim())
              
              
          
        );
      });
   // fetch
   self.addEventListener("fetch", function(e) {
    // cache successful requests to the API
    if (e.request.url.includes("/api/")) {
      e.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(e.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(e.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(e.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    // if the request is not for the API, serve static assets using "offline-first" approach.
    // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
  
  
   

  });
  
  // fetch
  self.addEventListener("fetch", function(e) {
    // cache successful requests to the API
    if (e.request.url.includes("/api/")) {
      e.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(e.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(e.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(e.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    // if the request is not for the API, serve static assets using "offline-first" approach.
    // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
  
  