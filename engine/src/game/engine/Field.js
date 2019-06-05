function Field() {
   Sprite.call(this);

   this.gravity = { x: 0, y: 1 };

   this.cols = 6;
   this.rows = 6;

   this.spriteWidth = 100;
   this.spriteHeight = 100;

   this.userActionsLocked = false;
   this.paused = false;

   this._selectedToken = null;
   this._selectedTokens = [];

   this.globalBannedList = [];

   this.tokenTypes = [
      { bitmap: null, color: 0x000000, locked: true, obstacle: false },
      { bitmap: null, color: 0xff0000, locked: false, obstacle: false },
      { bitmap: null, color: 0x993300, locked: false, obstacle: false },
      { bitmap: null, color: 0xffff00, locked: false, obstacle: false },
      { bitmap: null, color: 0x00ff00, locked: false, obstacle: false },
      { bitmap: null, color: 0x0000ff, locked: false, obstacle: false },
      { bitmap: null, color: 0xff00ff, locked: false, obstacle: false },
      { bitmap: null, color: 0xffffff, locked: false, obstacle: false }
   ];

   this.field = [];
   this.lockedCells = [];
   this.addedNewTokens = [];

   this.linesX = [];
   this.linesY = [];

   this.tokenClass = Token;
   this.tokenContainer = null;

   this._selectToken = this._selectToken.bind(this);
   this._drag = this._drag.bind(this);
   this._endDrag = this._endDrag.bind(this);

   this.interactive = true;
   this.on("pointerdown", this._selectToken);
   this.on("pointermove", this._drag);
   this.on("pointerup", this._endDrag);
   this.on("pointerupoutside", this._endDrag);
}

Field.prototype = Object.create(Sprite.prototype);

Field.prototype.init = function (options) {
   if (options) {
      if (options.cols) this.cols = options.cols;
      if (options.rows) this.rows = options.rows;
      if (options.spriteWidth) this.spriteWidth = options.spriteWidth;
      if (options.spriteHeight) this.spriteHeight = options.spriteHeight;
      if (options.lockedCells) this.lockedCells = options.lockedCells;
      if (options.tokenTypes) this.tokenTypes = options.tokenTypes;
      if (options.tokenClass) this.tokenClass = options.tokenClass;
      if (options.gravity) this.gravity = options.gravity;
      if (options.tokenContainer) this.tokenContainer = options.tokenContainer;
   }

   if ((this.gravity.x !== 0 && this.gravity.y !== 0) ||
      (this.gravity.x === 0 && this.gravity.y === 0)) {
      throw Error("Incorrect gravity", this.gravity);
   }

   for (var y = 0; y < this.rows; y++) {
      if (!this.lockedCells[y]) this.lockedCells[y] = [];
   }
};

Field.prototype.createField = function (bannedList) {
   this._clearField();

   for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {
         var token = this.getToken(x, y);

         if (token && this.tokenTypes[token.tokenID] && this.tokenTypes[token.tokenID].obstacle) {
            continue;
         }
         this._addRandomToken(x, y, true, bannedList);
      }
   }
};

Field.prototype.addToken = function (x, y, id) {
   var token = new this.tokenClass(this.tokenTypes[id].bitmap, this.spriteWidth, this.spriteHeight);

   if (!this.tokenTypes[id].bitmap && (typeof this.tokenTypes[id].color !== 'undefined')) {
      var g = token.addChild(new PIXI.Graphics());
      g.beginFill(this.tokenTypes[id].color, 1);
      g.drawRect(-this.spriteWidth / 2 + 3, -this.spriteHeight / 2 + 3, this.spriteWidth - 6, this.spriteHeight - 6);
      g.endFill();
   }

   token.tokenID = id;

   return this.putToken(x, y, token);
};

Field.prototype.removeToken = function (token, parent) {
   if (!token) throw new Error('Such token is not found');

   if (this.tokenContainer) this.tokenContainer.removeChild(token);
   else this.removeChild(token);
};

