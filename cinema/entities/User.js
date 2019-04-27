import uuid from 'uuid-js';
import ApplicationEntyti from './ApplicationEntity';

export default class User extends ApplicationEntyti {
	constructor(email) {
		super();
		this.email = email;
		this.id = uuid.create().hex;
		this.createdAt = new Date();
	}

	static constraints = {
		email: {
			email: true,
			uniqueness: true,
			presence: true
		},
		createdAt: {
			dateObject: true
		}
	}
}