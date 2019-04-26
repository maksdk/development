export default class BaseRepository {
	data = new Map();

	all() {
		return this.data;
	}

	save(entity) {
		this.data.set(entity.id, entity);
	}

	find(id) {
		if (!this.data.has(id)) throw new Error('Entity not found');
		return this.data.get(id);
	}
}