"use strict";

var PLATFROM = "liftoff";

window.addEventListener("load", domReadyHandler);

var ROOT_URL = "";
var CLICK_URL = "";

function domReadyHandler() {
    window.removeEventListener("load", domReadyHandler);

    if (typeof LIFTOFF_ROOT_URL !== "undefined") {
        ROOT_URL = LIFTOFF_ROOT_URL;
    }

    if (typeof LIFTOFF_CLICK_URL !== "undefined") {
        CLICK_URL = LIFTOFF_CLICK_URL;
    }

    Preloader.show();
    loadStatic();
}

var currentLoadStaticFile = -1;

function loadStatic() {
    currentLoadStaticFile++;

    if(currentLoadStaticFile >= STATIC_FILES.length) {
        runGame();
        return;
    }

    var name = STATIC_FILES[currentLoadStaticFile];
    var parts = name.split('.');

    switch (parts[1]) {
        case 'js':
            loadScript(name, loadStatic);
            break;
        default:
            loadStatic();
    }
}

function loadScript(name, cb) {
    var script = document.createElement("script");
    script.src = ROOT_URL + name;
    document.head.appendChild(script);
    script.onload = cb;
}

var gameIsRunned = false;
function runGame() {
    if(gameIsRunned) return;
    gameIsRunned = true;

    Game.init();
    initListeners();
    LayoutManager.fitLayout();

    Game.once('preloadComplete', Preloader.hide);
}

function initListeners() {
    window.addEventListener("resize", LayoutManager.fitLayout);
    setInterval(LayoutManager.fitLayout, 100);
}

function callSDK(e) {
    if(e === "download") {
        window.open(CLICK_URL, '_blank');
    }
}
