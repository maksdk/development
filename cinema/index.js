import { CinemaService } from './services';
import * as repositories from './repositories';

const repositoriesInstances = Object.keys(repositories)
	.reduce((acc, name) => {
		const instanceRepo = new repositories[name]();
		return { [name]: instanceRepo, ...acc };
	}, {});


const service = new CinemaService(repositoriesInstances);
const film =  service.createFilm('Batman', 150);

console.table(service.FilmRepository.data)