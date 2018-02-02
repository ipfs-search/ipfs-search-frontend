import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  ajax: inject(),
  model( { } ) {
    return this.get('ajax').request('/v1/search', {
      method: 'GET',
      data: { q: "hello" }
    });
  }
});
