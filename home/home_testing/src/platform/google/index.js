"use strict";

var PLATFROM = "google";

window.addEventListener("load", domReadyHandler);

function domReadyHandler() {
    window.removeEventListener("load", domReadyHandler);
    runGame();
}

function embedGoogleFonts(fonts, cb) {
    if(!fonts) {
        if(cb) cb();
        return;
    }
    
    var observer = [];
    var container = document.getElementsByTagName('head')[0];

    if(!Array.isArray(fonts)) fonts = [fonts];

    for(var i=0; i<fonts.length; i++) {
        var font = fonts[i];

        var s = document.createElement('link');
        s.rel = "stylesheet";
        s.href = font.url;
        container.appendChild(s);

        observer.push(new FontFaceObserver(font.name).load());
    }

    Promise.all(observer).then(cb, function(err) {
        console.warn("Failed to load google font", err);
        if(cb) cb();
    });
}

var gameIsRunned = false;
function runGame() {
    if(gameIsRunned) return;
    gameIsRunned = true;

    /*
    Embed fonts
    Examples:
    
    embedGoogleFonts({url: 'https://fonts.googleapis.com/css?family=Roboto', name: 'Roboto'}, cb);
    
    embedGoogleFonts([
        {url: 'https://fonts.googleapis.com/css?family=Roboto', name: 'Roboto'},
        {url: 'https://fonts.googleapis.com/css?family=Charm:400,700&amp;subset=latin-ext', name: 'Charm'}
    ], cb);
    */
    
    embedGoogleFonts([], function() {
		Game.init();
		initListeners();
		LayoutManager.fitLayout();
	});
}

function initListeners() {
    window.addEventListener("resize", LayoutManager.fitLayout);
    setInterval(LayoutManager.fitLayout, 100);
}

function callSDK(e) { 
    if(e === "download") {
        ExitApi.exit();
    }
}