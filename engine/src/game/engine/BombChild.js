"use strict";

function BombChild(tex, width, height) {
   Token.call(this, tex, width, height);

   this.type = BombChild.type;
   this.bonusID = BombChild.bonusID;
}

BombChild.prototype = Object.create(Token.prototype);

BombChild.type = 'BOMB_CHILD';
BombChild.bonusID = 0;
BombChild.gameField = null;

BombChild.init = function(field) {
   BombChild.gameField = field;
};

BombChild.prototype.onDestroy = function() {
   
};

BombChild.prototype.destroyB = function() {
   var self = this;
   var sps = [];
   var id = this.tokenID;

   return new Promise(function (resolve) {
      new Timer(800).once("finish", function () {
         self.texture = PIXI.Texture.EMPTY;

         var smoke1 = self.addChild(new Sprite.fromPattern("smoke/"));
         smoke1.visible = false;
         smoke1.speedAnimation = 0.24;
         smoke1.tint = CONFIG.application.tokens_color[id];
         smoke1.loop = false;
         smoke1.gotoAndStop(0);
         smoke1.onComplete = function () {
            this.destroy();
         };
         new Tween(smoke1, { position: { x: -10 } }, 350, {});
         sps.push(smoke1)

         var smoke2 = self.addChild(new Sprite.fromPattern("smoke/"));
         smoke2.visible = false;
         smoke2.speedAnimation = 0.24;
         smoke2.tint = CONFIG.application.tokens_color[id];
         smoke2.scale.set(-1);
         smoke2.loop = false;
         smoke2.gotoAndStop(0);
         smoke2.onComplete = function () {
            this.destroy();
         };
         new Tween(smoke2, { position: { x: 10 } }, 350, {});
         sps.push(smoke2);



         var burst = self.addChild(new Sprite.fromPattern("animations/explosion"));
         burst.visible = false;
         burst.loop = false;
         burst.animationSpeed = 0.24;
         burst.gotoAndStop(0);
         burst.tint = CONFIG.application.tokens_color[id];
         //burst.position.set(token.calcX(token.tokenX) , token.calcY(token.tokenY));

         burst.onComplete = function () {
            this.destroy();
         };
         sps.push(burst);

         sps.forEach(function (s) {
            s.visible = true;
            s.play()
         });

         resolve();
      });
   });
};


