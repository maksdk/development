"use strict";

var Game = {};

Game.projectType = '2d';
//Контейнер для канваса
Game.container = null;

//Размер игры (базовый)
Game.size = {w: 960, h: 960};
//PIXI app
Game.app = null;
//Текущее окно
Game.currentWindow = null;
// THREE renderer
Game.renderer3d = null;
//Счетчики fps
Game.fps = 0;
Game.fpsDelay = 0;
//Объекты для хранения готовых моделей и текстур
Game.textures = {};
Game.models = {};
//RunTime peditor
Game.runTime = null;

Game.observer = null;

Game.vungleStyles = {};

//Инициализация игры
Game.init = function(container) {
    Game.container = container || document.body;

    if(Game.projectType === '3d') {
        //Создание THREE рендерера и задание ему параметров
        var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        Game.container.appendChild(renderer.domElement);

        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.left = "0";
        renderer.domElement.style.top = "0";

        Game.renderer3d = renderer;
    }
    //Создание PIXI рендерера и задание ему параметров
    var app = new PIXI.Application(Game.size.w, Game.size.h, {transparent: true, backgroundColor: 0x000000});
    Game.container.appendChild(app.view);

    


    app.view.addEventListener("mousedown", function() {
        Game.emit("interaction")
    }, false);
    
    app.view.addEventListener("touchstart", function() {
        Game.emit("interaction")
    }, false);

    app.view.style.position = "absolute";
    app.view.style.left = "0";
    app.view.style.top = "0";

    Game.app = app;

    Game.observer = new PIXI.utils.EventEmitter();

    //Добавление Game.tick в общий PIXI тикер
    app.ticker.add(Game.tick);

    //счетчик FPS
    Game.addFPSView();

    if(window.SoundsManager) {
        SoundsManager.init();
    }

    if(window.I18 && CONFIG.I18) {
        var params = Game.parseGet();
        var locale = params["locale"] || CONFIG.I18.locale;

        I18.init(locale, CONFIG.I18.strings);
    }
    
    if(window.SCENES_CONFIG) {
        this.runTime = new RunTime(SCENES_CONFIG);
    }

    if(!CONFIG.androidUrl) console.warn("FILL CONFIG.androidUrl PROPERTY!!!");
    if(!CONFIG.appleUrl) console.warn("FILL CONFIG.appleUrl PROPERTY!!!");


    if (CONFIG.idsForVungleStyles && CONFIG.idsForVungleStyles.length > 0) {
        Game.setVungleStyles();
    }

    Game.preloader = new AssetsPreloader(ASSETS);
    Game.preloader.preload(Game.start);
};

Game.parseGet = function() {
    var get = {};

    var s = window.location.toString();
    var p = window.location.toString().indexOf("?");
    var tmp, params;
    if(p >= 0) {
        s = s.substr(p + 1, s.length);
        params = s.split("&");
        for(var i = 0; i < params.length; i++) {
            tmp = params[i].split("=");
            get[tmp[0]] = tmp[1];
        }
    }

    return get;
};

Game.getImage = function(name) {
    for(var i = 0; i < ASSETS.images.length; i++) {
        if(ASSETS.images[i].name === name) return ASSETS.images[i].url;
    }
    return null;
};

//Добавление нового окна и удаление предыдущего
Game.showWindow = function(w) {
    if(Game.currentWindow) {
        if(Game.currentWindow.onHide) {
            var ow = Game.currentWindow;
            ow.onHide(function() {
                if(ow.onRemove) ow.onRemove();
                Game.app.stage.removeChild(ow);
            });
        }
        else {
            if(Game.currentWindow.onRemove) Game.currentWindow.onRemove();
            Game.app.stage.removeChild(Game.currentWindow);
        }
    }
    Game.app.stage.addChildAt(w, 0);
    Game.currentWindow = w;
    if(Game.currentWindow.onShow) Game.currentWindow.onShow();
    if(Game.currentWindow.onResize) Game.currentWindow.onResize();
    w.position.set(Game.app.renderer.width / 2, Game.app.renderer.height / 2);
};

//Хендлер изменения размера браузера
Game.onResize = function() {
    if(Game.projectType === '3d') {
        var w = Math.min(LayoutManager.gameWidth, LayoutManager.width);
        var h = Math.min(LayoutManager.gameHeight, LayoutManager.height);

        Game.renderer3d.setSize(w, h);
        Game.renderer3d.domElement.style.width = LayoutManager.width + "px";
        Game.renderer3d.domElement.style.height = LayoutManager.height + "px";
    }

    if(Game.currentWindow) {
        Game.currentWindow.position.set(Game.app.renderer.width / 2, Game.app.renderer.height / 2);
        if(Game.currentWindow.onResize) Game.currentWindow.onResize();
    }

    
};

