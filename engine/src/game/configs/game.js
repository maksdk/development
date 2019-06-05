var GAME_CONFIG = {
   "CONSTANTS": {
      "BIG_ISLAND": "big_island",
      "SMALL_ISLAND": "small_island",
      "GATEWAY": "gateway"
   },
   "GROUNDS": [
      {
         "type": "gateway",
         "children":[
            {
               "bitmap": "ground/1",
               "zIndex": 0,
               "pos":{
                  "x": 0,
                  "y": 0
               },
               "anchor":{
                  "x": 0.5,
                  "y": 1
               },
               "scale":{
                  "x": 1,
                  "y": 1
               }
            },
            {
               "bitmap": "ground/3",
               "zIndex": 1,
               "pos":{
                  "x": -650,
                  "y": 0
               },
               "anchor":{
                  "x": 1,
                  "y": 1
               },
               "scale":{
                  "x": 2,
                  "y": 2
               }
            }
         ]
      },


      {
         "type": "big_island",
         "children":[
            {
               "bitmap": "ground/18",
               "zIndex": 0,
               "pos":{
                  "x": 0,
                  "y": 0
               },
               "anchor":{
                  "x": 1,
                  "y": 1
               },
               "scale":{
                  "x": 1,
                  "y": 1
               }
            },
            {
               "bitmap": "ground/21",
               "zIndex": 1,
               "pos":{
                  "x": -480,
                  "y": 0
               },
               "anchor":{
                  "x": 1,
                  "y": 1
               },
               "scale":{
                  "x": 1,
                  "y": 1
               }
            },
            {
               "bitmap": "ground/6",
               "zIndex": 2,
               "pos":{
                  "x": -235,
                  "y": 0
               },
               "anchor":{
                  "x": 1,
                  "y": 1
               },
               "scale":{
                  "x": 1,
                  "y": 1
               }
            }
         ]
      },


      // {
      //    "type": "big_island",
      //    "children":[
      //       {
      //          "bitmap": "ground/17",
      //          "zIndex": 0,
      //          "pos":{
      //             "x": 0,
      //             "y": 0
      //          },
      //          "anchor":{
      //             "x": 1,
      //             "y": 1
      //          },
      //          "scale":{
      //             "x": 1,
      //             "y": 1
      //          }
      //       },
      //       {
      //          "bitmap": "ground/22",
      //          "zIndex": 1,
      //          "pos":{
      //             "x": -1030,
      //             "y": 0
      //          },
      //          "anchor":{
      //             "x": 1,
      //             "y": 1
      //          },
      //          "scale":{
      //             "x": 1,
      //             "y": 1
      //          }
      //       },
      //       {
      //          "bitmap": "ground/3",
      //          "zIndex": 2,
      //          "pos":{
      //             "x": -710,
      //             "y": 0
      //          },
      //          "anchor":{
      //             "x": 1,
      //             "y": 1
      //          },
      //          "scale":{
      //             "x": -1,
      //             "y": 1
      //          }
      //       },
      //       {
      //          "bitmap": "ground/3",
      //          "zIndex": 3,
      //          "pos":{
      //             "x": -530,
      //             "y": 0
      //          },
      //          "anchor":{
      //             "x": 1,
      //             "y": 1
      //          },
      //          "scale":{
      //             "x": 1,
      //             "y": 1
      //          }
      //       }
      //    ]
      // },

      // {
      //    "type": "small_island",
      //    "children":[
      //       {
      //          "bitmap": "ground/9",
      //          "zIndex": 0,
      //          "pos":{
      //             "x": 0,
      //             "y": 0
      //          },
      //          "anchor":{
      //             "x": 0.5,
      //             "y": 1
      //          },
      //          "scale":{
      //             "x": 1,
      //             "y": 1
      //          }
      //       }
      //    ]
      // },

      // {
      //    "type": "small_island",
      //    "children":[
      //       {
      //          "bitmap": "ground/7",
      //          "zIndex": 0,
      //          "pos":{
      //             "x": 0,
      //             "y": 0
      //          },
      //          "anchor":{
      //             "x": 0.5,
      //             "y": 1
      //          },
      //          "scale":{
      //             "x": 1,
      //             "y": 1
      //          }
      //       }
      //    ]
      // }
   ]
};