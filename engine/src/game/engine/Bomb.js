"use strict";

function Bomb(tex, width, height) {
   Token.call(this, tex, width, height);

   this.type = Bomb.type;
   this.bonusID = Bomb.bonusID;
}

Bomb.prototype = Object.create(Token.prototype);

Bomb.type = 'BOMB';
Bomb.bonusID = 100;
Bomb.gameField = null;

Bomb.init = function(field) {
   Bomb.gameField = field;
};

Bomb.prototype.onDestroy = function() {
   this.apply();
};

Bomb.prototype.destroyB = function(particles) {
   var x = this.calcX(this.tokenX);
   var y = this.calcY(this.tokenY);
   var self = this;

   this.scale.set(1.1);
   this.texture = new PIXI.Texture.fromFrame("items/active/4");
   this.texture.update();

   var tw = new Tween(this, {position:{x: [x, x - 3, x + 3, x, x - 3, x + 3, x], y:[y, y - 5, y + 5, y, y - 5, y + 5, y]}}, 300, {repeat: 1});
   var sps = [];

   return new Promise(function(resolve) {
      tw.once("complete", function(obj) {
         obj.texture = PIXI.Texture.EMPTY;
         new Timer(600).once("finish", function() {
            resolve();
         });
         
         var smoke1 = self.addChild(new Sprite.fromPattern("smoke/"));
         smoke1.visible = false;
         smoke1.speedAnimation = 0.24;
         //smoke1.position.set(x, y);
         smoke1.tint = 0xffbd28;
         smoke1.loop = false;
         smoke1.gotoAndStop(0);
         smoke1.onComplete = function() {
            this.destroy(); 
         };
         new Tween(smoke1, {position: {x: -10}}, 350, {}); 
         sps.push(smoke1)

         var smoke2 = self.addChild(new Sprite.fromPattern("smoke/"));
         smoke2.visible = false;
         smoke2.speedAnimation = 0.24;
         //smoke2.position.set(x, y);
         smoke2.tint = 0xffbd28;
         smoke2.scale.set(-1);
         smoke2.loop = false;
         smoke2.gotoAndStop(0);
         smoke2.onComplete = function() {
            this.destroy(); 
         };
         new Tween(smoke2, {position: {x: 10}}, 350, {}); 
         sps.push(smoke2)

         var ex1 = self.addChild(new Sprite.fromPattern("bomb-explosion/"));
         ex1.visible = false;
         ex1.position.x = 80;
         ex1.loop = false;
         ex1.gotoAndStop(0);
         ex1.onComplete = function() {
            this.destroy(); 
         };
         sps.push(ex1)

         var ex2 = self.addChild(new Sprite.fromPattern("bomb-explosion/"));
         ex2.visible = false;
         ex2.position.x = -80;
         ex2.scale.set(-1);
         ex2.loop = false;
         ex2.gotoAndStop(0);
         ex2.onComplete = function() {
            this.destroy(); 
         };
         sps.push(ex2)

         sps.forEach(function(s) {
            s.visible = true;
            s.play()  
         })

         var pies = self.addChild(new ParticlesSprite.create(["boosters/bomb/pies1", "boosters/bomb/pies2"], BOMB_BURST));
         pies.emitter.playOnceAndDestroy(function() {
            //resolve();  
         });
         particles.push(pies);

         Bomb.gameField.emit("bomb_explosion");
      }) 
   });

};

Bomb.prototype.isBomb = function() {
   return true;
};

Bomb.prototype.isCanDestroy = function() {
   return !Bomb.gameField.getToken(this.tokenX, this.tokenY + 1) && !this.inDestroy;   
};

Bomb.prototype.apply = function() {
   var matrix = [
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 1, y: -1},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 0, y: 1},
      {x: -1, y: 1},
      {x: -1, y: 0}
   ];

   for(var i = 0; i < matrix.length; i++) {
      var t = Bomb.gameField.getToken(this.tokenX + matrix[i].x, this.tokenY + matrix[i].y);
      if (t && !t.inDestroy) {
         var newToken = t;
         
         if ((!t.bonusID || t.bonusID < 0) && !t.bird) {
            newToken = new BombChild("items/simple/" + t.tokenID, Bomb.gameField.spriteWidth, Bomb.gameField.spriteHeight);
            Bomb.gameField.putToken(t.tokenX, t.tokenY, newToken);
         }

         Bomb.gameField.destroyTokenTest(newToken);
      }
   }
};

Bomb.prototype.getDestroyTokens = function() {
   var matrix = [
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 1, y: -1},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 0, y: 1},
      {x: -1, y: 1},
      {x: -1, y: 0}
   ];
   var dt = [];

   for(var i = 0; i < matrix.length; i++) {
      var t = Bomb.gameField.getToken(this.tokenX + matrix[i].x, this.tokenY + matrix[i].y);
      if (t && !t.inDestroy) dt.push(t);
   }
   return dt;
};
