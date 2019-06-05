function OutroCard() {
   Sprite.call(this);

   this.createElements();
   this.onResize();
}

OutroCard.prototype = Object.create(Sprite.prototype);

OutroCard.prototype.createElements = function() {
   this.frame = this.addChild(new Sprite("card/frame"));

   this.title = this.addChild(new Sprite());
   var frame = this.title.addChild(new Sprite("card/frame-title"));
   this.title.frame = frame;

   var text = this.title.addChild(new PIXI.Text(CONFIG.TEXTS.OUTRO_CARD_TITLE.text, CONFIG.TEXTS.OUTRO_CARD_TITLE.style));
   text.anchor.set(0.5);
   text.y = 5;
   this.title.text = text;

   this.ctaBtn = this.addChild(new OutroCta());

   this.stars = this.addChild(new OutroCardStars());

   this.scale.set(1.2);
};

OutroCard.prototype.animStars = function() {
   this.stars.show();
};


OutroCard.prototype.onResize = function(options) {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   this.title.position.set(0, -220);
   this.ctaBtn.position.set(0, 115);
   this.stars.position.set(0, -30);

   if (options && options.width && options.height) {
      var maxW = options.width;
      var maxH = options.height;

      var cardW = this.frame.width / this.frame.scale.x;
      var cardH = this.frame.height / this.frame.scale.x;

      if (land) {
         var cardOptions = Utils.fitLayout(maxW, maxH, cardW, cardH);
         this.scale.set(cardOptions.scale);
      }
      else {
         var cardOptions = Utils.fitLayout(maxW, maxH, cardW, cardH);
         this.scale.set(cardOptions.scale);
      }
   }
};

OutroCard.prototype.tick = function(delta) {
   if (this.stars) this.stars.tick(delta);
};

