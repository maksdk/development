function OutroCta() {
   Sprite.call(this);

   this.back = null;

   this.create();
   this.animate();

   this.on('pointerdown', this.onClick, this);
}

OutroCta.prototype = Object.create(Sprite.prototype);

OutroCta.prototype.create = function() {
   this.back = this.addChild(new Sprite('buttons/large'));

   var text = this.back.addChild(new PIXI.Text(CONFIG.TEXTS.DOWNLOAD.text, CONFIG.TEXTS.DOWNLOAD.style));
   text.anchor.set(0.5);
   text.y = -8;
};

OutroCta.prototype.animate = function() {
   var t = new Tween(this.back, {scale: {x: this.back.scale.x * 0.9, y: this.back.scale.y * 0.9}}, 500, {repeat: Infinity, yoyo: true });
   t.once('start', function(e) {
      this.visible = true;
   }, this);
};

OutroCta.prototype.onClick = function(e) {
   e.stopPropagation();
   callSDK('download');
};
