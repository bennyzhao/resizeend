
/* resizeend.js © 2012 Dominik Porada
 * Distributed under the MIT license: http://porada.mit-license.org
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

;(function(window, document) {
  "use strict";

  var dispatchResizeEndEvent = function() {
    // If the `resizeend` callback is present, invoke it;
    // otherwise, dispatch an actual event (if that’s possible)
    if ( typeof window.onresizeend === "function" ) {
      window.onresizeend();
    }
    else if ( document.createEvent && window.dispatchEvent ) {
      var event = document.createEvent("Event");
      event.initEvent("resizeend", false, false);
      window.dispatchEvent(event);
    }
  };

  // Assuming `window.orientation` is all about degrees
  // (or nothing), the function returns either 0 or 90
  var getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };

  var initialOrientation = getCurrentOrientation();
  var currentOrientation;
  var resizeDebounceTimeout;

  var resizeDebounce = function() {
    currentOrientation = getCurrentOrientation();

    // If `window` is resized due to an orientation change,
    // dispatch `resizeend` immediately; otherwise, slightly delay it
    if ( currentOrientation !== initialOrientation ) {
      dispatchResizeEndEvent();
      initialOrientation = currentOrientation;
    }
    else {
      clearTimeout(resizeDebounceTimeout);
      resizeDebounceTimeout = setTimeout(dispatchResizeEndEvent, 100);
    }
  };

  if ( window.addEventListener ) {
    window.addEventListener("resize", resizeDebounce, false);
  }
  else if ( window.attachEvent ) {
    window.attachEvent("onresize", resizeDebounce);
  }

})(window, document);