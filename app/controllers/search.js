import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  queryParams: ['search', 'page', 'kind'],
  search: "",
  page: 0,
  kind: "any",

  activePageService: inject(),
  ajax: inject(),

  searchRepo: task(function * ( { kind, page, search } ) {
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

      yield this.get('ajax').request('http://api.ipfs-search.com/v1/search', {
        method: 'GET',
        data: { q: search, page: page, _type: fileOrDirectory }
      }).catch( (err) => {
        window.lasterr = err;
        throw err;
      } ).then( (data) => {
        data.kind = kind;
        data.search = search;
        data.page = page;
        // this.get('activePageService').set('page', 'search-page search-results');
        this.set('data', data);
      });
    } else {
      this.set('data', null);
    }
  }).restartable(),
  
  actions: {
    updateSearch( { kind, search } ){
      this.get('searchRepo').perform( { kind, search, page: 0 });
      // // proactively set the target
      // this.get('activePageService').set('page', 'search-page search-transition-to-results');
    }
  }
});
