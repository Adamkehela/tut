var BIG='tut-big-v1', PAGE='tut-page-d477da79';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==BIG&&k!==PAGE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url); if(e.request.method!=='GET'||u.origin!==location.origin) return;
  if(/\.bin$/.test(u.pathname)){ e.respondWith(caches.open(BIG).then(function(c){return c.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){if(n.ok)c.put(e.request,n.clone());return n;});});})); return; }
  e.respondWith(fetch(e.request).then(function(n){ if(n.ok){var cp=n.clone(); caches.open(PAGE).then(function(c){c.put(e.request,cp);});} return n; }).catch(function(){return caches.match(e.request);}));
});
