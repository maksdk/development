import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class Film extends ApplicationEntity {
	constructor(name, duration) {
		super();
		
		this.name = name;
		this.duration = duration;
		this.id = uuid.create().hex;
		this.createdAt = new Date();
	}

	static constraints = {
		name: {
			presence: true
		},
		duration: {
			presence: true
		}
	}
}