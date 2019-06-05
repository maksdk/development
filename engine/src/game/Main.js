function Main() {
   GameWindow.call(this);

   this.field = null;

   this.createChildren();
   this.createEmitters();
   this.onResize();
}

Main.prototype = Object.create(GameWindow.prototype);

Main.prototype.createChildren = function () {
   var tokens = [
      {bitmap: null,      locked: true,  color: 0x000000, bonusID: null, obstacle: false},
      {bitmap: "tiles/1", locked: false, color: 0x0000ff, bonusID: null, obstacle: false},
      {bitmap: "tiles/2", locked: false, color: 0x00ff00, bonusID: null, obstacle: false},
      {bitmap: "tiles/3", locked: false, color: 0xff0000, bonusID: null, obstacle: false}, 
      {bitmap: "tiles/4", locked: false, color: 0xffff00, bonusID: null, obstacle: false},
      {bitmap: "tiles/5", locked: false, color: 0xff00ff, bonusID: null, obstacle: false},
      {bitmap: "tiles/ice", locked: true,  color: 0x000000, bonusID: null, obstacle: true}
   ];

   var lockedCells = [
      [ 1, 1, 0, 0, 0, 1, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 0, 1, 0, 1 ]
   ];

   this.field = this.addChild(new Field());
   this.field.init({
      tokenTypes: tokens,
      spriteHeight: 120,
      spriteWidth: 120,
      cols: 7,
      rows: 7,
      lockedCells: lockedCells
   });
   this.field.createField();

   this.addObstacle(3, 4);
   this.addObstacle(2, 2);
   this.addObstacle(5, 2);
};

Main.prototype.createEmitters = function() {
   this.field.on("select_token", function(e) {
      console.log(" === Event: select_token ===")
      var token = e.token;
      token.scale.set(1.15);
   });

   this.field.on("unselect_token", function(e) {
      console.log(" === Event: unselect_token ===")
      var token = e.token;
      token.scale.set(1);
   });

   this.field.on("destroy_tokens", function(e) {
      console.log(" === Event: destroy_tokens ===")
      var tokens = e.tokens;
   });

   this.field.on("destroy_token", function(e) {
      console.log(" === Event: destroy_token ===")
      var token = e.token;
      token.visible = false;
   });
};

Main.prototype.addObstacle = function(x, y) {
   var obstacle = new Token("tiles/ice", 120, 120);
   obstacle.tokenID = 6;
   this.field.putToken(x, y, obstacle);
};

Main.prototype.onResize = function () {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   if (this.field) {
      var fieldW = this.field.spriteWidth * this.field.cols;
      var fieldH = this.field.spriteHeight * this.field.rows;
      var scale = Math.min(gw * 0.8 / fieldW, gh * 0.6 / fieldH);
      
      this.field.scale.set(scale);
      this.field.position.set(-fieldW / 2 * scale, -fieldH / 2 * scale);
   }
};

Main.prototype.tick = function (delta) {
   
};


