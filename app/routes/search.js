import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },
  search: null,
  ajax: inject(),
  model( { search } ) {
    if( search ) {
      return this.get('ajax').request('/v1/search', {
        method: 'GET',
        data: { search }
      }).catch( (err) => {
        window.lasterr = err;
        throw err;
      } );
    } else {
      return null;
    }
  }
});
