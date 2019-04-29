import _ from 'lodash';
import validate from 'validate.js';


export default repositories => {
	const entityValidate = entity => validate(entity, entity.constructor.constraints);

	validate.validators.uniqueness = (value, options, key, attributes) => {
		if (!value) {
      return null;
    }
    const className = attributes.constructor.name;
    const repository = repositories[className];
    const scope = options.scope || [];
    const params = { [key]: value, ..._.pick(attributes, scope) };
    const result = repository.findBy(params);
    const isEntity = result instanceof BaseEntity;
    if (result || (isEntity && result.id !== value.id)) {
      return 'already exists';
    }
    return null;
	};

	validate.validators.association = (value) => {
    if (!value) {
      return null;
    }
    return entityValidator(value);
  };

	validate.validators.dateObject = value => {
		if (validate.isDate(value)) return null;
		return 'Is not date';
	}
	return entityValidate;
}