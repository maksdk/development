function OutroCardStars() {
   Sprite.call(this);

   this.emptyStars = [];
   this.fullStars = [];

   this.particles = [];

   this.countStarts = 3;

   this.maxRadius = 120;
   this.minRadius = 55;

   this.containerParticles = null;

   this.createElements();
   this.onResize();
}

OutroCardStars.prototype = Object.create(Sprite.prototype);

OutroCardStars.prototype.createElements = function() {
   //this.containerParticles = this.addChild( new Sprite());

   for (var i = 0; i < this.countStarts; i++) {
      var rotation = 0;

      if (i === 0) rotation = -Math.PI / 7;
      if (i === 2) rotation = Math.PI / 7;

      var star = this.addChild(new Sprite("card/star-empty"));
      star.scale.set(0.75);
      star.rotation = rotation;

      this.emptyStars.push(star);

      star = this.addChild(new Sprite("card/star"));
      star.scale.set(0.7);
      star.rotation = rotation;
      star.visible = false;
      this.fullStars.push(star);
   }
};

OutroCardStars.prototype.show = function() {
   for (var i = 0; i < this.fullStars.length; i++) {
      var star = this.fullStars[i];
      this.showStar(star, i * 500 + 200);

   }
};

OutroCardStars.prototype.showStar = function(star, delay) {
   if (!star) throw new Error('Star is not defined');

   var endS = {x: star.scale.x, y: star.scale.y};

   star.scale.set(0);

   var tw = new Tween(star, {scale: {x: [0, endS.x * 1.5, endS.x], y: [0, endS.y * 1.5, endS.y] }}, 500, {delay: delay});
   
   tw.once("start", function(obj){
      obj.visible = true;
      this.createBurst({x: obj.x, y: obj.y});
   }, this);

   tw.once("complete", function(obj){
   });
};


OutroCardStars.prototype.createBurst = function(position) {
   var brust = this.addChild( new ParticlesSprite.create(['elements/star'], OUTRO_STARS_BURST));
   brust.emitter.playOnceAndDestroy();

   brust.position.set(position.x, position.y);
   this.particles.push(brust);

   var explosion = this.addChild( new Sprite.fromPattern("animations/explosion"));
   explosion.tint = 0xfded18;
   explosion.loop = false;
   explosion.gotoAndPlay(0);
   explosion.animationSpeed = 0.15;
   explosion.position.set(position.x, position.y);
   explosion.onComplete = function() {
      this.destroy();
   };
};

OutroCardStars.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   for (var i = 0; i < this.countStarts; i++) {
      var radius = i % 2 ? -this.minRadius : -this.maxRadius;
      
      var x = Math.cos(i * Math.PI / 2) * radius;
      var y = Math.sin(i * Math.PI / 2) * radius;

      var empty = this.emptyStars[i];
      empty.position.set(x, y);

      var full = this.fullStars[i];
      full.position.set(x, y - 6);
   }
};

OutroCardStars.prototype.tick = function(delta) {
   for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update(delta);
   }
};
