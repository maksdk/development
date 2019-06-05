function FieldGame() {
	Field.call(this);

	var lockedCells = CONFIG.application.lockedCells;
	var cols = CONFIG.application.cols;
	var rows = CONFIG.application.rows;
	var spriteWidth = CONFIG.application.spriteWidth;
	var spriteHeight = CONFIG.application.spriteHeight;

	FieldAnimations.field = this;

	this.tokens = [];
	this.destroyedTokens = [];
	this.darkCells = [];
	this.animatedLines = [];
	this.pushedTokens = [];
	this.particles = [];

	this.fieldMask = null;
	this.lowerCont = null;
	this.higherCont = null;
	this.tokenContainer = null;
	this.destroyedTokenContainer = null;

	this.idSelectedTokens = 0;
	this.newTokens = {};
	this.birds = [];
	this.counterNewTokens = 0;
	
	this.createElements();
	this.createTokens();

	this.init({
		cols: cols,
		rows: rows,
		spriteWidth: spriteWidth,
		spriteHeight: spriteHeight,
		tokenTypes: this.tokens,
		tokenContainer: this.tokenContainer,
		lockedCells: lockedCells
	});

	this.createField();
	this.createDefaultField();
	this.addObstacles(lockedCells);
   this.createCells(lockedCells);
   this.createBottomArrows();

	this.unDestroyTokens = this.unDestroyTokens.bind(this);
	this.addNewTokens = this.addNewTokens.bind(this);
	this.selectToken = this.selectToken.bind(this);
	this.destroyTokensAutoplay = this.destroyTokensAutoplay.bind(this);
	this.hideDarkCells = this.hideDarkCells.bind(this);

	this.on("created_new_token", this.saveNewToken, this);
	this.on("all_tokens_created", this.addBirds, this);
	//this.on("all_tokens_created", this.addBomb, this);

	this.on("all_possible_matches", this.selectFirstToken, this);
	this.on("select_token", this.selectToken, this);
	this.on("unselect_token", this.unSelectToken, this);
	this.on("move_tokens", this.moveTokens, this);
	this.on("destroy_tokens", this.destroyLines, this);
	this.on("destroy_tokens", this.unPushTokens, this);
	//this.on("destroy_token", this.destroyTokenByBird, this);
	this.on("end_action", this.endAction, this);

	/*OPTIONS FOR AUTOPLAY*/
	this.autoplayTokens = [];
	this.autoplayTweens = [];

	this.initAutoplay = this.initAutoplay.bind(this);
	this.showDarkCellsAutoplay = this.showDarkCellsAutoplay.bind(this);
	this.lightTokensAutoplay = this.lightTokensAutoplay.bind(this);
	this.selectTokensAutoplay = this.selectTokensAutoplay.bind(this);
	this.hideDarkCellsAutoplay = this.hideDarkCellsAutoplay.bind(this);
	this.stopAutoplay = this.stopAutoplay.bind(this);
	this.resetAutoplay = this.resetAutoplay.bind(this);
	///////////////////

	
	//this.destroyBomb = this.destroyBomb.bind(this);
	//this.destroyBombs = this.destroyBombs.bind(this);
	
   Bomb.init(this);
   BombChild.init(this);
   //TokenBird.init(this);

	var bomb = new Bomb("boosters/bomb/simple", this.spriteWidth, this.spriteHeight);
	bomb.tokenID = 4;
	this.putToken(4,4, bomb);

}

FieldGame.prototype = Object.create(Field.prototype);

FieldGame.prototype.createElements = function() {
	var fieldMask = this.addChild(new PIXI.Graphics())
		.beginFill(0x000000)
		.drawRect(0,0,1,1)
		.endFill();
	this.fieldMask = fieldMask;

	this.lowerCont = this.addChild(new Sprite());
	this.tokenContainer = this.addChild(new Sprite());
	this.tokenContainer.mask = this.fieldMask;
	this.higherCont = this.addChild(new Sprite());
	this.destroyedTokenContainer = this.addChild(new Sprite());
};

FieldGame.prototype.createTokens = function() {
	this.tokens = [{bitmap: null, locked: true}];
	for(var i = 1; i < 4; i++) {
		this.tokens.push({bitmap: "items/simple/" + i});
	}
	this.tokens.push({bitmap: "boosters/bomb/simple", locked: true, obstacle: false});
	this.tokens.push({bitmap: null, locked: true, obstacle: true});
};

