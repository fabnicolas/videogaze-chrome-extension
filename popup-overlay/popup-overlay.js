var videogaze_overlay_hook = (function() {
  // Custom popup UI
  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute("href", chrome.extension.getURL("popup-overlay/style.css"));
  document.getElementsByTagName("head")[0].appendChild(element);

  var inject = document.createElement("div");

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", chrome.extension.getURL("popup-overlay/popup.html"), false);
  xmlHttp.send(null);
  var parsed = new DOMParser().parseFromString(xmlHttp.responseText, 'text/html');
  var tags = parsed.getElementsByTagName('body');
  inject.innerHTML = '';
  for (var tag of tags) inject.appendChild(tag);
  
  document.body.insertBefore(inject, document.body.firstChild);

  bind_controls();

  document.getElementById("overlay_controls_close").addEventListener('click', function(e) {
    var to_remove = document.getElementById("videogaze_overlay");
    to_remove.parentNode.removeChild(to_remove);
    onclick_overlay_close();
  });
});

videogaze_overlay_hook();