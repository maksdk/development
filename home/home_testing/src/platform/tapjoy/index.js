"use strict";

var PLATFROM = "tapjoy";

try {
    if(mraid.getState() === "loading") {
        mraid.addEventListener("ready", mraidReadyHandler);
    }
    else {
        mraidReadyHandler();
    }
}
catch(e) {
    if(e.name === "ReferenceError") {
        // mraid is not defined
        window.addEventListener("load", domReadyHandler);
    }
}

var gameIsRunned = false;

function runGame() {
    if(gameIsRunned) return;
    gameIsRunned = true;
    
    if(window.TJ_API) {
        if(window.TJ_API.adInfo) {
            CONFIG.application.reward = window.TJ_API.adInfo.reward;
            CONFIG.application.currencyName = window.TJ_API.adInfo.currencyName;
        }

        if(window.TJ_API.directives) {
            CONFIG.application.skipOutro = !window.TJ_API.directives.showEndCard;
        }

        window.TJ_API.setPlayableAPI({
            skipAd: function() {
                console.log("skipAd event received");
                Game.emit("showOutro");
            }
        });
    }

    Game.init();

    Game.once("objectiveComplete", function() {
        console.log("objectiveComplete event fired");
        if(window.TJ_API) window.TJ_API.objectiveComplete();
    });

    Game.once("gameplayFinished", function() {
        console.log("gameplayFinished event fired");
        if(window.TJ_API) window.TJ_API.gameplayFinished();
    });

    try {
        initListeners();
    }
    catch(e) {
    }
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
    if(mraid.isViewable()) {
        console.log("MRAID not viewable");
        return mraidViewableHandler(true);
    }
    mraid.addEventListener("viewableChange", mraidViewableHandler);
}

function mraidViewableHandler(flag) {
    if(flag) {
        console.log("MRAID viewable", window.location.href);
        mraid.removeEventListener("viewableChange", mraidViewableHandler);
        runGame();
    }
}

function initListeners() {
    window.addEventListener("resize", LayoutManager.fitLayout);
    setInterval(LayoutManager.fitLayout, 100);

    mraid.addEventListener("stateChange", function(state) {
        if(state === "expanded") {
            runGame();
            LayoutManager.fitLayout();
        }
    });
    mraid.addEventListener("sizeChange", function() {
        console.log("MRAID sizeChange", arguments);
        LayoutManager.fitLayout();
    });
    mraid.addEventListener("viewableChange", function() {
        console.log("MRAID viewableChange", arguments);
        LayoutManager.fitLayout();
    });
    mraid.addEventListener("error", function() {
        console.log("MRAID error", arguments);
    });
}

function callSDK(e) {
    if(e === "download") {
        if(window.TJ_API && window.TJ_API.click) {
            window.TJ_API.click();
        }
    }
}