FieldGame.prototype.createCells = function(lockedCells) {
	for (var y = 0; y < lockedCells.length; y++) {
		if (!this.darkCells[y]) this.darkCells[y] = [];
				
		for (var x = 0; x < lockedCells[y].length; x++) {
			this.darkCells[y][x] = null;

			if (lockedCells[y][x] === 0) {
				var token = this.getToken(x, y);
				var x0 = token.calcX(x);
				var y0 = token.calcX(y);
				
				var lightCell = this.lowerCont.addChild(new Sprite("field-board/coub-frame-blue"));
				lightCell.x = x0;
				lightCell.y = y0;

				var darkCells = this.tokenContainer.addChild(new Sprite("field-board/frame-blue"));
				darkCells.x = x0;
				darkCells.y = y0;
				darkCells.visible = false;

				this.darkCells[y][x] = darkCells;
			}
		}
	}
};

FieldGame.prototype.createBottomArrows = function() {
   for (var y = 0; y < this.rows; y++) {
		for (var x = 0; x < this.cols; x++) {
         var t = this.getToken(x, y);

			if (t && (!this.lockedCells[y + 1] || this.lockedCells[y + 1][x])) {
            var arrow = this.addChild(new BottomArrow());
            arrow.position.set(t.x, t.y + this.spriteHeight * 0.6)
         }
		}
	} 
};

FieldGame.prototype.createDefaultField = function() {
	var defaultField = CONFIG.application.defaultField;

	for (var y = 0; y < defaultField.length; y++) {
		for (var x = 0; x < defaultField[y].length; x++) {
			if (defaultField[y][x] > 0) this.addToken(x, y, defaultField[y][x]);
		}
	}
};

FieldGame.prototype.addObstacles = function(lockedCells) {
	for (var y = 0; y < lockedCells.length; y++) {
		for (var x = 0; x < lockedCells[y].length; x++) {
			if (lockedCells[y][x] === 1) {

				var obstacle = new Token(null, this.spriteWidth, this.spriteHeight);
				obstacle.tokenID = this.tokens.length - 1;
				
				this.putToken(x, y, obstacle);
			}
		}
	}
};

FieldGame.prototype.unSelectToken = function(token) {
	
	var id = token.tokenID;
	if (id <= 0) {
		id = 1;
		console.log("ERROR: Texture with tokenID === 0 is not found");
	}

	token.scale.set(1);
	token.texture = new PIXI.Texture.fromFrame("items/simple/" + id);
	token.texture.update();

	this.tokenContainer.addChild(token);

	this.unPushTokens();

	/* TODO: вынести в отдельный файл*/
	var line = this.animatedLines.pop();
	if (line) {
		line.destroy();
	}
};

FieldGame.prototype.selectToken = function(token) {
	var id = token.tokenID;
	if (id <= 0) {
		id = 1;
		console.log("ERROR: Texture with tokenID === 0 is not found");
	}

	this.idSelectedTokens = token.tokenID;
	
	var selectedTokens = this.getSelectedTokens();
	this.createLineAnim(token, selectedTokens);

	token.scale.set(1.15);
	token.texture = new PIXI.Texture.fromFrame("items/active/" + id);
	token.texture.update();

	this.unPushTokens();
	this.pushTokens(token);

	/* TODO: поправить*/
	//var ts = this.getSelectedTokens();
	selectedTokens.forEach(function(t) {this.tokenContainer.addChild(t)}, this);
};


/* TODO: вынести в анимации*/
FieldGame.prototype.createLineAnim = function(token, selectedTokens) {
	if (selectedTokens.length <= 1) return;

	var prevToken = selectedTokens[selectedTokens.length - 2];
	var rotation = this.getRotationTo(prevToken, token);

	var pos = { x:prevToken.x, y:prevToken.y };

	var line = this.tokenContainer.addChild(new Sprite.fromPattern("animations/line"));
	//line.tint = 0xffae00;
	line.loop = true;
	line.animationSpeed = 0.15;

	line.position.set(pos.x, pos.y);
	line.rotation = Math.PI / 2;
	line.rotation = line.rotation + rotation;
	line.anchor.set(1, 0.5);
	//line.scale.set(0.25)

	/*line.height = this.spriteHeight * 0.8;
	line.scale.x = line.scale.x * 2.5;
	line.width = this.spriteHeight * 0.8;*/

	this.animatedLines.push(line);
};

