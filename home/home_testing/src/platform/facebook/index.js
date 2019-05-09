"use strict";

var PLATFROM = "facebook";

window.addEventListener("load", domReadyHandler);

function domReadyHandler() {
    window.removeEventListener("load", domReadyHandler);
    runGame();
}

var gameIsRunned = false;
function runGame() {
    if(gameIsRunned) return;
    gameIsRunned = true;

    Game.init();

    initListeners();
    LayoutManager.fitLayout();
}

function initListeners() {
    window.addEventListener("resize", LayoutManager.fitLayout);
    setInterval(LayoutManager.fitLayout, 100);
}

function callSDK(e) { 
    if(e === "download") {
        FbPlayableAd.onCTAClick();
    }
}