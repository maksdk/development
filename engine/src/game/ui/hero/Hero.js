function Hero(options) {
   Sprite.call(this);

   this.bitmap = options.bitmap;
   this.id = options.id;
   this.hero = null;

   this.createElements();
}

Hero.prototype = Object.create(Sprite.prototype);

Hero.prototype.createElements = function () {
   this.hero = this.addChild(new Sprite.fromPattern(this.bitmap));
   this.hero.loop = true;
   this.hero.gotoAndPlay(0);
   this.hero.animationSpeed = 0.15;

   this.hero.anchor.set(0.5, 1);
};

Hero.prototype.hitEnemy = function (target, from) {
   var ss = { x: this.scale.x, y: this.scale.y };
   var sp = { x: target.x, y: target.y };

   var tw1 = new Tween(this, { position: { y: sp.y - 20 } }, 150);
   var tw2 = new Tween(this, { scale: { x: [ss.x * 0.8, ss.x * 1, ss.x * 1.2, ss.x * 1], y: [ss.y * 0.8, ss.y * 1, ss.y * 1.2, ss.y * 1] } }, 300, { autoStart: false });
   var tw3 = new Tween(this, { position: { y: sp.y } }, 150, { autoStart: false });

   tw1.chain(tw2);
   tw2.chain(tw3);

   var self = this;
   return new Promise(function (resolve) {
      tw1.once('complete', function () {
         self.emit("hit_enemy", {id: self.id});
         resolve(from);
      });
   });
};

// Hero.prototype.setAnchor = function(x, y) {
//    this.hero.anchor.set(x, y);
// };

Hero.prototype.destroy = function () {
   this.hero.destroy();
};

Hero.prototype.getSize = function () {
   if (!this.hero) return;

   return { width: this.hero.width / 3, height: this.hero.height / 3 };
};

Hero.prototype.getPos = function () {
   return { x: this.x, y: this.y };
};