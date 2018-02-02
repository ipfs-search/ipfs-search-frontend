import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    q: { refreshModel: true }
  },
  ajax: inject(),
  model( { q: searchString } ) {
    console.log(`Searching for ${searchString}`);
    return this.get('ajax').request('/v1/search', {
      method: 'GET',
      data: { q: searchString }
    });
  }
});
