function EnemiesCont(options) {
   Sprite.call(this);

   this.particles = [];

   this.distanceBetweenElem = 250;

   this.initZ = 8000;
   this.fl = LayoutManager.gameHeight;

   this.defaultData = options;
   this.enemies = [];

   this.createElements();

   this.hitEnemy = this.hitEnemy.bind(this);

   this.lifeBar = this.addChild(new EnemyLifeBar());
}

EnemiesCont.prototype = Object.create(Sprite.prototype);

EnemiesCont.prototype.createElements = function() {
   for (var i = 0; i < this.defaultData.length; i++) {
      
      var enemy = this.addChild(new Enemy({ lifespan: this.defaultData[i].lifespan, scale: this.defaultData[i].scale, pos: this.defaultData[i].pos }));
      enemy.on("hit_enemy", function(e){ this.emit("hit_enemy", e)}, this);
      
      var z =  i === 0 ? 0 : this.initZ;
      var s = this.fl  / (this.fl  + z);

      enemy.z = z;

      if (i > 1) {
         enemy.alpha = 0.50;
      }
      
      enemy.position.x = i % 2 === 0 ? -25 : 25;

      if (i > 0) enemy.scale.set(0.15);
      else enemy.scale.set(enemy.scale.x * s, enemy.scale.y * s);

      this.enemies.push(enemy);
   }

   for (var j = this.enemies.length - 1; j >= 0; j--) {
      this.addChild(this.enemies[j]);
   }
};

EnemiesCont.prototype.hitEnemy = function() {
   //var currEnemy = this.getCurrentEnemy();
   //currEnemy.hit();
   //this.emit("hit_enemy");
   
   var lifeEnemy = this.lifeBar.getCurrentValue(); 
   
   if (lifeEnemy <= 0) {
      this.destroyEnemy();
   }

   this.lifeBar.setFinalDamage();

   return Promise.resolve();
};

EnemiesCont.prototype.getCurrentEnemy = function() {
   return this.enemies[0];
};

EnemiesCont.prototype.getNextEnemy = function() {
   return this.enemies[1];
};

EnemiesCont.prototype.destroyEnemy = function() {
   var enemy = this.enemies.shift();
   enemy.destroy();

   this.explode();

   //this.removeChild(enemy);

   if (this.enemies.length > 0) {
      this.emit("destroy_enemy");
   }
   else {
      this.emit("destroy_all_enemy");
   }
};

EnemiesCont.prototype.destroy = function() {
   this.enemies.forEach(function(en) {
      en.destroy();
   });
   this.removeAllListeners();
   this.visible = false;
   this.enemies = [];
   // if (this.parent) {
   //    this.parent.removeChild(this);
   // }
};


EnemiesCont.prototype.explode = function() {
   var circles = this.addChild(new ParticlesSprite.create(['waves/circle'], ENEMY_CIRCLE_BURST));
   circles.emitter.playOnceAndDestroy();
   circles.position.y = -200;

   var stars = this.addChild(new ParticlesSprite.create(['elements/star'], ENEMY_STARS_BURST));
   stars.emitter.playOnceAndDestroy((function(){
      this.particles = [];
   }).bind(this));
   stars.position.y = -200;

   this.particles.push(circles, stars);
};



EnemiesCont.prototype.move = function() {
   var currEn = this.getCurrentEnemy();
   var nextEn = this.getNextEnemy();
   

   if (currEn) {
      var tw1 = new Tween(currEn, {position: {x: 0, y: 0}, alpha: 1, scale: {x: 1, y: 1}}, 1000);
      tw1.once("complete", function() {
         this.emit("completed_moving");
      }, this)
   }

   if (nextEn) {
      var endX = nextEn.x;
      //nextEn.scale.set(0);
      //nextEn.x = 0;
      var tw = new Tween(nextEn, { position:{x: endX, y: -(Math.abs(this.distanceBetweenElem))} ,  scale: {x: 0.15, y: 0.15}, alpha: 0.8}, 1000);
   }

   if (this.enemies[2]) {
      var tw = new Tween(this.enemies[2], { position:{y: -(Math.abs(this.distanceBetweenElem + 20))},  scale: {x: 0.07, y: 0.07}, alpha: 0.5}, 1000);
   }
};

EnemiesCont.prototype.updatePos = function() {
   var currEn = this.getCurrentEnemy();
   var nextEn = this.getNextEnemy();

   this.enemies.forEach(function(enemy, i) {
      if (i === 0) {
         enemy.position.set(0);
         enemy.scale.set(1);
         enemy.alpha = 1;
      }
      else if (i === 1){
         enemy.position.y = -(Math.abs(this.distanceBetweenElem));
         enemy.scale.set(0.15);
         enemy.alpha = 1;
      }
      else if (i === 2) {
         enemy.position.y = -(Math.abs(this.distanceBetweenElem + 20));
         enemy.scale.set(0.07);
         enemy.alpha = 0.5;
      }
      else {
         enemy.position.y = -(Math.abs(this.distanceBetweenElem + 20));
         enemy.scale.set(0);
         enemy.alpha = 0;
      }
   }, this);

   // if (currEn) {
   //    currEn.position.set(0);
   // }

   // if (nextEn) {
   //    nextEn.position.y = -(Math.abs(this.distanceBetweenElem));

   // }
};

EnemiesCont.prototype.onResize = function(options) {
   if (!this.visible) return;

   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   var ratioScreen = land ? gh/gw  : gw/gh;

   var maxW = options.width;
   var maxH = options.height;
   var distanceBetweenElem = options.distanceBetweenElem;
   
   
   if (!this.enemies[0]) return;

   var contSize = this.enemies[0].getSize();

   var optionsContainer = Utils.fitLayout(maxW, maxH, contSize.width, contSize.height);

   this.scale.set(optionsContainer.scale);
   this.lifeBar.position.set(-90, -350);
   this.distanceBetweenElem = Math.abs(distanceBetweenElem / optionsContainer.scale) - 25;

   this.updatePos(); 
};

EnemiesCont.tick = function(delta) {
   for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update(delat);
   }
};