Field.prototype.putToken = function (x, y, token) {
   if (this.field[y][x]) {
      this.removeToken(this.field[y][x]);
   }

   token.x = token.calcX(x);
   token.y = token.calcY(y);

   token.tokenX = x;
   token.tokenY = y;

   if (this.tokenContainer) this.tokenContainer.addChild(token);
   else this.addChild(token);

   this.field[y][x] = token;

   return token;
};

Field.prototype.getToken = function (x, y) {
   if (!this.field[y]) return null;
   if (!this.field[y][x]) return null;
   if (this.lockedCells[y][x]) return null;

   var token = this.field[y][x];

   if (!token) return null;
   if (token.tokenID === 0) return null;
   return token;
};

Field.prototype.getRandomToken = function () {
   for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {
         var t = this.getToken(x, y);
         if (t && !t.bird && !this.tokenTypes[t.tokenID].locked) return t;
      }
   }
   return null;
};

Field.prototype.getSelectedTokens = function () {
   return this._selectedTokens;
};



Field.prototype._clearField = function () {
   for (var y = 0; y < this.rows; y++) {
      if (!this.field[y]) this.field[y] = [];

      for (var x = 0; x < this.cols; x++) {
         var token = this.getToken(x, y);
         if (token && this.tokenTypes[token.tokenID] && this.tokenTypes[token.tokenID].obstacle) {
            continue;
         }

         if (this.field[y][x]) {
            this.removeChild(this.field[y][x]);
         }
         this.addToken(x, y, 0);
      }
   }
};

Field.prototype._addRandomToken = function (x, y, noMatch, bannedList) {
   if (this.lockedCells[y] && this.lockedCells[y][x]) return null;

   var id = 0;
   var ok = true;

   while (ok) {
      ok = false;

      id = Math.floor(Math.random() * this.tokenTypes.length);

      if (this.tokenTypes[id].locked) ok = true;

      if (bannedList && bannedList.indexOf(id) >= 0) ok = true;
   }

   return this.addToken(x, y, id);
};



Field.prototype._selectToken = function (e, obj) {
   if (this.userActionsLocked || this.paused) return;

   if (!obj && e && !this.userActionsLocked) {
      var pos = e.data.getLocalPosition(this);
      var x = Math.floor(pos.x / this.spriteWidth);
      var y = Math.floor(pos.y / this.spriteHeight);
      obj = this.field[y][x];
   }

   if (!obj) return;
   if (this.tokenTypes[obj.tokenID].locked) return;
   if (obj === this._selectedToken) return;
   if (this.paused || obj.inDestroy || (this.tokenTypes[obj.tokenID] && this.tokenTypes[obj.tokenID].obstacle)) return;

   this.emit("user_action");

   if (!this._selectedToken) {
      obj.selected = true;
      this._selectedTokens.push(obj);
      this._selectedToken = obj;


      if (this._selectedTokens.length === 1) {
         var matches = this.getMatchesByToken(obj);
         this.emit("all_possible_matches", matches);
      }

      this.emit("select_token", {token: obj});
      return;
   }

   if (obj.selected) {
      this._unselectLastToken(obj);
      return;
   }

   if (this._selectedToken) {
      if ((Math.abs(obj.tokenX - this._selectedToken.tokenX) == 1 && Math.abs(obj.tokenY - this._selectedToken.tokenY) == 0) ||
         (Math.abs(obj.tokenX - this._selectedToken.tokenX) == 0 && Math.abs(obj.tokenY - this._selectedToken.tokenY) == 1) ||
         (Math.abs(obj.tokenX - this._selectedToken.tokenX) == 1 && Math.abs(obj.tokenY - this._selectedToken.tokenY) == 1)) {

         if (obj.tokenID === this._selectedToken.tokenID) {
            obj.selected = true;
            this._selectedTokens.push(obj);
            this._selectedToken = obj;
            this.emit("select_token", {token: obj});
         }
         return;
      }
   }
};