FieldGame.prototype.unPushTokens = function() {
	for(var i = 0; i < this.pushedTokens.length; i++) {
		var t = this.pushedTokens[i];
		var sc = 1;
		if (!t.direction) continue;
		if (t.selected) {
			sc = t.scale.x;
		}
		var tw = new Tween(t, {position:{x: t.x += 6 * (t.direction.x * -1), y: t.y += 6 * (t.direction.y * -1)}, scale:{x: sc, y: sc}}, 600);
		t.direction = null;
	}
	this.pushedTokens = [];
};

/* TODO: вынести в анимации*/
FieldGame.prototype.pushTokens = function(from) {
	var matrix = [
		{x:0, y:-1},
		{x:1, y:-1},
		{x:1, y:0},
		{x:1, y:1},
		{x:0, y:1},
		{x:-1, y:1},
		{x:-1, y:0},
		{x:-1, y:-1}
	];

	for(var i = 0; i < matrix.length; i++) {
		var ts = this.getToken(from.tokenX + matrix[i].x, from.tokenY + matrix[i].y);
		var sc = 1.08;

		if (!ts) continue;

		ts.direction = matrix[i];

		if (ts.selected) {
			sc = 1;
		}

		var tw = new Tween(ts, {position:{x: ts.x += 6 * matrix[i].x, y: ts.y += 6 * matrix[i].y}, scale:{x: ts.scale.x * sc, y: ts.scale.y * sc}}, 600);
		this.pushedTokens.push(ts);
	}
};

/* TODO: вынести в отдельный файл*/
FieldGame.prototype.getRotationTo = function(t1, t2) {
	if (t1.tokenX < t2.tokenX && t1.tokenY > t2.tokenY) {
		return Math.PI * 0.25;
	}
	else if (t1.tokenX < t2.tokenX && t1.tokenY === t2.tokenY) {
		return Math.PI * 0.5;
	}
	else if (t1.tokenX < t2.tokenX && t1.tokenY < t2.tokenY) {
		return Math.PI * 0.75;
	}
	else if (t1.tokenX === t2.tokenX && t1.tokenY < t2.tokenY) {
		return Math.PI;
	}
	else if (t1.tokenX > t2.tokenX && t1.tokenY < t2.tokenY) {
		return Math.PI * 1.25;
	}
	else if (t1.tokenX > t2.tokenX && t1.tokenY === t2.tokenY) {
		return Math.PI * 1.5;
	}
	else if (t1.tokenX > t2.tokenX && t1.tokenY > t2.tokenY) {
		return Math.PI * 1.75;
	}
	return 0;
};
/* TODO:  ВЫНЕСТИ LINES В ОТДЕЛЬНЫЙ ФАЙЛ*/
FieldGame.prototype.destroyLines = function (argument) {
	for (var i = 0; i < this.animatedLines.length; i++) {
		this.animatedLines[i].destroy();
		this.lowerCont.removeChild(this.animatedLines[i]);
	}
};


