"use strict";

var PLATFROM = "adcolony";

try {
    if (mraid.getState() === "loading") {
        mraid.addEventListener("ready", mraidReadyHandler);
    }
    else {
        mraidReadyHandler();
    }
}
catch (e) {
    if (e.name === "ReferenceError") {
        // mraid is not defined
        window.addEventListener("load", domReadyHandler);
    }
}

var gameIsRunned = false;
function runGame() {
    if(gameIsRunned) return;
    gameIsRunned = true;

    Game.init();

    try {
        initListeners();
        mraid.expand();
    }
    catch (e) {}
    finally {
        LayoutManager.fitLayout();
    }
}

function domReadyHandler() {
    window.removeEventListener("load", domReadyHandler);
    runGame();
}

function mraidReadyHandler() {
    mraid.removeEventListener("ready", mraidReadyHandler);
    console.log("MRAID ready", window.location.href);
    if (mraid.isViewable()) {
        console.log("MRAID not viewable");
        return mraidViewableHandler(true);
    }
    mraid.addEventListener("viewableChange", mraidViewableHandler);
}

function mraidViewableHandler(flag) {
    if (flag) {
        console.log("MRAID viewable", window.location.href);
        mraid.removeEventListener("viewableChange", mraidViewableHandler);
        runGame();
    }
}

function initListeners() {
    window.addEventListener("resize", LayoutManager.fitLayout);
    setInterval(LayoutManager.fitLayout, 100);
    
    mraid.addEventListener("stateChange", function (state) {
        if (state === "expanded") {
            runGame();
            LayoutManager.fitLayout();
        }
    });
    mraid.addEventListener("sizeChange", function () {
        console.log("MRAID sizeChange", arguments);
        LayoutManager.fitLayout();
    });
    mraid.addEventListener("viewableChange", function () {
        console.log("MRAID viewableChange", arguments);
        LayoutManager.fitLayout();
    });
    mraid.addEventListener("error", function () {
        console.log("MRAID error", arguments);
    });
}

function callSDK(e) {
    if(e === "download") {
        var userAgent = navigator.userAgent || navigator.vendor;
        var url = CONFIG.appleUrl;
        if (/android/i.test(userAgent)) {
            url = CONFIG.androidUrl;
        }

        mraid.openStore(url);
    }
}
