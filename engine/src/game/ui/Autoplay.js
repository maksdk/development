function Autoplay() {
   Sprite.call(this);

   this.currentDelay = -1;
   this.delay = 5000;
   this._lock = true;
   this.working = false;

   this.continue = this.continue.bind(this);
}

Autoplay.prototype = Object.create(Sprite.prototype);

Autoplay.prototype.isWorking = function() {
   return this.working;
};

Autoplay.prototype.setWorking = function(state) {
   this.working = state;
};

Autoplay.prototype.init = function(delay, stepDelay) {
   if (typeof delay !== 'number') throw new Error("Delay must be a number");

   this.delay = delay;
   this.stepDelay = stepDelay;
   this.unlock();
};

Autoplay.prototype.isLock = function() {
   return this._lock;
};

Autoplay.prototype.unlock = function() {
   this._lock = false;
};

Autoplay.prototype.lock = function() {
   this._lock = true;
};

Autoplay.prototype.stop = function() {
   this.currentDelay = -1;
};

Autoplay.prototype.run = function() {
   if (this.isLock()) return;
   this.currentDelay = this.delay;
};

Autoplay.prototype.continue = function() {
   if (this._lock) return;
   if (this.currentDelay > 0) return;
   this.currentDelay = this.stepDelay;
};

Autoplay.prototype.update = function() {
   this.currentDelay = this.delay;
};

Hint.prototype.destroy = function() {
   this.stop();
   this.lock();
   this.currentDelay = -1;
   this.delay = -1;
   this.working = false;
};

Autoplay.prototype.tick = function(delta) {
   if (this._lock) return;

   if (this.currentDelay > 0) {
      this.currentDelay -= delta;
      if (this.currentDelay <= 0) {
         this.emit("run");
      }
   }  
};