Field.prototype._drag = function (e) {
   if (this.userActionsLocked || this.paused) return;

   var pos = e.data.getLocalPosition(this);
   var x = Math.floor(pos.x / this.spriteWidth);
   var y = Math.floor(pos.y / this.spriteHeight);
   obj = this.field[y] && this.field[y][x];

   if (obj && !obj.obstacle) this._selectToken(null, obj);

   this.emit("user_action");
};

Field.prototype._endDrag = function (e) {
   if (this.userActionsLocked || this.paused) return;

   for (var i = 0; i < this._selectedTokens.length; i++) {
      this._selectedTokens[i].selected = false;
      this._selectedTokens[i].indexInStack = -1;
      this._selectedTokens[i].scale.set(1)
   }

   if (this._selectedTokens.length >= 3) {
      this._destroyTokens(this._selectedTokens);
   }
   else {
      this._unSelectTokens(this._selectedTokens);
   }

   this._selectedTokens = [];
   this._selectedToken = null;

   this.emit("end_action");
   this.emit("user_action")
};

Field.prototype._unselectLastToken = function (token) {
   if (this._selectedTokens[this._selectedTokens.length - 2] === token) {
      var removedToken = this._selectedTokens.pop();

      if (this._selectedTokens.length > 0) {
         this._selectedToken = this._selectedTokens[this._selectedTokens.length - 1];
      }
      else {
         this._selectedToken = null;
      }

      this._unSelectTokens([removedToken]);
   }
};

Field.prototype._unSelectTokens = function (tokens) {
   for (var i = 0; i < tokens.length; i++) {
      tokens[i].selected = false;
      this.emit('unselect_token', {token: tokens[i]});
   }
};

Field.prototype._destroyTokens = function (tokens) {
   var id = tokens[0].tokenID;

   for (var i = 0; i < tokens.length; i++) {
      tokens[i].inDestroy = true;
      this._destroySingleToken(tokens[i]);
   }
   this.emit('destroy_tokens', { tokens: tokens.slice(), id: id });
};

Field.prototype._destroySingleToken = function (obj) {
   this.emit("destroy_token", {token: obj});

   if (obj.onDestroy) obj.onDestroy();

   obj.selected = false;
   obj.tokenID = 0;
   obj.inDestroy = false;
};

Field.prototype.destroyTokenTest = function (obj) {
   obj.inDestroy = true;
   if (obj.onDestroy) obj.onDestroy();
};

Field.prototype._swapTokens = function (t1, t2) {
   var x1 = t1.tokenX * 1;
   var y1 = t1.tokenY * 1;
   var x2 = t2.tokenX * 1;
   var y2 = t2.tokenY * 1;

   var tmp1 = this.field[y1][x1];
   var tmp2 = this.field[y2][x2];

   this.field[y1][x1] = tmp2;
   this.field[y2][x2] = tmp1;

   this.field[y1][x1].tokenX = x1;
   this.field[y1][x1].tokenY = y1;

   this.field[y2][x2].tokenX = x2;
   this.field[y2][x2].tokenY = y2;
};

Field.prototype._isWrapToken = function (token) {
   if (!token) return false;
   if (token.tokenID === 0) return false;
   if (this.lockedCells[token.tokenY][token.tokenX]) return false;
   if (this.tokenTypes[token.tokenID] && this.tokenTypes[token.tokenID].obstacle) return false;
   return true;
};

Field.prototype._getWrapToken = function (token) {
   var t2;

   if (this.gravity.y !== 0) {
      t2 = this.getToken(token.tokenX - 1, token.tokenY - this.gravity.y);
      if (this._isWrapToken(t2)) return t2;

      t2 = this.getToken(token.tokenX + 1, token.tokenY - this.gravity.y);
      if (this._isWrapToken(t2)) return t2;
   }

   if (this.gravity.x !== 0) {
      t2 = this.getToken(token.tokenX - this.gravity.x, token.tokenY - 1);
      if (this._isWrapToken(t2)) return t2;

      t2 = this.getToken(token.tokenX - this.gravity.x, token.tokenY + 1);
      if (this._isWrapToken(t2)) return t2;
   }

   return null;
};

