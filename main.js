self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('v1').then(function (cache) {  
            return cache.addAll([
                '/index.html',
                '/main.css',
                '/img1.jpg',
                '/img2.jpg',
                '/img3.gif'
            ])
        })
    )
})

self.addEventListener('fetch', function (event) {  
    event.respondWith(caches.match(event.request).then(function(response){
        if(response){
           return response 
        }else{
            return fetch(event.request).then(function (response) {  
                let responseClone = response.clone()

                caches.open('v1').then(function (cache) {  
                    cache.put(event.request, responseClone)
                })

                return response
            })
        }
    }).catch(function () {  
        return caches.match('/img1.jpg')
    }))
})