//Основная точка входа когда все ресурсы уже загружены
Game.start = function() {
    if(Game.projectType === '3d') {
        Game.showWindow(new MainWindow());
    }
    else {
        Game.showWindow(new Main());
    }

    Game.emit("preloadComplete");
};

//Хелпер на получение системного шрифта (для красивых системных текстов)
Game.getSystemFont = function() {
    return '-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif';
};

//Добавление вьюшки для счетчика fps
Game.addFPSView = function() {
    Game.fpsView = Game.app.stage.addChild(new PIXI.Text("FPS: 0", {
        fontFamily: Game.getSystemFont(),
        fill: "#000000",
        fontSize: 52,
        lineJoin: "round",
        miterLimit: 10,
        stroke: "#ffffff",
        strokeThickness: 5
    }));
    Game.fpsView.x = 12;
    Game.fpsView.y = 6;
    Game.fpsView.visible = !!CONFIG.application.showFPS;
};

//Обновление fps
Game.updateFPS = function(delta) {
    Game.fps++;
    Game.fpsDelay += delta;

    if(Game.fpsDelay >= 1000) {
        while(Game.fpsDelay > 1000) Game.fpsDelay -= 1000;
        Game.lastFPS = Game.fps;
        Game.fps = 0;
        Game.fpsView.text = "FPS: " + Game.lastFPS;
    }
};

//Получение модели по имени из кеша
Game.getObject = function(name) {
    var model = Game.preloader.models[name];
    if(!model) {
        throw Error("no model: " + name);
    }

    var clone = model.clone();
    if(model.animations) {
        clone.animations = [];
        for(var q = 0; q < model.animations.length; q++) {
            var json = THREE.AnimationClip.toJSON(model.animations[q]);
            var anim = THREE.AnimationClip.parse(json);
            clone.animations.push(anim);
        }
    }
    return clone;
};

Game.setVungleStyles = function() {
    var ids = CONFIG.idsForVungleStyles;

    for (var i = 0; i < ids.length; i++) {
        var elem = document.getElementById(ids[i]);
        if (!elem) continue;
        
        Game.vungleStyles[ids[i]] = getOffsetRect(elem);
    }
    
    function getOffsetRect(elem) {
        var box = elem.getBoundingClientRect();
        
        var styles = window.getComputedStyle(elem, null);
        console.log("box", box);
        console.log("transform matrix", styles.transform);
        console.log("width",            styles.width);
        console.log("height",           styles.height);
        console.log("top",              styles.top);
        console.log("left",             styles.left);


       console.log( styles.transform.match(/^matrix\((.+)\)$/));
       console.log(styles.transform.split('(')[1].split(')')[0].split(','))
        
        // var body = document.body;
        // var docElem = document.documentElement;
        
        // var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        // var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        
        // var clientTop = docElem.clientTop || body.clientTop || 0;
        // var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        
        // var top  = box.top +  scrollTop - clientTop;
        // var left = box.left + scrollLeft - clientLeft;
        
        // return { x: Math.round(left), y: Math.round(top),  width: box.width, height: box.height };
    }
};

//Хелперы для прямого обращения к обсерверу
Game.emit = function(event, a1, a2, a3, a4) {
    Game.observer.emit(event, a1, a2, a3, a4);
    Game.observer.emit("gameEvent", {type: event, data: a1});
};

Game.on = function(event, fn, context) {
    Game.observer.on(event, fn, context);
};

Game.once = function(event, fn, context) {
    Game.observer.once(event, fn, context);
};

Game.off = function(event, fn, context) {
    Game.observer.off(event, fn, context);
};

//Основной тик - протикиваем твины, спайновы, партикловые спрайты, текущее окно и т.д.
Game.tick = function() {
    var delta = PIXI.ticker.shared.elapsedMS;

    Game.updateFPS(delta);

    if(window.TWEEN) TWEEN.update();
    if(window.Tween) Tween.update(delta);
    if(window.Timer) Timer.update(delta);
    if(window.SpineSprite) SpineSprite.update(delta);
    if(window.ParticlesSprite) ParticlesSprite.update(delta);
    if(window.MovieClip3D) MovieClip3D.update(delta);

    if(Game.currentWindow && Game.currentWindow.tick) {
        Game.currentWindow.tick(delta);
    }

    Game.emit("tick", delta);
};