Field.prototype._isButtress = function (token) {
   if (!token) return true;
   if (token.tokenID > 0) return true;
   if (this.tokenTypes[token.tokenID] && this.tokenTypes[token.tokenID].obstacle) return true;
   if (this.lockedCells[token.tokenY][token.tokenX]) return true;
   return false;
};

Field.prototype._moveSimpleTokens = function () {
   var f, fs, ok = true;

   var startX = 0, endX = this.cols, startY = 0, endY = this.rows;

   if (this.gravity.x > 0) startX = 1;
   if (this.gravity.x < 0) endX = this.cols - 1;
   if (this.gravity.y > 0) startY = 1;
   if (this.gravity.y < 0) endY = this.rows - 1;

   while (ok) {
      ok = false;

      for (y = startY; y < endY; y++) {
         for (x = startX; x < endX; x++) {
            f = this.field[y][x];
            fs = this.field[y + -this.gravity.y][x + -this.gravity.x];

            if (f.tokenID === 0 && !f.obstacle && !this.lockedCells[y][x] &&
               fs.tokenID > 0 && (this.tokenTypes[fs.tokenID] &&
                  !this.tokenTypes[fs.tokenID].obstacle) &&
               !this.lockedCells[y][x]) {

               if (fs.moves.length === 0) {
                  fs.moves.push({ unikID: fs.unikID, x: fs.tokenX, y: fs.tokenY, type: "straight" });
               }
               fs.moves.push({ unikID: fs.unikID, x: x, y: y, type: "straight" });


               /*FOR ALL*/
               if (fs.allMoves.length === 0) {
                  fs.allMoves.push({ unikID: fs.unikID, x: fs.tokenX, y: fs.tokenY, type: "straight" });
               }
               fs.allMoves.push({ unikID: fs.unikID, x: x, y: y, type: "straight" });
               ///////////

               this._swapTokens(f, fs);
               ok = true;
            }
         }
      }
   }
};

Field.prototype._moveWrapTokens = function () {

   var f, fs, ok = true;

   var startX = 0, endX = this.cols, startY = 0, endY = this.rows;

   if (this.gravity.x > 0) startX = 1;
   if (this.gravity.x < 0) endX = this.cols - 1;
   if (this.gravity.y > 0) startY = 1;
   if (this.gravity.y < 0) endY = this.rows - 1;

   //while(ok) {
   // ok = false;

   for (y = startY; y < endY; y++) {
      for (x = startX; x < endX; x++) {

         f = this.field[y][x];
         fs = this.field[y + this.gravity.y] && this.field[y + this.gravity.y][x + this.gravity.x];

         if (f.tokenID === 0 && !f.obstacle && !this.lockedCells[y][x] && this._isButtress(fs)) {

            var fw = this._getWrapToken(f);

            if (fw) {

               if (this.linesY[fw.tokenX] > 0) {
                  this.linesY[fw.tokenX] += 1
               }

               if (fw.wrapMoves.length === 0) {
                  fw.wrapMoves.push({ unikID: fw.unikID, x: fw.tokenX, y: fw.tokenY, type: "wrap" });
               }
               fw.wrapMoves.push({ unikID: fw.unikID, x: x, y: y, type: "wrap" });


               /*FOR ALL */
               if (fw.allMoves.length === 0) {
                  fw.allMoves.push({ unikID: fw.unikID, x: fw.tokenX, y: fw.tokenY, type: "wrap" });
               }
               fw.allMoves.push({ unikID: fw.unikID, x: x, y: y, type: "wrap" });
               ///////////////

               this._swapTokens(f, fw);

               //ok = true;
            }

         }
      }
   }
   //}
};

