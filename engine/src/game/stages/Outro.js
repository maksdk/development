function Outro() {
   Sprite.call(this);

   this.particles = [];

   this.back = null;
   this.card = null;
   this.particlesCont = null;

   this.isShowed = false;
   this.visible = false;

   this.defaultSize = {};

   this.createElements();
   this.onResize();
}

Outro.prototype = Object.create(Sprite.prototype);

Outro.prototype.createElements = function() {
   /*var back = this.addChild(new PIXI.Graphics())
      .beginFill(0x26a7ff, 0)
      .drawRect(0,0,1,1)
      .endFill();
   this.back = back;*/

   this.particlesCont = this.addChild(new Sprite());

   this.logo = this.addChild(new Sprite("logo/best-friend-logo"));
   this.logo.on('pointerdown', function(e) {
      e.stopPropagation();
      callSDK('download');
   });

   this.card = this.addChild(new OutroCard());
};

Outro.prototype.show = function() {
   this.isShowed = true;
   this.visible = true;

   this.card.animStars();

   this.createparticles();

   setTimeout(function() {
      Game.emit("outro");
   }, CONFIG.application.delayOutro);
};

Outro.prototype.createparticles = function(position) {
   var ratioDelay = 0;
   var initDelay = 300;

   for (var i = 0; i < 40; i++) {
      if (i % 5 === 0) ratioDelay += 1;
      this.putOff(ratioDelay * initDelay)
   }
};

Outro.prototype.putOff = function(delay) {
   new Timer(delay)
      .once('finish', function() {
         var x = Utils.randomInt( -LayoutManager.gameWidth * 0.45, LayoutManager.gameWidth * 0.45);
         var y = Utils.randomInt( -LayoutManager.gameHeight * 0.45, LayoutManager.gameHeight * 0.45);
         
         var stars = this.particlesCont.addChild( new ParticlesSprite.create(['elements/star'], OUTRO_STARS_BURST));
         
         stars.emitter.playOnceAndDestroy();
         stars.position.set(x, y);

         this.particles.push(stars);
      }, this);
};

Outro.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   /*this.back.width = gw;
   this.back.height = gh;
   this.back.position.set(-gw*0.5, -gh*0.5);*/

   if (land) {

      this.card.onResize({width: gw * 0.4, height: gh * 0.7});
      this.card.position.set(-gw * 0.15, 0);

      /*LOGO*/
      var logoW = this.logo.width / this.logo.scale.x;
      var logoH = this.logo.height / this.logo.scale.y;

      var logoMaxW = gw * 0.2;
      var logoMaxH = gh * 0.5;

      var logoOptions = Utils.fitLayout(logoMaxW, logoMaxH, logoW, logoH);
      this.logo.scale.set(logoOptions.scale);

      this.logo.position.set(gw*0.25, 0);
   }
   else {
      this.card.onResize({width: 0.95 * gw, height: gh*0.4});
      this.card.position.set(0, gh*0.15);

      /*LOGO*/
      var logoW = this.logo.width / this.logo.scale.x;
      var logoH = this.logo.height / this.logo.scale.y;

      var logoMaxW = gw* 0.65;
      var logoMaxH = gh*0.4;

      var logoOptions = Utils.fitLayout(logoMaxW, logoMaxH, logoW, logoH);
      this.logo.scale.set(logoOptions.scale);
      this.logo.position.set(0, -gh*0.3);
   }
};

Outro.prototype.tick = function(delta) {
   if (!this.isShowed) return;
   
   if (this.card) this.card.tick(delta);

   for (var i = 0; i< this.particles.length; i++) {
      this.particles[i].update(delta)
   }
};


