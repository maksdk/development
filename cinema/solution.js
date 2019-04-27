import * as repositories from './repositories';
import validator from './lib/validate.js';

import { CinemaService, UserService, MoneyService } from './services';
import { User, CinemaHall } from './entities';


const repositoriesInstances = Object.keys(repositories)
	.reduce((acc, name) => {
		const instanceRepo = new repositories[name]();
		return { [name]: instanceRepo, ...acc };
	}, {});
const validate = validator(repositoriesInstances);

const place = {row: 5, col: 3}

const cinemaService = new CinemaService(repositoriesInstances, validate);
const userService = new UserService(repositoriesInstances, validate);
const moneyService = new MoneyService(repositoriesInstances, validate);

const [film] =  cinemaService.createFilm('Batman', 150);

const [hall] = cinemaService.createCinemaHall(film.name, 10, 20);
const [filmScreen] =  cinemaService.createFilmScreening(film.id, hall.id, 260);

const [user] = userService.createUser('example@example.net');
const [ticket] = moneyService.buyTicket(filmScreen.id, user.id, place);

const [user2] = userService.createUser('example2@example.net');
const [ticket2] = moneyService.buyTicket(filmScreen.id, user2.id,  place);