Field.prototype._addNewToken = function (x, y, lenX, lenY) {
   var f = this._addRandomToken(x, y, false, this.globalBannedList);

   if (!f) return null;

   if (this.gravity.x != 0) {
      var toX = f.x;

      if (this.gravity.x > 0) f.x = -lenX * this.spriteWidth + f.x;
      else f.x = this.width + lenX * this.spriteWidth - (this.width - f.x);

      var x = Math.floor(f.x / this.spriteWidth);
      var y = Math.floor(f.y / this.spriteHeight);

      var moves = [];
      var all = [];
      for (var i = 1; i <= lenX; i++) {
         moves.push({ x: x + i, y: y, type: "straight" });
         all.push({ x: x, y: y + i, type: "straight" })
      }
      f.moves = f.moves.concat(moves);
      f.allMoves = all;
   }

   if (this.gravity.y != 0) {
      var toY = f.y;

      if (this.gravity.y > 0) f.y = -lenY * this.spriteHeight + f.y;
      else f.y = this.height + lenY * this.spriteHeight - (this.height - f.y);

      var x = Math.floor(f.x / this.spriteWidth);
      var y = Math.floor(f.y / this.spriteHeight);

      var moves = [];

      /*FOR ALL*/
      var all = [];
      ///////////

      for (var i = 0; i <= lenY; i++) {
         moves.push({ unikID: f.unikID, x: x, y: y + i, type: "straight" });

         /*FOR ALL*/
         all.push({ unikID: f.unikID, x: x, y: y + i, type: "straight" });
         ///////
      }
      f.moves = f.moves.concat(moves);

      /*FOR ALL*/
      f.allMoves = all;
      //////////
   }
   this.addedNewTokens.push(f);
   this.emit("created_new_token", f);
};

Field.prototype._addNewTokens = function () {
   var linesX = [], linesY = [], f;
   var isAdded = false;

   if (this.gravity.x != 0) {
      for (var y = 0; y < this.rows; y++) {
         linesX[y] = 0;
         if (typeof this.linesX[y] === 'undefined') this.linesX[y] = 0;

         if (this.gravity.x < 0) {
            for (var x = this.cols - 1; x >= 0; x--) {
               f = this.field[y][x];
               if (f.tokenID == 0 && !f.moved) {
                  linesX[y]++;
                  this.linesX[y]++;
               }
               else break;
            }
         }
         else {
            for (x = 0; x < this.cols; x++) {
               f = this.field[y][x];
               if (f.tokenID == 0 && !f.moved) {
                  linesX[y]++;
                  this.linesX[y]++;
               }
               else break;
            }
         }
      }

      for (y = 0; y < this.rows; y++) {
         if (linesX[y] > 0) {
            for (x = 0; x < linesX[y]; x++) {
               isAdded = true;
               this._addNewToken((this.gravity.x < 0 ? this.cols - x - 1 : x), y, this.linesX[y], 0);
            }
         }
      }
   }

   if (this.gravity.y != 0) {
      for (x = 0; x < this.cols; x++) {
         linesY[x] = 0;
         if (typeof this.linesY[x] === 'undefined') this.linesY[x] = 0;

         if (this.gravity.y < 0) {
            for (y = this.rows - 1; y >= 0; y--) {
               f = this.field[y][x];
               if (f.tokenID == 0 && !f.moved) {
                  linesY[x]++;
                  this.linesY[x]++;
               }
               else break;
            }
         }
         else {
            for (y = 0; y < this.rows; y++) {
               f = this.field[y][x];

               if (f.tokenID == 0 && !f.moved) {
                  linesY[x]++;
                  this.linesY[x]++;
               }
               else break;
            }
         }

      }

      for (x = 0; x < this.cols; x++) {
         if (linesY[x] > 0) {
            for (y = 0; y < linesY[x]; y++) {
               isAdded = true;
               this._addNewToken(x, (this.gravity.y < 0 ? this.rows - y - 1 : y), 0, this.linesY[x]);
            }
         }
      }
   }

   /*if (isAdded) this.emit("add_new_tokens");*/
};

