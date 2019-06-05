function ProgressBar(maxValue) {
   Sprite.call(this);
   
   this.particles = [];
   this.fullStars = [];

   this.barW = 400;
   this.barH = 20;

   this.maxValue = maxValue || 3;
   this.currentValue = 0;
   this.oneStepPX = this.barW / this.maxValue;

   this.create();

   this.scale.set(1.5);

   this.showStar = this.showStar.bind(this); 
}

ProgressBar.prototype = Object.create(Sprite.prototype);

ProgressBar.prototype.create = function() {
   var bg = this.addChild(new Sprite("heroes/bar/bg"));

   this.back = this.addChild(new Sprite("heroes/bar/bar-empty"));
   this.back.y = 7;
   this.back.x = -this.barW/2;
   this.back.anchor.x = 0;
   this.back.height = this.barH;
   this.back.width = this.barW;

   this.frontMask = this.addChild(new PIXI.Graphics())
      .beginFill(0x000000)
      .drawRect(0, 0, 1, 1)
      .endFill();
   this.frontMask.width = 1;
   this.frontMask.height = this.barH;   
   this.frontMask.y = 3;
   this.frontMask.x = -this.barW / 2;

   this.front = this.addChild(new Sprite("heroes/bar/bar-fill"));
   this.front.y = 7;
   this.front.x = -this.barW/2;
   this.front.anchor.x = 0;
   this.front.width = this.barW;
   this.front.height = this.barH;
   this.front.mask = this.frontMask;

   var initX = -this.barW / 2 + this.oneStepPX;
   for (var i = 0; i < this.maxValue; i++) {
      var x = initX + this.oneStepPX * i;
      var y = i + 1 === this.maxValue ? 6 : 3;

      var star = this.addChild(new Sprite("heroes/bar/star-empty"));
      star.x = x;
      star.y = y;

      star = this.addChild(new Sprite("heroes/bar/star-full"));
      star.x = x;
      star.y = y;
      star.visible = false;

      this.fullStars.push(star);
   }
};

ProgressBar.prototype.update = function(val) {
   this.currentValue += val;

   this.frontMask.width = this.currentValue * this.oneStepPX;
   //this.showStar();

   return this.showStar();
};

ProgressBar.prototype.showStar = function() {
   var s = this.fullStars.shift();
   if (!s) return new Promise.resolve();

   var endScale = {x: s.scale.x, y: s.scale.y};
   s.scale.set(3);

   var tw = new Tween(s, { scale: endScale }, 300, {easing: TWEEN.Easing.Back.InOut});
   tw.once("start", function(obj) {
      obj.visible = true;
   });

   return new Promise((function(resolve){
      tw.once("complete", function(obj) {
         this.createBurst({x: obj.x, y: obj.y });
         resolve();
      }, this)
   }).bind(this));
};

ProgressBar.prototype.createBurst = function(position) {
   var brust = this.addChild( new ParticlesSprite.create(['heroes/bar/star-white'], PROGRESS_BAR_STARS_BURST));
   brust.emitter.playOnceAndDestroy((function(){
      this.particles = [];
   }).bind(this));

   brust.position.set(position.x, position.y);
   this.particles.push(brust);

   var explosion = this.addChild( new Sprite.fromPattern("animations/explosion"));
   explosion.tint = 0xffffff;
   explosion.loop = false;
   explosion.gotoAndPlay(0);
   explosion.animationSpeed = 0.15;
   explosion.position.set(position.x, position.y);
   explosion.onComplete = function() {
      
      this.destroy();
   };

};

ProgressBar.prototype.tick = function() {
   for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update(delta);
   }
};