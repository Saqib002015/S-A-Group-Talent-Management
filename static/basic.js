if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js")
		.then(function (registration) {
			console.log("Service Worker registered with scope:", registration.scope);
		}).catch(function (err) {
			console.log("Service worker registration failed:", err);
		});
}
let form = $("#mailinglist");
form.on( "keyup", ( e ) => {
	let val = form.find(".w3-input").val()
	validateEmail( val );
});
form.on( "submit", ( e ) => {
	e.preventDefault();
	let val = form.find(".w3-input").val()
	console.log( form.attr( "action" )+"?"+form.serialize() )
	if( validateEmail( val ) ) {
		window.open( form.attr( "action" )+"?"+form.serialize() )
	}
	return false;
});
function validateEmail(mail) {
	if( mail.trim().length == 0 ) {
		$("#mailinglisttext").empty();
		return true;
	}
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		$("#mailinglisttext").empty();
		return true;
	} else {
		$("#mailinglisttext").text( "Please enter a valid email id" );
		return false;
	}
}
