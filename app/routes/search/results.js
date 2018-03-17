import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  ajax: inject(),
  activePageService: inject(),
  searchState: inject(),

  queryParams: {
    search: { refreshModel: true },
    kind: { refreshModel: true },
    page: { refreshModel: true }
  },

  activate() {
    this.get('activePageService').set('page', 'search-page search-results');
  },

  model( { kind, page, search } ) {
    console.log('Reloading model');

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
      } ).then( (data) => {
        data.kind = kind;
        data.search = search;
        data.page = page;
        this.get('activePageService').set('page', 'search-page search-results');
        return data;
      });
    } else {
      return null;
    }
  }
});
