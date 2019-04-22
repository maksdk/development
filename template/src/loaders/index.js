import FontLoader from './FontLoader';
import ImageLoader from './ImageLoader';

export default class Loader {
	constructor(assets=[]) {
		this.assets = assets;
	}

	load() {
		const promises = [];

		if (this.assets.images && this.assets.images.length > 0) {
			const imageLoader = new ImageLoader(this.assets.images);
			promises.push(imageLoader.load())
		}

		if (this.assets.fonts && this.assets.fonts.length > 0) {
			const fontLoader = new FontLoader(this.assets.fonts);
			promises.push(fontLoader.load());
		}

		return Promise.all(promises);
	}
};