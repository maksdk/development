import * as PIXI from 'pixi.js';

export default class MainStage extends PIXI.Container {
	constructor() {
		super();
		const smile = this.addChild(new PIXI.Sprite.fromFrame('images/smile'));
		smile.anchor.set(0.5);

		const text = this.addChild(new PIXI.Text('Smile', {fill: 0xFFFFFF, fontFamily:'SignPainter-HouseScript', fontSize: 40}));
		text.anchor.set(0.5);
		text.position.set(0, 100);
	}
}