FieldGame.prototype.moveTokens = function(e) {

	var data = e.data;
	var tokens = [];
	var promises = [];
	var newTokens = e.newTokens;
	var bomb = null;


	/* FIXME:  УБРАТЬ ДОБАВЛЕНИЕ БОМБЫ ОТ СЮДА*/
	if (newTokens.length >= CONFIG.application.bombs.countMatches) {
		bomb = new Bomb("boosters/bomb/simple", this.spriteWidth, this.spriteHeight);
		bomb.tokenID = 4;
		bomb.visible = false;

		var rt = newTokens[Math.round(newTokens.length / 2)];
		this.putToken(rt.tokenX, rt.tokenY, bomb);
	}
	//////////////////////////////
	
	

	var jumpToken2 = function(token) {
		return new Promise(function(resolve) {
		 	token.once("completed_all_tweens", function(token) {
				var tw = new Tween(token, {position: {y: [token.position.y, token.position.y - 6, token.position.y]}}, 100, { repeat: 1});
				tw.once("complete", function() {
					resolve();
				})
			});  
		})
	}

	for (var i = 0; i < data.length; i++) {
		var token = data[i].token;
		var simpleMoves = data[i].simpleMoves;
		var wrapMoves = data[i].wrapMoves;


		/* FIXME: УБРАТЬ ДОБАВЛЕНИЕ БОМБЫ ОТ СЮДА*/
		if (bomb && token.tokenX === bomb.tokenX && token.tokenY === bomb.tokenY) {
			bomb.position.set(token.x, token.y);
			bomb.visible = true;
			token = bomb;
		}
		//////////////////

		if (simpleMoves && simpleMoves.length > 0) {
			var endPoint = {
				x: simpleMoves[simpleMoves.length - 1].x * this.spriteWidth  + this.spriteWidth / 2,
				y: simpleMoves[simpleMoves.length - 1].y * this.spriteHeight  + this.spriteHeight / 2
			};

			// var startPoint = {
			// 	x: simpleMoves[0].x * this.spriteWidth  + this.spriteWidth / 2,
			// 	y: simpleMoves[0].y * this.spriteHeight  + this.spriteHeight / 2
			// };

			// token.position.set(startPoint.x, startPoint.y);

			var tw = new Tween(token, { position:endPoint }, simpleMoves.length * 40, {autoStart: false});
			token.chainTweens(tw);
			token.addTween(tw);
		}

		if (wrapMoves && wrapMoves.length > 0) {
			var endPoint = {
				x: wrapMoves[wrapMoves.length - 1].x * this.spriteWidth  + this.spriteWidth / 2,
				y: wrapMoves[wrapMoves.length - 1].y * this.spriteHeight  + this.spriteHeight / 2
			};

			// var startPoint = {
			// 	x: wrapMoves[0].x * this.spriteWidth  + this.spriteWidth / 2,
			// 	y: wrapMoves[0].y * this.spriteHeight  + this.spriteHeight / 2
			// };

			// token.position.set(startPoint.x, startPoint.y);

			var tw = new Tween(token, { position:endPoint }, wrapMoves.length * 30, {autoStart: false});
			token.chainTweens(tw);
			token.addTween(tw);
		}

		/*token.once("completed_all_tweens", function(token) {
			var tw = new Tween(token, {position: {y: [token.position.y, token.position.y - 6, token.position.y]}}, 1000, { repeat: 1});
			promises.push(jumpToken2(token));
		});*/

		promises.push(jumpToken2(token));
		tokens.push(token);
	}

	for(var i = 0; i < tokens.length; i++) {
		if (tokens[i].chainsTweens[0]) tokens[i].chainsTweens[0].start();
	}

	Promise.all(promises)
		.then((function() {
			this.emit("all_tokens_moved");
		}).bind(this));



	/* АСИХРОНЫЙ ЗАПУСК ТВИНОВ */
	/*var tweens = [];
	var tokens = [];

	e.testMoves.forEach((moves, index) => {
		var innerTws = [];

		moves.forEach(move => {
			var t = move.token;
			var ms = move.moves;

			var endPoint = {
				x: ms[ms.length - 1].x * this.spriteWidth  + this.spriteWidth / 2,
				y: ms[ms.length - 1].y * this.spriteHeight  + this.spriteHeight / 2
			};

			var tw = new Tween(t, { position: endPoint }, 120, { autoStart: false });
			innerTws.push(tw);

			t.addTween(tw);
			tokens.push(t);
		});
		tweens.push(innerTws);
	});*/
	/*var asyncRunTweens = function(tweens) {
		var ind = 0;
		
		var iter = function(tws) {
			if (!tws || tws.length <= 0) return;

			var count = tws.length;
			
			for (var i = 0; i < tws.length; i++) {
				tws[i].start();
				tws[i].once("complete", function() {
					
					count -= 1;
				
					if (count === 0) {
						ind += 1;
						iter(tweens[ind])
						return;
					}
				});
			}
		};

		iter(tweens[0]);
	};

	asyncRunTweens(tweens);*/
};

FieldGame.prototype.getIdDestroyedTokens = function() {
	return this.idSelectedTokens; 
};

FieldGame.prototype.saveNewToken = function(token) {
   var id = token.tokenID;
   if (id === 0) return;

   if (!this.newTokens[id]) this.newTokens[id] = []; 
   this.newTokens[id].push(token);
};

FieldGame.prototype.addBirds = function()  {
	var countTokens = 0;

	for(var key in this.newTokens) {
		countTokens += this.newTokens[key].length;
	}

	if (countTokens < CONFIG.application.birds.countMatches) {
		this.newTokens = {};
		return;
	}
	
	for (var key in this.newTokens) {
		var tokens = this.newTokens[key];
		var id = tokens[0].tokenID;

		if (CONFIG.application.birds.tokens[id] && 
			CONFIG.application.birds.tokens[id].isLocked) continue;

		var t = this.newTokens[key][Math.floor(this.newTokens[key].length / 2)];

		var bird = t.addChild(new Bird());
      bird.position.set(0/*20, 20*/);
      bird.on("bird_start_move", function(){this.emit("bird_start_move")}, this);

      this.birds.push(bird);

      t.bird = bird;
	}

	this.newTokens = {};
};

