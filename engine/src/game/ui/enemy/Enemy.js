function Enemy(options) {
   Sprite.call(this);

   this.lifespan = options.lifespan;
   this.s = options.scale;
   this.pos = options.pos;
   this.tail = null;

   this.createElements();
   this.onResize();
}

Enemy.prototype = Object.create(Sprite.prototype);

Enemy.prototype.createElements = function() {
   this.tail =  this.addChild(new EnemyTail());

   this.ship = this.addChild(new Sprite('ship/ship'));
   this.ship.anchor.set(0.5, 1);
   this.ship.scale.set(2);

  this.ship.tween = new Tween(this.ship, {skew:{x: [-0.05, 0, 0.05, 0], y: [-0.05, 0, 0.05, 0]}, rotation: [0.05, 0, -0.05, 0]}, 6000, {repeat: Infinity});

   this.slugnIdle = this.addChild( new Sprite.fromPattern("enemy/slug-idle"));
   this.slugnIdle.loop = true;
   this.slugnIdle.gotoAndPlay(0);
   this.slugnIdle.animationSpeed = 0.24;
   this.slugnIdle.position.y = this.pos.y;
   this.slugnIdle.anchor.set(0.5, 1);

   this.slugnIdle.scale.set(this.s);

   this.slugnHit = this.addChild( new Sprite.fromPattern("enemy/slug-hit"));
   this.slugnHit.loop = false;
   this.slugnHit.gotoAndStop(0);
   this.slugnHit.animationSpeed = 0.24;
   this.slugnHit.visible = false;
   this.slugnHit.position.y = this.pos.y;
   this.slugnHit.anchor.set(0.5, 1);

   this.slugnHit.scale.set(this.s);

   //this.lifeBar = this.addChild(new EnemyLifeBar());
};

Enemy.prototype.getLifespan = function() {
   return this.lifespan;
};

Enemy.prototype.getSize = function() {
   return {
      width: 512 * 0.8 / 2, 
      height: 512 * 0.8 / 2
   };
};

/*Enemy.prototype.destroy = function() {
   this.visible = false;
   if (this.parent) {
      this.parent.removeChild(this);
   }
   this.emit("destroy_enemy", this);
};*/

Enemy.prototype.hit = function() {
   this.emit("hit_enemy");
   this.hideIdle();
   this.showHit(); 
   return Promise.resolve();
};

Enemy.prototype.destroy = function() {
   this.slugnHit.destroy();
   this.slugnIdle.destroy();
   this.ship.tween.stop();
   this.ship.tween = null;
   this.removeChild(this.ship);
   this.removeChild(this.tail);
};

Enemy.prototype.showHit = function() {
   this.slugnHit.gotoAndPlay(0);
   this.slugnHit.visible = true;

   this.slugnHit.onComplete = (function() {
      this.hideHit();
      this.showIdle();
   }).bind(this);
};

Enemy.prototype.hideHit = function() {
   this.slugnHit.visible = false;
};

Enemy.prototype.hideIdle = function() {
   this.slugnIdle.gotoAndStop(0);
   this.slugnIdle.visible = false;
   this.slugnIdle.loop = false;
};

Enemy.prototype.showIdle = function() {
   this.slugnIdle.gotoAndPlay(0);
   this.slugnIdle.visible = true;
   this.slugnIdle.loop = true;
};

Enemy.prototype.onResize = function() {
   if (this.tail) this.tail.position.y = -80;
};

Enemy.prototype.tick = function(delta) {
   if (this.tail) this.tail.update(delta);
};
