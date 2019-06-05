"use strict";

function Bird() {
   Sprite.call(this);

   this.birdFront = null;
   this.birdBack = null;
   this.smoke = null;
   this.particlesCont = null;

   this.particles = [];

   this.fieldPos = {x: 0, y: 0};
   this.targetPos = {x: 0, y: 0};

   this.createElements();
   this.onResize();

   this.activeBird(this.birdFront);

   this.scale.set(0.3);
}

Bird.prototype = Object.create(Sprite.prototype);

Bird.prototype.createElements = function() {
   var body, wingsLeft, wingsRight, eyes, birdFront, birdBack;

   this.particlesCont = this.addChild(new Sprite());

   birdFront = this.addChild(new Sprite());

   wingsRight = birdFront.addChild(new Sprite.fromPattern('bird/wings/'));
   wingsRight.loop = true;
   wingsRight.gotoAndStop(0);
   wingsRight.speedAnimation = 0.24;
   wingsRight.scale.set(-1);

   body = birdFront.addChild(new Sprite('bird/bodies/front'));

   eyes = birdFront.addChild(new Sprite.fromPattern('bird/eyes/'));
   eyes.loop = false;
   eyes.gotoAndStop(0);
   eyes.speedAnimation = 0.15;

   wingsLeft = birdFront.addChild(new Sprite.fromPattern('bird/wings/'));
   wingsLeft.loop = true;
   wingsLeft.gotoAndStop(0);
   wingsLeft.speedAnimation = 0.24;

   birdFront.body = body;
   birdFront.eyes = eyes;
   birdFront.wingsLeft = wingsLeft;
   birdFront.wingsRight = wingsRight;

   this.birdFront = birdFront;
   this.birdFront.visible = false;


   birdBack = this.addChild(new Sprite());

   wingsRight = birdBack.addChild(new Sprite.fromPattern('bird/wings/'));
   wingsRight.loop = true;
   wingsRight.gotoAndStop(0);
   wingsRight.speedAnimation = 0.24;

   body = birdBack.addChild(new Sprite('bird/bodies/back'));

   wingsLeft = birdBack.addChild(new Sprite.fromPattern('bird/wings/'));
   wingsLeft.loop = true;
   wingsLeft.gotoAndStop(0);
   wingsLeft.speedAnimation = 0.24;

   birdBack.body = body;
   birdBack.eyes = eyes;
   birdBack.wingsLeft = wingsLeft;
   birdBack.wingsRight = wingsRight;

   this.birdBack = birdBack;
   this.birdBack.visible = false;


   var smoke = this.particlesCont.addChild(new Sprite.fromPattern('smoke/'));
   smoke.loop = false;
   smoke.gotoAndStop(0);
   smoke.speedAnimation = 0.04;
   smoke.tint = 0x60d8b2;
   smoke.scale.set(3);
   smoke.visible = false;
   smoke.onComplete = function() {
      this.destroy(); 
   };
   this.smoke = smoke;
   
};

Bird.prototype.activeBird = function(bird) {
   bird.wingsLeft.play();
   bird.wingsRight.play();

   bird.visible = true;

   if (bird.eyes) {
      bird.clipingTimer = new Timer(2000, Infinity)
         .on("finish", function() {
            bird.eyes.gotoAndStop(0);
            bird.eyes.play();     
         }, this);
   }
};

Bird.prototype.removeBird = function(bird) {
   bird.wingsLeft.play();
   bird.wingsRight.play();

   if (bird.eyes) {
      bird.eyes.destroy()
   }

   if (bird.clipingTimer) {
      bird.clipingTimer.stop();
      bird.clipingTimer = null;
   }

   bird.visible = false;
};

Bird.prototype.move = function(cb) {
   this.emit('bird_start_move');


   var endPos = {x: this.x + 25, y: this.y + 25};
   var startScale = {x: this.scale.x, y: this.scale.y}
   var endScale = {
      x: startScale.x * 1.7,  
      y: startScale.y * 1.7
   };

   //this.birdBack.scale.set(1.7);
   //this.birdBack.position.set(endPos.x + 10, endPos.y + 10);

   this.createFeathersBurst({x: this.position.x, y: this.position.y});

   var tw1 = new Tween(this, {position: endPos, scale: endScale}, 600, {})
      .once("complete", function(obj) {
         this.removeBird(this.birdFront);
         this.activeBird(this.birdBack);
      }, this);

   


   var diffX = this.targetPos.x - this.x;
   var diffY = this.targetPos.y - this.y;

   var orientation = diffX > 0 ? 1 : -1;

   var endScale2 = {x: this.scale.x * 0.8 /** orientation*/, y: this.scale.y * 0.8 /** orientation*/};
   
   var endPos2 = {
      x: [this.x, this.x + diffX * 0.5, this.targetPos.x],
      y: [this.y, this.y + diffY * 0.5, this.targetPos.y]
   };

   var delayMove = 250;
   var durMove = 600;

   var durScale = 200;
   var delayScale = delayMove + durMove - durScale;
   

   this.birdBack.scale.set(this.birdBack.scale.x * orientation, this.birdBack.scale.y);

   var tw2 = new Tween(this, {scale: endScale2, position: endPos2}, durMove, {Interpolation: TWEEN.Interpolation.Bezier, delay: delayMove, autoStart: false});
   var tw3 = new Tween(this, {scale: {x: 0.3, y: 0.3}}, durScale, { delay: delayScale })
      .once("complete", function(obj) {
         this.removeBird(this.birdBack); 

         //this.smoke.position.set(this.targetPos.x, this.targetPos.y);
         this.smoke.visible = true;
         this.smoke.gotoAndStop(0);
         this.smoke.play();
         this.createFeathersBurst(this.targetPos);  

          

         this.emit("destroyed"); 
         
      }, this);

   tw1.chain(tw2, tw3);
};

Bird.prototype.createFeathersBurst = function(position) {  
   var burst1 = this.particlesCont.addChild(new ParticlesSprite.create('bird/feathers/1', BIRD_FEATHER));
   burst1.emitter.playOnceAndDestroy();
   //burst1.position.set(position.x, position.y);
   this.particles.push(burst1);
};

Bird.prototype.replaceContainer = function(container) {
   container.addChild(this);
   this.position.set(this.fieldPos.x, this.fieldPos.y); 
};

Bird.prototype.setFieldPos = function(pos) {
   this.fieldPos.x = pos.x;
   this.fieldPos.y = pos.y; 
};

Bird.prototype.setTargetPos = function(pos) {
   this.targetPos.x = pos.x;
   this.targetPos.y = pos.y; 
};


Bird.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   this.birdFront.wingsLeft.position.set(-65, 10);
   this.birdFront.wingsRight.position.set(55, 10);
   this.birdFront.eyes.position.set(-10, -30);

   this.birdBack.wingsLeft.position.set(0, 10);
   this.birdBack.wingsRight.position.set(-40, 10);

   if (land) {

   }
   else {
      
   }
};

Bird.prototype.tick = function(delta) {
   for(var i = 0; i < this.particles.length; i++) {
      this.particles[i].update(delta);  
   }
};