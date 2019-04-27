import ApplicationServices from './ApplicationService';
import { User } from '../entities';

export default class UserService extends ApplicationServices {
	createUser(email) {
		const user = new User(email);
		const errors = this.validate(user);

		if (!errors) {
			this.UserRepository.save(user);
		}

		return [user, errors];
	}
}