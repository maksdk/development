import ApplicationService from './ApplicationService';
import { Film, CinemaHall, FilmScreening } from '../entities';

export default class CinemaService extends ApplicationService {
	constructor(repositories) {
		super(repositories);
	}

	createFilm(name, duration) {
		const film = new Film(name, duration);
		this.FilmRepository.save(film);
		return film;
	}

	createCinemaHall(name, cols, rows) {
		const hall = new CinemaHall(name, cols, rows);
		this.CinemaHallRepository.save(hall);
		return hall;
	}

	createFilmScreening(filmId, cinemaHallId, time) {
		const film = this.FilmRepository.find(filmId);
		const hall = this.CinemaHallRepository.find(cinemaHallId);

		const screening = new FilmScreening(film, hall, time);
		this.FilmScreeningRepository.save(screening);
		return screening;
	}
}