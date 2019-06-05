var TRAIL_BOARD = {
"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.7,
		"end": 1,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 40,
		"end": 35,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 70,
		"max": 100
	},
	"noRotation": true,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 8,
		"max": 9
	},
	"blendMode": "normal",
	"frequency": 0.6,
	"emitterLifetime": -1,
	"maxParticles": 30,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "rect",
	"spawnRect": {
		"x": 0,
		"y": 0,
		"w": 20,
		"h": 0
	}
};

var OUTRO_STARS_BURST = {
	"alpha": {
		"start": 0.74,
		"end": 0.3
	},
	"scale": {
		"start": 1,
		"end": 0.7,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#fff342",
		"end": "#fff342"
	},
	"speed": {
		"start": 500,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.3,
		"max": 0.8
	},
	"blendMode": "normal",
	"ease": [
		{
			"s": 0,
			"cp": 0.329,
			"e": 0.548
		},
		{
			"s": 0.548,
			"cp": 0.767,
			"e": 0.876
		},
		{
			"s": 0.876,
			"cp": 0.985,
			"e": 1
		}
	],
	"frequency": 0.001,
	"emitterLifetime": 0.1,
	"maxParticles": 50,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": true,
	"spawnType": "point"
};

var ENEMY_STARS_BURST = {
	"alpha": {
		"start": 0.74,
		"end": 0.3
	},
	"scale": {
		"start": 1,
		"end": 0.7,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 650,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.3,
		"max": 0.6
	},
	"blendMode": "normal",
	"ease": [
		{
			"s": 0,
			"cp": 0.329,
			"e": 0.548
		},
		{
			"s": 0.548,
			"cp": 0.767,
			"e": 0.876
		},
		{
			"s": 0.876,
			"cp": 0.985,
			"e": 1
		}
	],
	"frequency": 0.001,
	"emitterLifetime": 0.1,
	"maxParticles": 50,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": true,
	"spawnType": "point"
};

var ENEMY_CIRCLE_BURST = {
	"alpha": {
		"start": 0.3,
		"end": 0.1
	},
	"scale": {
		"start": 1,
		"end": 0.7,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 500,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.3,
		"max": 0.5
	},
	"blendMode": "normal",
	"ease": [
		{
			"s": 0,
			"cp": 0.329,
			"e": 0.548
		},
		{
			"s": 0.548,
			"cp": 0.767,
			"e": 0.876
		},
		{
			"s": 0.876,
			"cp": 0.985,
			"e": 1
		}
	],
	"frequency": 0.001,
	"emitterLifetime": 0.1,
	"maxParticles": 50,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": true,
	"spawnType": "point"
};

var PROGRESS_BAR_STARS_BURST = {
	"alpha": {
		"start": 1,
		"end": 0.8
	},
	"scale": {
		"start": 1,
		"end": 0.7,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 50,
		"end": 300,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.3,
		"max": 0.5
	},
	"blendMode": "normal",
	"ease": [
		{
			"s": 0,
			"cp": 0.329,
			"e": 0.548
		},
		{
			"s": 0.548,
			"cp": 0.767,
			"e": 0.876
		},
		{
			"s": 0.876,
			"cp": 0.985,
			"e": 1
		}
	],
	"frequency": 0.005,
	"emitterLifetime": 0.1,
	"maxParticles": 50,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": true,
	"spawnType": "point"
};

var BIRD_FEATHER = {
	"alpha": {
		"start": 1,
		"end": 0.8
	},
	"scale": {
		"start": 1.2,
		"end": 0.3,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 300,
		"end": 50,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 30,
		"max": 70
	},
	"lifetime": {
		"min": 0.8,
		"max": 1.1
	},
	"blendMode": "normal",
	"frequency": 0.008,
	"emitterLifetime": 0.31,
	"maxParticles": 5,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "circle",
	"spawnCircle": {
		"x": 0,
		"y": 0,
		"r": 10
	}
}

var BOMB_BURST = {
	"alpha": {
		"start": 1,
		"end": 0.5
	},
	"scale": {
		"start": 1.2,
		"end": 0.3,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 500,
		"end": 100,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 30,
		"max": 70
	},
	"lifetime": {
		"min": 0.3,
		"max": 0.5
	},
	"blendMode": "normal",
	"frequency": 0.008,
	"emitterLifetime": 0.31,
	"maxParticles": 6,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "circle",
	"spawnCircle": {
		"x": 0,
		"y": 0,
		"r": 10
	}
}