// FieldGame.prototype.addBomb = function(newTokens)  {
// 	//var newTokens = this.field.getNewTokens();
// 	// if (newTokens.length < CONFIG.application.bombs.countMatches) return;
	
// 	// var bomb = new Bomb("boosters/bomb/simple", this.spriteWidth, this.spriteHeight);
// 	// bomb.tokenID = 4;
// 	// console.log(bomb.position)
// 	// var rt = newTokens[Math.round(newTokens.length / 2)];
// 	// this.putToken(rt.tokenX, rt.tokenY, bomb);
// };


FieldGame.prototype.replacePositionBirds = function()  {
	this.birds.forEach(function(b) {
	   this.destroyedTokenContainer.addChild(b);
	   b.position.set(b.fieldPos.x, b.fieldPos.y);
	}, this);
	return Promise.resolve();
};

FieldGame.prototype.destroyTokenByBird = function(token) {
	 
};

/* TODO: FIEL ANIMATIONS*/
FieldGame.prototype.createSmoke = function(token, orientation) {
   var x = token.calcX(token.tokenX);
   var y = token.calcY(token.tokenY);
   var id = token.tokenID > 0 ? token.tokenID : this.idSelectedTokens;
   var tint = CONFIG.application.tokens_color[id];
	
	var smoke1 = this.tokenContainer.addChild(new Sprite.fromPattern("smoke/"));
	smoke1.loop = false;
	smoke1.animationSpeed = 0.24;
	smoke1.tint = tint;
   smoke1.position.set(x, y);

   smoke1.onComplete = function() {
	   this.destroy();
   };
   
   var smoke2 = this.tokenContainer.addChild(new Sprite.fromPattern("smoke/"));
   smoke2.scale.x = smoke2.scale.x * -1;
	smoke2.loop = false;
	smoke2.animationSpeed = 0.24;
	smoke2.tint = tint;
	smoke2.position.set(x, y);
   
   smoke2.onComplete = function() {
	   this.destroy();
   };
   
   var tw1 = new Tween(smoke1, {position: {x: smoke1.x - 40}}, 250, {});
   var tw2 = new Tween(smoke2, {position: {x: smoke2.x + 40}}, 250, {});
};

/* TODO: FIEL ANIMATIONS*/
FieldGame.prototype.createBurst = function(token) {
	var x = token.calcX(token.tokenX);
   var y = token.calcY(token.tokenY);
   var id = token.tokenID > 0 ? token.tokenID : this.idSelectedTokens;
   var tint = CONFIG.application.tokens_color[id];

	var burst = this.tokenContainer.addChild(new Sprite.fromPattern("animations/explosion"));
	burst.loop = false;
	burst.animationSpeed = 0.24;
	burst.tint = tint;
	burst.position.set(x, y);

	burst.onComplete = function() {
	   this.destroy();
	};
};

/* TODO: ПОФИКСИТЬ MOVE TO TARGET AND DESTROY*/
FieldGame.prototype.moveToTarget = function(tokens, targetFrom, targetTo, moveFrom, animFn) {
	var promises = [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		
      var moveTo = this.toLocal({x: 0, y: 0}, targetTo);
      moveTo.y -= 200;
      
      var mf = moveFrom[i];

      targetFrom = targetFrom ? targetFrom : token;

		token.setTargetPositions(moveTo, mf, targetTo, targetFrom);
	   
	   promises.push(animFn(token));
	}

	return Promise.all(promises);
};


FieldGame.prototype.destroySingleToken = function(token) {
	token.scale.set(0);
	token.alpha = 0;
	this.createSmoke(token);
	this.createBurst(token);
};

FieldGame.prototype.destroyBirdToken = function(birdToken, targetToken) {
	this._destroySingleToken(targetToken);
		
	var pos = {x: targetToken.calcX(targetToken.tokenX), y: targetToken.calcY(targetToken.tokenY)};
	var pos1 = {x: birdToken.calcX(birdToken.tokenX), y: birdToken.calcY(birdToken.tokenY)};

	birdToken.bird.setFieldPos(pos1);
	birdToken.bird.replaceContainer(this.destroyedTokenContainer);
	birdToken.bird.setTargetPos(pos);

	
	return new Promise((function(resolve, reject) {
	   birdToken.on('start_fly', function(token) {
			
		 	token.bird.move();
		 	token.bird.on("destroyed", function() {
		 	   this.destroySingleToken(targetToken);
		 	   new Timer(500).once('finish', function() {
	            resolve(); 
	         },this);

		 	   /* TODO: удаление птичек*/
		 	   var birds = this.birds.filter(function(b) {
		 	      return b !== birdToken.bird;
		 	   });

		 	   this.destroyedTokenContainer.removeChild(birdToken.bird);
		 	   birdToken.bird = null;

		 	   this.birds = birds;
		 	   ////////////////
	         
		 	},this);
		}, this);
	}).bind(this));
};


