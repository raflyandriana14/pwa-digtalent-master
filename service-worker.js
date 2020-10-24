const CACHE_NAME = "footballpwa";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/team.html",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/ranking.html",
    "/css/footer.css",
    "/css/home.css",
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/css/ranking.css",
    "/images/background.jpg",
    "/images/notif.png",
    "/js/api.js",
    "/js/materialize.min.js",
    "/js/nav.js",
'https://fonts.googleapis.com/icon?family=Matrial+icons'
];

self.addEventListener("Install", function(event){
  event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache){
          return cache,addAll(urlToCache);
      })
  );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response){
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache:", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server:", 
                event.request.url);
                return fetch(event.request);
        })
     );
});

self.addEventListener("active", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                if(cacheName !=CACHE_NAME){
                    console.log("ServiceWorker: cache"+ cacheName + "dihapus");
            return caches.delete(cacheName);
                }
            })
          );
        })
    );
});

self.addEventListener('push', function(event){
    var body;
    if(event.data){
        body =event.data.text();
    }else{
        body = 'Push message no playload';
    }
    var options ={
        body : body,
        icon: '/images/notif.png',
        vibrate: [100, 50, 100],
        data:{
        primaryKey: 1
        }
    };
    event.waitUntil(
        self.ServiceWorkerRegistration.showNotification('Push Notification', options)
    );
});