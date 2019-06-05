function EnemyLifeBar() {
   Sprite.call(this);

   this.widthBar = 160;
   this.defaultLifespan = 0;
   this.currentLifespan = 0;
   this.oneStep = 0;

   this.create();
}

EnemyLifeBar.prototype = Object.create(Sprite.prototype);

EnemyLifeBar.prototype.create = function() {
   this.back = this.addChild( new Sprite("enemy/bar/bar-empty"));
   this.back.anchor.x = 0;

   this.frontShadow = this.addChild( new Sprite("enemy/bar/bar"));
   this.frontShadow.width = this.widthBar;
   this.frontShadow.alpha = 0.5;
   this.frontShadow.anchor.x = 0;

   this.front = this.addChild( new Sprite("enemy/bar/bar"));
   this.front.width = this.widthBar;
   this.front.anchor.x = 0;

   var mask = this.addChild(new PIXI.Graphics())
      .beginFill()
      .drawRoundedRect(0, -this.back.height / 2, this.widthBar, this.back.height, this.back.height / 2)
      .endFill();

   this.back.mask = mask;
   this.frontShadow.mask = mask;
   this.front.mask = mask;


   /* COUNTER DAMAGE */
   this.counterDamage = this.addChild(new Sprite());
   this.counterDamage.position.set(this.widthBar / 2, -40)

   this.maxDamage = this.counterDamage.addChild(new PIXI.Text("0", CONFIG.TEXTS.LIFE_BAR_NUMBER.style));
   this.maxDamage.anchor.set(1, 0.5);
   this.maxDamage.x = -8;

   this.damageSeparator = this.counterDamage.addChild(new PIXI.Text("/", CONFIG.TEXTS.LIFE_BAR_NUMBER.style));
   this.damageSeparator.anchor.set(0.5);

   this.actualDamage = this.counterDamage.addChild(new PIXI.Text("0", CONFIG.TEXTS.LIFE_BAR_NUMBER.style));
   this.actualDamage.anchor.set(0, 0.5);
   this.actualDamage.x = 8;

   this.counterDamage.visible = false;
};

// EnemyLifeBar.prototype.resetDamage = function() {
//    this.maxDamage.text = 0;
//    this.actualDamage.text = 0;
// };

EnemyLifeBar.prototype.reset = function() {
   this.maxDamage.text = 0;
   this.actualDamage.text = 0;
   this.oneStep = 0;
   this.lifespan = 0;
   this.currentLifespan = 0;

   this.front.position.x = 0;
   this.frontShadow.position.x = 0;

   this.counterDamage.visible = false;
};

EnemyLifeBar.prototype.init = function(val) {
   if (typeof val === 'undefined') throw new Error("Value is not defined");

   this.defaultLifespan = val;
   this.currentLifespan = this.defaultLifespan;
   this.oneStep = this.widthBar / this.defaultLifespan;
};

EnemyLifeBar.prototype.setMaxDamage = function(val) {
   if (typeof val === 'undefined') throw new Error("Value is not defined");

   this.maxDamage.text = val * 10;
};

EnemyLifeBar.prototype.setActualDamage = function(val) {
   if (typeof val === 'undefined') throw new Error("Value is not defined");

   var num = +this.actualDamage.text / 10 + val;
   if (num < 0) num = 0;
   this.actualDamage.text = num * 10;

   this.currentLifespan -= val;

   this._setFrontPos();

   this.counterDamage.visible = true;

   if (num <= 0) this.counterDamage.visible = false;
};

EnemyLifeBar.prototype._setFrontPos = function() {
   this.front.position.x = -this.oneStep * (this.defaultLifespan - this.currentLifespan);
};

EnemyLifeBar.prototype._setShadowPos = function() {
   this.frontShadow.position.x = -this.oneStep * (this.defaultLifespan - this.currentLifespan);
};

EnemyLifeBar.prototype.setFinalDamage = function() {

   this.counterDamage.visible = false;

   this._setShadowPos();
   this._setFrontPos();
   
   this.maxDamage.text = 0;
   this.actualDamage.text = 0;

   if (this.currentLifespan <= 0) {
      this.hide();
      this.reset();
      this.emit("finish_life");
   }
};

EnemyLifeBar.prototype.getCurrentValue = function() {
   return this.currentLifespan;
};

EnemyLifeBar.prototype.hide = function() {
   this.visible = false;
};

EnemyLifeBar.prototype.show = function() {
   this.visible = true;
};

