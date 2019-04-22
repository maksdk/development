import FontFaceObserver from 'fontfaceobserver';

export default class FontLoader {
	constructor(fonts=[]) {
		this.fonts = fonts;
	}

	add(font) {
		this.fonts.push(font);
	}

	load() {
		if (this.fonts && this.fonts.length === 0) return Promise.resolve();

		const promises = this.fonts.map(font => new FontFaceObserver(font.name).load());

		return Promise.all(promises);
	}
}