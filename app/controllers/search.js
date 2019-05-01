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
    if( search || ( kind && kind !== "any") ) {
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

      this.set("errorOccurred", false);

      if( kind == "directory" )
        search += " _type:directory";

      yield this.ajax.request('https://api.ipfs-search.com/v1/search', {
        method: 'GET',
        data: { q: search, page: page }
      }).catch( (err) => {
        window.lasterr = err;
        this.activePageService.set('page', 'search-page search-results');
        this.set('errorOccurred', true);
        throw err;
      } ).then( (data) => {
        data.kind = kind;
        data.search = search;
        data.page = page;
        this.activePageService.set('page', 'search-page search-results');
        this.set('data', data);
      });
    } else {
      this.set('data', null);
    }
  }).restartable(),
  
  executeNewSearch(page = this.page) {
    this.searchRepo.perform( { kind: this.kind, search: this.search, page });
  },

  actions: {
    updateSearch( { kind, search } ){
      this.setProperties( { kind, search } );
      let page = 0;
      this.executeNewSearch(page);
      // // proactively set the target
      // this.get('activePageService').set('page', 'search-page search-transition-to-results');
    },
    setPage( page ) {
      this.setProperties( { page } );
      this.searchRepo.perform( { kind: this.kind, search: this.search, page } );
    }
  }
});
