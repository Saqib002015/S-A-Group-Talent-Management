
const static_cache = "static_v1";
let regex = /jpg|png|fontawesome|w3schools|styles|basic|googleapis|manifest|woff/;

self.addEventListener('install', event => {
	self.skipWaiting()
	event.waitUntil(
		caches.open( static_cache ).then( cache => 
				cache.addAll([
					'/',
					'/basic.js',
					'/styles.css',
					'404.html'
				])
			)
	);
});
self.addEventListener('activate', event => {
	console.log('activate event');
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if ( key !== static_cache ) {
					return caches.delete(key);
				}
			})
		)).then(() => {
			console.log('New version is now ready to handle fetches!');
		})
	);
});

self.addEventListener("fetch", e => {
	e.respondWith(
		caches.open( static_cache ).then( c => {
			if (regex.test(e.request.url)) {
				return getFromCache( c, e.request );
			} else {
				return getFromNetwork( c, e.request );
			}
		})
	);
});

function getFromCache( c, request ) {
	return c.match( request ).then( response => {
		return response || fetch(request).then(function(response) {
			c.put(request, response.clone());
			return response;
		});
	});
}

function getFromNetwork( c, request ) {
	return fetch( request ).then( response => {
		if ( response.status == 404 ) {
			console.log( "getFromNetwork 404" );
			return c.match( "404.html" );
		}
		c.put( request, response.clone() );
		return response;
	}).catch( err => {
		console.log( "getFromNetwork error", err );
		return c.match( request ).then( r => {
			console.log( "getFromNetwork error 404", err );
			if ( r ) {
				console.log( "getFromNetwork error 404 response is empty", err );
			}
			return r || c.match("404.html");
		});
	});
}