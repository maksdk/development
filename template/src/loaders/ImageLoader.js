import * as PIXI from 'pixi.js';

export default class ImageLoader {
	constructor(images = []) {
		this.images = images;
	}

	load() {
		return new Promise((resolve, reject) => {
			const loader = PIXI.loader;
			
			this.images.forEach(image => {
				loader.add(image.name, image.src);
			});

			loader.onError.add(reject);
			loader.load(resolve); 
		});
	}
}