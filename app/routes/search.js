import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },
  search: null,
  ajax: inject(),
  model( { search, page } ) {
    if( search ) {
      return this.get('ajax').request('http://api.ipfs-search.com/v1/search', {
        method: 'GET',
        data: { q: search, page: page }
      }).catch( (err) => {
        window.lasterr = err;
        throw err;
      } );
    } else {
      return null;
    }
  }
});
