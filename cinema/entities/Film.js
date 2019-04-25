import uuid from 'uuid-js';

export default class Film {
	constructor(name, duration) {
		this.name = name;
		this.duration = duration;
		this.id = uuid.create().toString();
		this.createdAt = new Date();
	}
}