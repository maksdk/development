function Water() {
   Sprite.call(this);

   this._lock = false;

   this.water = null;
   this.sky = null;

   this.smallWaves = [];
   this.bigWaves = [];

   this.createElements();
}

Water.prototype = Object.create(Sprite.prototype);

Water.prototype.createElements = function () {
   var water = this.addChild(new PIXI.Graphics())
      .beginFill(0x0bb2fd)
      .drawRect(0, 0, 1, 1)
      .endFill();
   this.waterGraph = water;

   this.sky = this.addChild(new Sprite("sky"));
   this.sky.anchor.y = 1;

   var shapeMask = this.addChild(new PIXI.Graphics())
      .beginFill(0x26a7ff)
      .drawRect(0, 0, 1, 1)
      .endFill();
   this.waveMask = shapeMask;


   //this.bigWave = this.addChild(new Sprite("big-waves/waves_white"));
   this.bigWave = this.addChild(new Sprite("waves/2"));
   this.bigWave.alpha = 1;
   this.bigWave.anchor.set(0);
   this.bigWave.mask = shapeMask;
   

   for (var l = 0; l < 10; l += 2) {
      var littleWave = this.addChild(new Sprite());
      littleWave.child = littleWave.addChild(new Sprite("waves/wave2"));
      littleWave.child.scale.set(0.2);
      littleWave.y = 200;
      littleWave.vy = 0.7;
      littleWave.vx = -0.1;
      littleWave.y = -l * Utils.randomInt(80, 140);
      littleWave.x = Utils.randomRange(-LayoutManager.gameWidth * 0.4, 0);
      littleWave.basePos = { x: littleWave.x, y: littleWave.y };
      littleWave.baseScale = { x: 0.2, y: 0.2 };

      var littleWave1 = this.addChild(new Sprite());
      littleWave1.child = littleWave1.addChild(new Sprite("waves/wave2"));
      littleWave1.child.scale.set(0.2);
      littleWave1.y = 200;
      littleWave1.vy = 0.7;
      littleWave1.vx = 0.1;
      littleWave1.y = -l * Utils.randomInt(80, 140);
      littleWave1.x = Utils.randomRange(0, LayoutManager.gameWidth * 0.4);
      littleWave1.basePos = { x: littleWave1.x, y: littleWave1.y };
      littleWave1.baseScale = { x: 0.2, y: 0.2 };

      littleWave.mask = shapeMask;
      littleWave1.mask = shapeMask;
      this.smallWaves.push(littleWave, littleWave1);
   }

   for (var i = 0; i < 3; i++) {
      var wave = this.addChild(new Sprite('waves/wave1'));
      wave.position.set(
         Utils.randomInt(-LayoutManager.gameWidth / 2, LayoutManager.gameWidth / 2),
         LayoutManager.gameHeight * 0.75 + (LayoutManager.gameHeight * 0.75 / 3) * i
      );
      wave.alpha = 0.2;
      wave.vy = -1;
      wave.mask = shapeMask;
      this.bigWaves.push(wave);
   }
};


Water.prototype.onResize = function () {
   var h = LayoutManager.gameHeight,
      w = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   this.x = 0;
   //this.y = -h * 0.25

   this.waterGraph.width = w;
   this.waterGraph.height = h;
   this.waterGraph.position.set(-w * 0.5, 0);

   this.waveMask.width = w;
   this.waveMask.height = h;
   this.waveMask.position.set(-w * 0.5, 0);

   this.sky.width = w;
   this.sky.height = h;
   this.sky.position.set(0);


   this.bigWave.defScale = 1.5;

   if (land) {
      this.bigWave.width = w * this.bigWave.defScale;
      this.bigWave.scale.y = this.bigWave.scale.x;
   }
   else {
      this.bigWave.width = h * this.bigWave.defScale;
      this.bigWave.scale.y = this.bigWave.scale.x;
   }

   var pos = {};
   pos.x = -this.bigWave.width * 0.5;
   pos.y = h * 0.75 * 0.5 - this.bigWave.height * 0.5;

   this.bigWave.rationScale = {
      x:this.bigWave.scale.x, 
      y: this.bigWave.scale.y
   };

   this.bigWave.position.set(pos.x, pos.y); 
};

Water.prototype.showSmallWave = function (wave) {
   wave.child.scale.set(wave.baseScale.x, wave.baseScale.y);
   wave.child.alpha = 0;

   var tw1 = new Tween(wave.child, { alpha: 1 }, 150, { autoStart: false });
   var tw2 = new Tween(wave.child, { scale: { x: wave.child.scale.x * 2, y: wave.child.scale.y * 0.3 } }, 1000, { repeat: Infinity, yoyo: true, autoStart: false });

   tw2.once('start', function (obj) {
      obj.visible = true;
      tw1.start();
   });

   return tw2;
};


