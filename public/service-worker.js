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
             return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
             }));
            }).then(() =>  self.clients.claim())
              
              
          
        );
      });
   // fetch
   self.addEventListener("fetch", function(e) {
    // cache successful requests to the API
    if (e.request.url.startsWith(self.location.origin)) {
      e.respondWith(
        caches.match(e.request).then(cachedResponse => {
          if (cachedResponse) {
              return cachedResponse;
          }
          return caches.open(DATA_CACHE_NAME).then(cache => {
              return fetch(e.request).then(response => {
                return cache.put(e.request, response.clone()).then(() => {
                    return response;
                
              
                });
            });
        });
    })
      );
};
   });
});
