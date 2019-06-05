"use strict";

var PLATFROM = "vungle";

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

    if(window.__callSDK) window.callSDK = window.__callSDK;

    Game.init(document.getElementById("vungle-ad"));
    Game.on("gameEvent", GameEvents.handleEvent);
    Game.on("gameEvent", (e) => {
        if(e.type === "outro") callSDK("complete");
    });

    try {
        initListeners();
        mraid.expand();
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

var GameEvents = (function(config) {
    var events = [];

    if(config) {
        for(var key in config) {
            var event = Object.assign({}, config[key]);
            event.name = key;
            event.completed = false;
            event.active = !event.activation;
            events.push(event);
        }
    }

    var handleEvent = function(e) {
        for(var i = 0; i < events.length; i++) {
            var event = events[i];

            if(!event.active && e.type === event.activation) {
                event.active = true;
            }

            if(!event.completed && event.active) {
                if(e.type === "tick" && event.time) {
                    event.time -= e.data;
                    if(event.time <= 0) reportEvent(event);
                }

                if(e.type === "interaction" && event.interactions) {
                    event.interactions--;
                    if(event.interactions <= 0) reportEvent(event);
                }
            }
        }
    };

    function reportEvent(event) {
        event.completed = true;

        callSDK(event.name);
        if(event.cta) {
            callSDK("download");
        }
    }

    return {
        handleEvent: handleEvent,
        reportEvent: reportEvent
    };

})(CONFIG.gameEvents);

function callSDK(e) {
    if(e === "close" || e === "download") {
        if(window.SoundsManager) {
            SoundsManager.enabled = false;
            SoundsManager.soundsOff();
        }
    }

    if(e === "download" || e === "complete") {
        parent.postMessage(e, "*");
    }
    console.log('Vungle SDK ' + e);
}
window.__callSDK = callSDK;