FieldGame.prototype.destroyTokens = function(tokens, hero, enemy) {
	
	var promises = [];
	var moveFrom = [];
	
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		tokens[i].index = i;

		moveFrom.push({x: token.x, y: token.y});

		this.destroyedTokenContainer.addChild(token);
	   this.destroyedTokens.push(token);

	   token.on('start_fly', this.createSmoke, this);
	   token.on('start_fly', this.createBurst, this);

	   /* TODO: НЕЗНАЮ */
	   if (token.bird) {
	   	var randomT = this.getRandomToken();

	   	if (randomT) {
	   		// this._destroySingleToken(randomT);
	   		
	   		// var pos = {x: randomT.calcX(randomT.tokenX), y: randomT.calcY(randomT.tokenY)};
	   		// token.bird.replaceContainer(this.destroyedTokenContainer);
	   		// token.bird.setTargetPos(pos);
	   		
	   		// var prom = new Promise((function(resolve, reject) {
	   		//    token.on('start_fly', function(token) {
		   			
		   	// 	 	token.bird.move();
		   	// 	 	token.bird.on("destroyed", function() {
		   	// 	 	   this.destroySingleToken(randomT);
		   	// 	 	   new Timer(500).once('finish', function() {
				  //           resolve(); 
				  //        },this)
		   		 	   
		   	// 	 	},this);
		   	// 	}, this);
	   		// }).bind(this));


	   		promises.push(this.destroyBirdToken(token, randomT));
	   	}
	   }
	   /////////////////


	}

	var p = this.moveToTarget(tokens, null, hero, moveFrom, FieldAnimations.flyTokenToHero)
		.then(function(moveFrom) {
         var target = {x: enemy.position.x, y: enemy.position.y};
			return hero.hitEnemy(target, moveFrom);
		})
		.then((function(moveFrom){
			return this.moveToTarget(tokens, hero, enemy, moveFrom, FieldAnimations.flyTokenToEnemy);
		}).bind(this))
      .then(function(){ return enemy.hit();})
		.then((function(){ 
			this.unDestroyTokens(tokens)
		}).bind(this));

	promises.push(p);

	return Promise.all(promises);
};
//////////////////////////

FieldGame.prototype.unDestroyTokens = function(tokens) {
	for (var i = 0; i < tokens.length; i++) {
		this.destroyedTokenContainer.removeChild(tokens[i]);
	}	
	this.destroyedTokens = [];
	return Promise.resolve();
};

FieldGame.prototype.addNewTokens = function() {
	this._moveTokens();
	return Promise.resolve();
};

FieldGame.prototype.endAction = function() {
	this.hideDarkCells();
};

FieldGame.prototype.selectFirstToken = function(matches) {
	var m = [];
	for (var i = 0; i < matches.length; i++) {
		m = m.concat(matches[i]);
	}
	
	this.showDarkCells();
	this.lightTokens(m);
};

FieldGame.prototype.lightTokens = function(tokens) {
	for (var y = 0; y < tokens.length; y++) {
		this.tokenContainer.addChild(tokens[y].token)
	}
};

FieldGame.prototype.hideDarkCells = function() {
	for (var y = 0; y < this.darkCells.length; y++) {
		for (var x = 0; x < this.darkCells[y].length; x++) {
			if (this.darkCells[y][x]) {
				this.darkCells[y][x].visible = false;
			}
		}
	}
};

FieldGame.prototype.showDarkCells = function(exceptions) {
	for (var y = 0; y < this.darkCells.length; y++) {
		for (var x = 0; x < this.darkCells[y].length; x++) {
			if (this.darkCells[y][x]) {
				this.tokenContainer.addChild(this.darkCells[y][x]);
				this.darkCells[y][x].visible = true;
			}
		}
	}
};

FieldGame.prototype.destroy = function() {
	this.userActionsLocked = true;
	this.removeAllListeners();
	/*var tw = new Tween(this, {scale: {x: 0, y: 0}}, 1200, {easing: TWEEN.Easing.Bounce.In});
	
	tw.once('start', function(obj) {
		obj.pivot.x = obj.spriteWidth * obj.cols / 2;
		obj.pivot.y = 0;
		obj.x = 0;
	});
	
	var pr = new Promise(function(resolve, reject) {
		tw.once("complete", function(obj) {
			resolve();
			obj.visible = false;
		});
	});*/
	return Promise.resolve();
};