// TODO : ОТРЕФАКТОРИТЬ
Field.prototype._moveTokens = function () {
   var ok = true;
   var newMoves = [];
   var testM = [];

   while (ok) {
      this._moveSimpleTokens();
      this._addNewTokens();

      /*NEW */
      var moves = this._getMoves();
      if (moves.length > 0) {
         var ms = [];

         var res = moves.forEach(function (move) {
            ms.push({ token: move.token, moves: Utils.cloneArray(move.simpleMoves) });
            newMoves/*ms*/.push({
               token: move.token,
               simpleMoves: Utils.cloneArray(move.simpleMoves),
               wrapMoves: Utils.cloneArray(move.wrapMoves),
               moves: Utils.cloneArray(move.simpleMoves)
            });
         });
         testM.push(ms);
         //newMoves.push(ms);
         for (var y = 0; y < this.rows; y++) {
            for (var x = 0; x < this.cols; x++) {
               if (this.field[y] && this.field[y][x]) {
                  this.field[y][x].moves = [];
                  this.field[y][x].wrapMoves = [];
                  this.field[y][x].allMoves = [];
               }
            }
         }
      }
      //////


      this._moveWrapTokens();

      /*NEW */
      var moves = this._getMoves();
      if (moves.length > 0) {
         var ms = [];
         var res = moves.forEach(function (move) {
            ms.push({ token: move.token, moves: Utils.cloneArray(move.wrapMoves) });

            newMoves/*ms*/.push({
               token: move.token,
               simpleMoves: Utils.cloneArray(move.simpleMoves),
               wrapMoves: Utils.cloneArray(move.wrapMoves),
               moves: Utils.cloneArray(move.wrapMoves)
            });
         });
         testM.push(ms);
         // newMoves.push(ms);
         for (var y = 0; y < this.rows; y++) {
            for (var x = 0; x < this.cols; x++) {
               if (this.field[y] && this.field[y][x]) {
                  this.field[y][x].moves = [];
                  this.field[y][x].wrapMoves = [];
                  this.field[y][x].allMoves = [];
               }
            }
         }
      }
      ////////////



      ok = !this._fieldIsFilled();
   }

   /*FOR ALL */
   /*var sorted = this.sortMoves();
   this.emit("move_tokens", sorted);
   this._unMoveTokens();*/



   /*OLD */
   /*var moves = this._getMoves();
   if (moves.length > 0) {
       this.emit("move_tokens", newMoves);
       this._unMoveTokens();
   }*/
   //console.log(newMoves)

   // newMoves.forEach((item,  i) => {
   //     if (item.token.tokenID === 2) {
   //         console.log("index", i)
   //         console.log("item", item)
   //     }
   // })

   this.emit("all_tokens_created", Utils.cloneArray(this.addedNewTokens));

   this.emit("move_tokens", { data: newMoves, testMoves: testM, newTokens: Utils.cloneArray(this.addedNewTokens) });

   this.linesX = [];
   this.linesY = [];
   this.addedNewTokens = [];

};

/*FOR ALL */
/*Field.prototype.sortMoves = function() {
    var allMoves = this._getMoves();

    var mapedMoves = allMoves.map(function(item) {
        return { token: item.token, moves: item.all.slice() };
    });

    var result = [];

    for (var i = 0; i < mapedMoves.length; i++) {
        result.push(
            {
                moves: this.splitMoves(mapedMoves[i].moves, mapedMoves[i].token), 
                token: mapedMoves[i].token 
            }
        );
    }
    console.log(result)
    return result;
};

Field.prototype.splitMoves = function(moves, token) {
    if (!moves || moves.length <= 0) return moves;

    var type = moves[0].type;

    var splited = [];
    var sorted = [];

    for (var i = 0; i < moves.length; i++) {
        
        moves[i].type = type;

        switch(type) {
            case "straight":
                sorted.push(moves[i]);

                if (moves[i + 1] && moves[i + 1].type !== "straight") {
                    splited.push(Utils.cloneArray(sorted));
                    sorted = [];

                    type = moves[i + 1].type;
                    i -= 1;
                }

                if (i + 1 >= moves.length) splited.push(sorted);

                break;

            case "wrap":
                sorted.push(moves[i]);

                if (moves[i + 1] && moves[i + 1].type !== "wrap") {
                    splited.push(Utils.cloneArray(sorted));
                    sorted = [];

                    type = moves[i + 1].type;
                    i -= 1;
                }

                if (i + 1 >= moves.length) splited.push(sorted);

                break;
            default:
                throw new Error('Unexpected type ' + type);
        }
    }
    return splited;
};*/

