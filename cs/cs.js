(function() {
	console.log("VideoGaze Content Script (cs.js) injected into webpage!");

	var videoplayer = document.getElementsByTagName('video')[0];

	/* cs-port connects with background script, which is indirectly connected to popup script */
	var port_cs = chrome.runtime.connect({name: "cs-port"});
	port_cs.onMessage.addListener(function(message) {
		// If background script sends action "room"
		if(message.action == "room") {
			console.log(message.roomcode)
			make_room(message.roomcode, videoplayer, function(roomcode) {
				// When room is made, send code back to background script (which communicates it to the popup).
				console.log(roomcode);
				port_cs.postMessage({code: roomcode});
			});
		}
	});
})();