FieldGame.prototype.updateTokenTarget = function() {
	for (var i = 0; i< this.destroyedTokens.length; i++) {
		
		var token = this.destroyedTokens[i];
		var posTo = this.toLocal({x:0, y:0}, token.position.targetTo);
		var posFrom = this.toLocal({x:0, y:0}, token.position.targetFrom);
		
		token.position.moveTo = {x: posTo.x, y: posTo.y - 200};
		token.position.moveFrom = {x: posFrom.x, y: posFrom.y};
	}
}




/* WORK WITH AUTOPLAY */
FieldGame.prototype.initAutoplay = function(moves) {
	var tokens = moves.map(function(m){return m.token});
	this.autoplayTokens = tokens;
	return Promise.resolve();
};

FieldGame.prototype.stopAutoplay = function() {
	this.autoplayTweens.forEach(function(t){t.stop()});
};

FieldGame.prototype.resetAutoplay = function() {
	this.autoplayTokens.forEach(function(token){
		token.scale.set(1);
		token.texture = new PIXI.Texture.fromFrame("items/simple/" + token.tokenID);
		token.texture.update();
	}, this);

	this.animatedLines.forEach(function(line){
		line.destroy();
	}, this);

	this.animatedLines = [];
	this.autoplayTokens = [];

	this.unPushTokens();
};

FieldGame.prototype.showDarkCellsAutoplay = function() {
	for (var y = 0; y < this.darkCells.length; y++) {
		for (var x = 0; x < this.darkCells[y].length; x++) {
			if (this.darkCells[y][x]) {
				this.tokenContainer.addChild(this.darkCells[y][x]);
				this.darkCells[y][x].visible = true;
			}
		}
	}
	return Promise.resolve();
};

FieldGame.prototype.hideDarkCellsAutoplay = function() {
	for (var y = 0; y < this.darkCells.length; y++) {
		for (var x = 0; x < this.darkCells[y].length; x++) {
			if (this.darkCells[y][x]) {
				this.darkCells[y][x].visible = false;
			}
		}
	}
	return Promise.resolve();
};

FieldGame.prototype.lightTokensAutoplay = function() {
	for (var i = 0; i < this.autoplayTokens.length; i++) {
		this.tokenContainer.addChild(this.autoplayTokens[i])
	}
};

FieldGame.prototype.selectTokensAutoplay = function() {
	var delay = CONFIG.application.autoplayDelayBetweenSelectingTokens;
	var promises = [];
	var tokens = [];

	var select = function(tween, ctx) {
		var pr = new Promise(function(resolve, reject) {
			tween.once('complete', function(token) {
				tokens.push(token);

				this.createLineAnim(token, tokens);
				this.emit("select_token", token);

				tokens.forEach(function(t) {this.tokenContainer.addChild(t)}, this);
				
				resolve(token);
			}, ctx);
			tween.once('stop', function() { reject(); });
		});

		return pr;
	};

	for(var i = 0; i < this.autoplayTokens.length; i++) {
		var tw = new Tween(this.autoplayTokens[i], {},0, {delay: delay * i});
		this.autoplayTweens.push(tw);
		promises.push(select(tw, this))
	}

	return Promise.all(promises);
};

FieldGame.prototype.destroyTokensAutoplay = function(tokens) {
	this._destroyTokens(tokens);
	return Promise.resolve();
};

/*==============*/


