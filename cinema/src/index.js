import Bottle from 'bottlejs';
import _ from 'lodash';

import * as services from './services';
import * as entities from './entities';
import * as repositories from './repositories';
import makeValidator from './lib/validate';

export default () => {
	const bottle = new Bottle();
  bottle.factory('repositories', () => {
    const result = Object.keys(repositories)
      .reduce(
        (acc, repoName) => ({ ...acc, [_.camelCase(repoName)]: new repositories[repoName]() }),
        {},
      );
    return result;
  });

  bottle.factory('entities', () => entities);
  bottle.factory('validate', container => makeValidator(container));

  bottle.factory('services', (container) => {
    const result = Object.keys(services).reduce((acc, serviceName) => {
      const service = new services[serviceName](container);
      return { ...acc, [_.camelCase(serviceName)]: service };
    }, {});
    return result;
  });

  return bottle.container;
};