
const dynamic_v1 = "dynamic_v1";
const static_cache = "static_v1";

self.addEventListener("install", e => {
	console.log( "Installing Service Worker", e );
});
self.addEventListener("activate", e => {
	console.log( "Activating Service Worker", e );
});

self.addEventListener("fetch", e => {
  console.log("Fetch request for:", e.request.url);
});