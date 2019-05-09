window.addEventListener("load", domReadyHandler);

function domReadyHandler() {
    window.removeEventListener("load", domReadyHandler);
    runGame();
}

var PLATFROM = "default";

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
    console.log("SDK call", e);

    if(e === "download") {
        var userAgent = navigator.userAgent || navigator.vendor;
        var url = CONFIG.appleUrl;
        if (/android/i.test(userAgent)) {
            url = CONFIG.androidUrl;
        }

        window.open(url, "_blank");
    }
}