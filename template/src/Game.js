import * as PIXI from 'pixi.js';

import MainStage from './game/MainStage.js';

import Loader from './loaders/index.js';
import ASSETS from './assets.js';

import './styles.css';

const Game = {};

Game.app = null;
Game.container = null;
Game.currentWindow = null;

Game.init = () => {
	const app = new PIXI.Application({
		width: window.innerWidth,
		height: window.innerHeight
	});

	Game.app = app;
	Game.container = document.body;
	Game.container.appendChild(app.view);

	Game.loader = new Loader(ASSETS);

	Game.loader.load()
		.then((res) => {
			Game.start()
		})
		.catch(error => console.log(error));
};

Game.start = () => {
	Game.showWindow(new MainStage());
};

Game.showWindow = (wind) => {
	if (Game.currentWindow) {
		Game.app.stage.removeChild(Game.currentWindow);
	}


	Game.app.stage.addChild(wind);
	Game.currentWindow = wind;
	Game.currentWindow.position.set(Game.app.renderer.width / 2, Game.app.renderer.height / 2);
};

export default Game;