Field.prototype._unMoveTokens = function (e) {
   for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {
         if (this.field[y] && this.field[y][x]) {
            this.field[y][x].moves = [];
            this.field[y][x].wrapMoves = [];
            this.field[y][x].allMoves = [];
         }
      }
   }

   this.linesX = [];
   this.linesY = [];
};


Field.prototype._getMoves = function () {
   var moves = [];

   for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {
         if (this.field[y] && this.field[y][x]) {
            var sm = [];
            var wm = [];
            var all = [];

            if (this.field[y][x].moves && this.field[y][x].moves.length > 0) {
               sm = Utils.cloneArray(this.field[y][x].moves);
            }

            if (this.field[y][x].wrapMoves && this.field[y][x].wrapMoves.length > 0) {
               wm = Utils.cloneArray(this.field[y][x].wrapMoves);
            }

            if (this.field[y][x].allMoves && this.field[y][x].allMoves.length > 0) {
               all = Utils.cloneArray(this.field[y][x].allMoves);
            }

            if (sm.length > 0 || wm.length > 0) {
               moves.push({
                  token: this.field[y][x],
                  simpleMoves: sm,
                  wrapMoves: wm,
                  all: all
               });
            }
         }
      }
   }
   return moves;
};

Field.prototype._fieldIsFilled = function () {
   for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {
         if (this.field[y] && this.field[y][x] && this.field[y][x].tokenID === 0 &&
            !this.lockedCells[y][x] && !this.field[y][x].obstacle) {
            return false;
         }
      }
   }
   return true;
};

Field.prototype.checkMoves = function (token, acc, moves) {
   var directs = [
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 }
   ];

   var isEnd = true;
   var newAcc = acc.concat([{ token: token, x: token.tokenX, y: token.tokenY, id: token.tokenID }]);

   token.checked = true;

   for (var i = 0; i < directs.length; i++) {

      var x = token.tokenX + directs[i].x;
      var y = token.tokenY + directs[i].y;
      var currentToken = this.getToken(x, y)

      if (currentToken && !currentToken.obstacle &&
         currentToken.tokenID === token.tokenID &&
         !currentToken.checked) {

         isEnd = false;

         this.checkMoves(currentToken, newAcc, moves);
      }

   }
   if (isEnd) {
      moves.push(newAcc);
   }
}

Field.prototype.getPossibleMoves = function () {
   var allMoves = [];

   for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {

         var token = this.getToken(x, y)

         if (token && !token.obstacle) {
            var moves = [];

            this.checkMoves(token, [], moves);

            for (var n = 0; n < moves.length; n++) {
               if (moves[n].length >= 3) allMoves.push(moves[n]);

               for (var j = 0; j < moves[n].length; j++) {
                  moves[n][j].token.checked = false;
               }
            }
         }
      }
   }

   return allMoves;
};

Field.prototype.getMatchesByToken = function (token) {
   if (!token) throw new Error('Token is not found');

   var allMoves = [];
   var moves = [];

   this.checkMoves(token, [], moves);

   for (var n = 0; n < moves.length; n++) {
      allMoves.push(moves[n]);
      for (var j = 0; j < moves[n].length; j++) {
         moves[n][j].token.checked = false;
      }
   }
   return allMoves;
};