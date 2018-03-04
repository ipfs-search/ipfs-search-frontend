import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    kind: {
      refreshModel: true
    }
  },
  search: null,
  ajax: inject(),
  activePageService: inject(),

  activate() {
    this.get('activePageService').set('page', 'search-page');
  },

  model( { search, page, kind } ) {
    if( search || kind ) {
      if( ! search ) { search = ""; }
      let fileOrDirectory = "file";
      if( kind ){
        if( kind == "image" ) {
          search += " metadata.Content-Type:image*";
        }
        if( kind == "text" ) {
          search += " metadata.Content-Type:text*";
        }
        if( kind == "video" ) {
          search += " metadata.Content-Type:video*";
        }
        if( kind == "audio" ) {
          search += " metadata.Content-Type:audio*";
        }
        if( kind == "directory" ) {
          fileOrDirectory = "directory";
        }
      }

      return this.get('ajax').request('http://api.ipfs-search.com/v1/search', {
        method: 'GET',
        data: { q: search, page: page, _type: fileOrDirectory }
      }).catch( (err) => {
        window.lasterr = err;
        throw err;
      } );
    } else {
      return null;
    }
  }
});
