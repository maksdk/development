var CONFIG = {
   "androidUrl": "",
   "appleUrl": "",
   "amazonUrl": "",
   "I18": {
      "locale": "en",
      "strings": {
         "You Won!": {
            "en": "You Won!",
         },
         "DOWNLOAD": {
            "en": "DOWNLOAD"
         }
      }
   },
   "application": {
      "delayOutro": 5000,
      "enemies": [
            /* Enemy 1 */ { "isLocked": false, "lifespan": 10, "scale": 0.5, "pos": { "x": 0, "y": -30 } /* count of tokens. min: 3 */ },
            /* Enemy 2 */ { "isLocked": false, "lifespan": 10, "scale": 0.6, "pos": { "x": 0, "y": -20 } /* count of tokens. min: 3 */ },
            /* Enemy 3 */ { "isLocked": false, "lifespan": 10, "scale": 0.7, "pos": { "x": 0, "y": -10 } /* count of tokens. min: 3 */ },
            /* Enemy 4 */ { "isLocked": true, "lifespan": 10, "scale": 0.8, "pos": { "x": 0, "y": 0 } /* count of tokens. min: 3 */ },
            /* Enemy 5 */ { "isLocked": true, "lifespan": 10, "scale": 0.8, "pos": { "x": 0, "y": 0 } /* count of tokens. min: 3 */ }
      ],


      /*options for birds*/
      "birds": {
         /* new bird is added after 7 matches*/
         "countMatches": 7,
         "tokens": [
            null,
                /* yellow */  { "isLocked": false },
                /* red */     { "isLocked": false },
                /* green */   { "isLocked": false }
         ]
      },

      /*options for bombs*/
      "bombs": {
         /* new bomb is added after 7 matches*/
         "countMatches": 7
      },

      "autoplay": false,
      "autoplayDelay": 10000,
      "autoplayDelayStep": 2000,
      "autoplayDelayBetweenSelectingTokens": 300,

      "hintDelay": 3000,

      "spriteWidth": 100,
      "spriteHeight": 100,
      "cols": 7,
      "rows": 7,
      "defaultField": [
         [0, 0, 1, 2, 3, 0, 0],
         [0, 2, 2, 3, 3, 2, 0],
         [3, 2, 1, 1, 3, 1, 0],
         [2, 2, 3, 3, 1, 3, 3],
         [3, 1, 2, 1, 3, 2, 2],
         [2, 3, 2, 3, 3, 3, 3],
         [0, 3, 1, 0, 1, 3, 0]
      ],
      "lockedCells": [
         [1, 1, 0, 0, 0, 1, 1],
         [1, 0, 0, 0, 0, 0, 1],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [1, 0, 0, 1, 0, 0, 1]
      ],
      "tokens_color": {
         0: 0xFFFFFF, /* white */
         1: 0xffec06, /* yellow */
         2: 0xfc2605, /* red */
         3: 0x00fc14, /* green */
         4: 0xfa8a08 /* bomb */
      },
      "styles": [

      ],
      "showFPS": false,
      "skipOutro": false
   },
   "TEXTS": {
      "LIFE_BAR_NUMBER": {
         "text": "0",
         "style": {
            "fontFamily": "Rubik-Bold",
            "align": "center",
            "fill": 0xFFFFFF,
            "fontSize": 40
         }
      },
      "OUTRO_CARD_TITLE": {
         "text": "You Won!",
         "style": {
            "fontFamily": "Rubik-Bold",
            "align": "center",
            "fill": 0xFFFFFF,
            "fontSize": 40
         }
      },
      "DOWNLOAD": {
         "text": "DOWNLOAD",
         "style": {
            "fontFamily": "Rubik-Bold",
            "align": "center",
            "fill": 0xFFFFFF,
            "fontSize": 40
         }
      },
      "MESSAGES": [
         {
            "text": "Good Move!",
            "style": [
               //default
               {
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fill": 0xFFFFFF,
                  "fontSize": 96
               },

               // yellow
               {
                  "fill": [
                     "#fced68",
                     "#f8d048"
                  ],
                  "stroke": "#d1662b",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },

               //red
               {
                  "fill": [
                     "#f46800",
                     "#c83222"
                  ],
                  "stroke": "#6c2411",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },

               //green 
               {
                  "fill": [
                     "#def35a",
                     "#b2da06"
                  ],
                  "stroke": "#085226",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },
            ]
         },
         {
            "text": "Great Move!",
            "style": [
               //default
               {
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fill": 0xFFFFFF,
                  "fontSize": 96
               },

               // yellow
               {
                  "fill": [
                     "#fced68",
                     "#f8d048"
                  ],
                  "stroke": "#d1662b",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },
         
               //red
               {
                  "fill": [
                     "#f46800",
                     "#c83222"
                  ],
                  "stroke": "#6c2411",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },

               //green 
               {
                  "fill": [
                     "#def35a",
                     "#b2da06"
                  ],
                  "stroke": "#085226",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               }
            ]
         },
         {
            "text": "Super Move!",
            "style": [
               //default
               {
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fill": 0xFFFFFF,
                  "fontSize": 96
               },
         
               // yellow
               {
                  "fill": [
                     "#fced68",
                     "#f8d048"
                  ],
                  "stroke": "#d1662b",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },

               //red
               {
                  "fill": [
                     "#f46800",
                     "#c83222"
                  ],
                  "stroke": "#6c2411",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               },

               //green 
               {
                  "fill": [
                     "#def35a",
                     "#b2da06"
                  ],
                  "stroke": "#085226",
                  "strokeThickness": 1,
                  "fontFamily": "Rubik-Bold",
                  "align": "center",
                  "fontSize": 96
               }
            ]
         }
      ]

   }
};