/*BOMB */
FieldGame.prototype.destroyBomb = function() {
   var promises = [];
   // FIXME:  
   for (var y = this.rows - 1; y >= 0; y--) {
		for (var x = 0; x < this.cols; x++) {
			var t = this.getToken(x, y);
			if (t && t.isBomb && t.isBomb() && t.isCanDestroy()) {
            
            this.destroyTokenTest(t);
			}
		}
	}
   // FIXME:  
   for (y = 0; y < this.rows; y++) {
		for (x = 0; x < this.cols; x++) {
         t = this.field[y][x];

         if (!t ||  !t.inDestroy) continue;

         if (t && t.bird) {
            var randomT = this.getRandomToken();
            if (randomT) {
               promises.push(this.destroyBirdTokenBomb(t, randomT))
            }
            promises.push(t.destroyB(this.particles));
            
         }
         else  {
            promises.push(t.destroyB(this.particles));
         }
   
         //t.inDestroy = true;
         t.tokenID = 0;
			// if (t &&  t.inDestroy) {
         //    promises.push(t.destroyB(this.particles));

         //    // FIXME:  
         //    t.tokenID = 0;
         //    //////////
         // }
		}
   }

   if (promises.length <= 0) return Promise.reject();
   else return Promise.all(promises);

   // NOTE:  all methods
	// var promises = [];
	// for (var y = this.rows - 1; y >= 0; y--) {
	// 	//console.log(y)
	// 	for (var x = 0; x < this.cols; x++) {
	// 		var t = this.getToken(x, y);
			

	// 		if (t && t.isBomb && t.isBomb() && t.isCanDestroy()) {
	// 			var bombs = t.getDestroyTokens(t);
	// 			bombs.push(t);
	// 			promises.push(this.destroyBombs(bombs));
	// 		}
			
	// 	}
	// }

	// if (promises.length <= 0) return Promise.reject();

	// return Promise.all(promises);
};

// FieldGame.prototype.destroyBombs = function(bombs) {
// 	var promises = [];

// 	bombs.forEach(function(b) {
// 		if (b.bird) {
// 			var randomT = this.getRandomToken();
// 			if (randomT) {
// 				promises.push(this.destroyBirdTokenBomb(b, randomT))
// 			}
// 			promises.push(b.destroyB(this.particles));
			
// 		}
// 		else if (b.destroyB) {
// 			promises.push(b.destroyB(this.particles));
// 		}

// 		b.inDestroy = true;
// 		b.tokenID = 0;
// 	}, this);

// 	return Promise.all(promises);
// };

FieldGame.prototype.destroyBirdTokenBomb = function(birdToken, targetToken) {

	this._destroySingleToken(targetToken);
		
	var pos = {x: targetToken.calcX(targetToken.tokenX), y: targetToken.calcY(targetToken.tokenY)};
	var pos1 = {x: birdToken.calcX(birdToken.tokenX), y: birdToken.calcY(birdToken.tokenY)};

	birdToken.bird.setFieldPos(pos1);
	birdToken.bird.replaceContainer(this.destroyedTokenContainer);
	birdToken.bird.setTargetPos(pos);

	return new Promise((function(resolve, reject) {
			
		 	birdToken.bird.move();
		 	birdToken.bird.on("destroyed", function() {

		 	   this.destroySingleToken(targetToken);
		 	   new Timer(500).once('finish', function() {
	            resolve(); 
	         },this);

		 	   /* NOTE: удаление птичек*/
		 	   var birds = this.birds.filter(function(b) {
		 	      return b !== birdToken.bird;
		 	   });

		 	   this.destroyedTokenContainer.removeChild(birdToken.bird);
		 	   birdToken.bird = null;

		 	   this.birds = birds;


		 	   ////////////////
	         
		 	},this);
	}).bind(this));
};

FieldGame.prototype.destroySingleBomb = function(t) {

	var tw = new Tween(t, {scale: {x: 0, y: 0}}, 250, {});
	return tw;
};


FieldGame.prototype.onResize = function(options) {
	var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   var maxW = options.width;
   var maxH = options.height;

   var fieldW = this.spriteWidth * this.cols;
	var fieldH = this.spriteHeight * this.rows;

	this.fieldMask.width = fieldW;
	this.fieldMask.height = fieldH;

	if (land) {
		var fieldOptions = Utils.fitLayout(maxW, maxH, fieldW, fieldH);
		this.scale.set(fieldOptions.scale);

		var fx = -gw * 0.25 - fieldW * 0.5 * fieldOptions.scale;
		var fy = - fieldH * 0.5 * fieldOptions.scale - fieldH / this.rows / 3 * fieldOptions.scale * 0.5;
		this.position.set(fx, fy);
	}
	else {
		var fieldOptions = Utils.fitLayout(maxW, maxH, fieldW, fieldH);
		var fx = -fieldW * 0.5 * fieldOptions.scale;
		var fy = gh * 0.5 - fieldH * fieldOptions.scale - fieldH / this.rows / 3 * fieldOptions.scale;

		this.scale.set(fieldOptions.scale);
		this.position.set(fx, fy);
	}
};


FieldGame.prototype.tick = function(delta) {
	for(var i = 0; i < this.birds.length; i++) {
	   this.birds[i].tick(delta);
	}

	for(var i = 0; i < this.particles.length; i++) {
	   this.particles[i].update(delta);
	}
};