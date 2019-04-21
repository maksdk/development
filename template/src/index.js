import * as PIXI from 'pixi.js';
import './styles.css';

window.addEventListener('load', event => {
	Game.init();
});

const Game = {};

Game.app = null;
Game.container = null;

Game.init = () => {
	Game.container = document.body;

	const app = new PIXI.Application({
		width: window.innerWidth,
		height: window.innerHeight
	});
	
	Game.container.appendChild(app.view);
	Game.app = app;
}