Water.prototype.moveSmallWaves = function (speed) {
   for (var i = 0; i < this.smallWaves.length; i++) {
      this.smallWaves[i].y += this.smallWaves[i].vy * speed;

      var s = LayoutManager.gameHeight / (LayoutManager.gameHeight - this.smallWaves[i].y) / 1.8;
      this.smallWaves[i].scale.set(s);

      if (this.smallWaves[i].y >= 0 && !this.smallWaves[i].animShow) {
         this.smallWaves[i].animShow = this.showSmallWave(this.smallWaves[i]).start();
      }

      if (this.smallWaves[i].y >= LayoutManager.gameHeight * 0.65) {
         this.smallWaves[i].animShow.stop();
         this.smallWaves[i].animShow = null;
         this.smallWaves[i].y = 0;
      }
   }
};

Water.prototype.moveBigWaves = function (speed) {
   for (var i = 0; i < this.bigWaves.length; i++) {
      this.bigWaves[i].y += this.bigWaves[i].vy * speed;
      this.bigWaves[i].skew.x += 0.001;

      var s = LayoutManager.gameHeight / (LayoutManager.gameHeight - this.bigWaves[i].y) / 3;
      this.bigWaves[i].scale.set(s);

      if (this.bigWaves[i].y <= 0) {
         this.bigWaves[i].y = LayoutManager.gameHeight * 0.8;
         this.bigWaves[i].skew.x = 0;
      }
   }
};

Water.prototype.destroy = function () {
   this._lock = true;
   this.visible = false;
   if (this.parent) {
      this.parent.removeChild(this);
   }
};



Water.prototype.move = function (speed) {
   if (this._lock) return;

   this.moveSmallWaves(speed);
   this.moveBigWaves(speed);
   this.moveBigWave();
};


var __posX = 0;
var __posY = 0;
var __speedPosX = 0.01;
var __speedPosY = 0.01;
var __addSpeedPosY = 0.5;
 
var __scaleX = 0;
var __scaleY = 0;
var __speedScaleX = 0.005;
var __speedScaleY = 0.005;

var __directionScaleX = 1;
var __directionScaleY = 1;
var __directionPosX = 1;
var __directionPosY = 1;

Water.prototype.moveBigWave = function() {
   __scaleX += __speedScaleX * __directionScaleX;
   __scaleY += __speedScaleY * __directionScaleY;

   __posX += __speedPosX * __directionPosX;
   __posY += __speedPosY * __directionPosY;

   this.bigWave.scale.x = this.bigWave.rationScale.x + Math.sin(__scaleX);
   this.bigWave.scale.y = this.bigWave.rationScale.y + Math.cos(__scaleY);

   this.bigWave.position.x += Math.cos(__posX);
   this.bigWave.position.y += Math.cos(__posY);
   

   if (this.bigWave.x + this.bigWave.width <= LayoutManager.gameWidth * 0.5) {
      __directionPosX = -1;
      __posX += __speedPosX * __directionPosX;
      this.bigWave.position.x += Math.cos(__posX);

      __directionScaleX *= -1;
      __scaleX += __speedScaleX * __directionScaleX;
      this.bigWave.scale.x = this.bigWave.rationScale.x + Math.sin(__scaleX);
   }
   if (this.bigWave.x >= -LayoutManager.gameWidth / 2) {
      __directionPosX = 1;
      __posX += __speedPosX * __directionPosX;
      this.bigWave.position.x += Math.cos(__posX);
   }
   if (this.bigWave.width <= LayoutManager.gameWidth) {
      __directionScaleX *= -1;
      __scaleX += __speedScaleX * __directionScaleX;
      this.bigWave.scale.x = this.bigWave.rationScale.x + Math.sin(__scaleX);
   }


   if (this.bigWave.y + this.bigWave.height <= LayoutManager.gameHeight * 0.75) {
      __directionPosY = 1;
      __posY += __speedPosY * __directionPosY;
      this.bigWave.position.y += Math.cos(__posY);

      __directionScaleY *= -1;
      __scaleY += __speedScaleY * __directionScaleY;
      this.bigWave.scale.y = this.bigWave.rationScale.y + Math.cos(__scaleY);
   }
   if (this.bigWave.y >= 0) {
      __directionPosY = -1;
      __posY += __speedPosY * __directionPosY;
      this.bigWave.position.y += Math.cos(__posY);
   }
   if (this.bigWave.height <= LayoutManager.gameHeight * 0.75) {
      __directionScaleY *= -1;
      __scaleY += __speedScaleY * __directionScaleY;
      this.bigWave.scale.y = this.bigWave.rationScale.y + Math.cos(__scaleY);
   }
};
