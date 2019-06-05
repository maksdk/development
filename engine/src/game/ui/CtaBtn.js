function CtaBtn() {
   Sprite.call(this);

   this.largeBtn = null;
   this.smallBtn = null;

   this.create();
   this.on('pointerdown', this.onClick, this);
}

CtaBtn.prototype = Object.create(Sprite.prototype);

CtaBtn.prototype.create = function() {
   this.largeBtn = this.addChild(new Sprite());
   this.largeBtn.scale.set(1.3);
   var back = this.largeBtn.addChild(new Sprite('buttons/large'));
   var text = this.largeBtn.addChild(new PIXI.Text(CONFIG.TEXTS.DOWNLOAD.text, CONFIG.TEXTS.DOWNLOAD.style));
   text.anchor.set(0.5);
   text.y = -8;

   this.smallBtn = this.addChild(new Sprite());
   back = this.smallBtn.addChild(new Sprite('buttons/small'));
   back.scale.y = back.scale.y * 1.3;
   var icon = this.smallBtn.addChild(new Sprite("buttons/arrow"));
   icon.scale.set(1.2);
   icon.y = -8;
   icon.x = -8;

   this.smallBtn.scale.set(2)
};

CtaBtn.prototype.onClick = function(e) {
   e.stopPropagation();
   callSDK('download');
};

CtaBtn.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   if (land) {
      this.largeBtn.visible = true;
      this.smallBtn.visible = false;
   }
   else {
      this.largeBtn.visible = false;
      this.smallBtn.visible = true;
   }
};