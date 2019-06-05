"use strict";

function Message() {
   Sprite.call(this);

   this.smokeBack = null;
   this.smokeLeft = null;
   this.smokeRight = null;
   this.msg = null;

   this.createElements();
}

Message.prototype = Object.create(Sprite.prototype);

Message.prototype.createElements = function() {
   this.smokeBack = this.addChild(new Sprite("elements/particle"));
   this.smokeBack.visible = false;

   var explosion = this.addChild(new Sprite.fromPattern("animations/explosion/"));
   explosion.loop = false;
   explosion.animationSpeed = 0.24;
   explosion.gotoAndStop(0);
   explosion.visible = false;
   explosion.onComplete = function() {
      this.visible = false; 
   };
   this.explosion = explosion;

   var smoke = this.addChild(new Sprite.fromPattern("smoke/"));
   smoke.loop = false;
   smoke.animationSpeed = 0.24;
   smoke.gotoAndStop(0);
   smoke.visible = false;
   smoke.position.set(0)
   this.smokeLeft = smoke;

   smoke = this.addChild(new Sprite.fromPattern("smoke/"));
   smoke.loop = false;
   smoke.animationSpeed = 0.24;
   smoke.scale.set(-1);
   smoke.gotoAndStop(0);
   smoke.visible = false;
   smoke.position.set(0)
   this.smokeRight = smoke;

   this.msg = this.addChild(new PIXI.Text(CONFIG.TEXTS.MESSAGES[0].text, CONFIG.TEXTS.MESSAGES[0].style));
   this.msg.anchor.set(0.5);
   this.msg.visible = false;
};

Message.prototype.show = function(text, tint) {
   if (!tint) tint = 0xFFFFFF;

   //var text = CONFIG.TEXTS.MESSAGES[0].text;
   //var styles = CONFIG.TEXTS.MESSAGES[0].styles;

   this.showSmokeBack(600, tint);
   this.showSideSmokes(500, tint);
   this.showMessage(650, text, tint);
   this.showExplosion(750, tint);

   return Promise.resolve();
};

Message.prototype.destroy = function() {
   this.visible = false; 
};

Message.prototype.showMessage = function(delay, msg) {
   this.msg.scale.set(0, 1);
   
   this.msg.text = msg.text;
   this.msg.style = msg.style;

   var tw1 = new Tween(this.msg, {scale: {x: 1, y: 1}}, 400, {delay: delay, easing: TWEEN.Easing.Bounce.Out})
      .once("start", function(obj) {
         obj.visible = true;
      }, this);

   var tw2 = new Tween(this.msg, {scale: {x: [1, 0.8, 1,  0.8, 1], y: [1, 0.8, 1,  0.8, 1]}}, 500, {autoStart: false})
      .once("complete", function(obj) {
         this.hideMessage();
      }, this);

   tw1.chain(tw2);
};

Message.prototype.hideMessage = function() {
   var tw = new Tween(this.msg, {scale: {x: this.msg.scale.x, y: 0}}, 400, {delay: 350, easing: TWEEN.Easing.Bounce.In})
      .once("complete", function(obj) {
         obj.visible = false;
         obj.scale.set(1);
      }, this);
};

Message.prototype.showExplosion = function(delay, tint) {
   new Timer(delay).once('finish', function() {
      this.explosion.tint = tint || 0xFFFFFF;
      this.explosion.visible = true;

      this.explosion.gotoAndStop(0);
      this.explosion.play();
   }, this);
};

Message.prototype.showSmokeBack = function(dur, tint) {
   var land = LayoutManager.orientation === LayoutManager.LANDSCAPE;
   var w = land ? LayoutManager.gameWidth * 0.4 : LayoutManager.gameWidth * 0.95;

   var starW = this.smokeBack.width;
   var starH = this.smokeBack.height;

   var tw1 = new Tween(this.smokeBack, {width: w, height: [170, 0]}, dur, {})
      .once("start", function(obj) {
         obj.tint = tint || 0xFFFFFF;
         obj.visible = true;
      }, this)
      .once("complete", function(obj) {
         obj.visible = false;
         obj.width = starW;
         obj.height = starH;
      }, this); 
};

Message.prototype.showSideSmokes = function(delay, tint) {
   this.smokeRight.position.set(0);
   this.smokeLeft.position.set(0);

   var tw = new Tween(this.smokeRight, {position: {x: 200}}, 400, {delay: delay});
   tw.once("start", function(obj) {
      obj.tint = tint || 0xFFFFFF;
      obj.visible = true;  
      obj.gotoAndStop(0);
      obj.play();
   });

   tw.once("complete", function(obj) {
      obj.visible = false;
      obj.position.set(0);  
      obj.stop();
      obj.gotoAndStop(0);
   });


   tw = new Tween(this.smokeLeft, {position: {x: -200}}, 500, {delay: delay}); 
   tw.once("start", function(obj) {
      obj.tint = tint || 0xFFFFFF;
      obj.visible = true;  
      obj.gotoAndStop(0);
      obj.play();
   });
   tw.once("complete", function(obj) {
      obj.visible = false;
      obj.position.set(0);  
      obj.stop();
      obj.gotoAndStop(0);
   });
};

Message.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   if (land) {

   }
   else {
      
   }
};

Message.prototype.tick = function(delta) {

};