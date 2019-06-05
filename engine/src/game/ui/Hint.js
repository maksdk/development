function Hint() {
   Sprite.call(this);

   this.currentDelay = 0;
   this.delay = 3000;
   this.pointer = null;
   this.tweens = [];
   this._lock = true;

   this.create();
}

Hint.prototype = Object.create(Sprite.prototype);

Hint.prototype.init = function(delay) {
   if (typeof delay !== 'number') throw new Error("Delay must be a number");

   this.delay = delay;
   this.unlock();
};
   
Hint.prototype.create = function() { 
   this.pointer = this.addChild(new Sprite("elements/pointer"));
   this.pointer.visible = false;
   this.pointer.anchor.set(0, 0);
};

Hint.prototype.isLock = function() {
   return this._lock;
};

Hint.prototype.unlock = function() {
   this._lock = false;
};

Hint.prototype.lock = function() {
   this._lock = true;
   this.hide();
};

Hint.prototype.show = function(points, container) {
   if (this.isLock()) return;

   if (!points) throw new Error("Points is not found");
   if (points.length <= 0) return this.emit("nomoves");

   if (container) {
      container.addChild(this.pointer);
   }

   var pointsX = points.map(function(coord) {
      return coord.x;
   });

   var pointsY = points.map(function(coord) {
      return coord.y;
   });

   this.pointer.position.set(pointsX[0], pointsY[0]);

   var tw1 = new Tween(this.pointer, { position:{ x: pointsX, y: pointsY }}, pointsX.length * 250, { autoStart: false });
   var tw2 = new Tween(this.pointer, { position:{ x: pointsX.slice().reverse(), y: pointsY.slice().reverse() }}, pointsX.length * 250, { autoStart: false });
   
   tw1.once("start", function(obj) {
      obj.visible = true;
   });

   tw1.once("stop", function(obj) {
      obj.visible = false;
   });

   tw1.chain(tw2);
   tw2.chain(tw1);

   tw1.start();

   this.tweens.push(tw1, tw2);

};

Hint.prototype.removeTweens = function() {
   this.tweens.forEach(function(tw) {
      tw.stop();
   })
   this.tweens = [];
};

Hint.prototype.hide = function() {
   this.currentDelay = 0;
   this.pointer.visible = false;
   this.removeTweens();
};

Hint.prototype.run = function() {
   this.currentDelay = this.delay;
};

Hint.prototype.destroy = function() {
   this.removeTweens();
   this.hide();
   this.lock();
   this.removeChild(this.pointer);
   this.currentDelay = -1;
   this.delay = -1;
};

Hint.prototype.tick = function(delta) {
   if (this.isLock()) return;

   if (this.currentDelay > 0) {
      this.currentDelay -= delta;
      if (this.currentDelay <= 0) {
         this.emit("run");
      }
   }  
};