import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject } from '@ember/service';
import fetch from 'fetch';
import { task } from 'ember-concurrency-decorators';

export default class SearchController extends Controller {
  queryParams = ['search', 'page', 'kind']
  search = ""
  page = 0
  kind = "any"

  @inject activePageService;

  @task( { restartable: true } )
  *searchRepo( { kind, page, search } ) {
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

      try {
        const req = yield fetch(`https://api.ipfs-search.com/v1/search?q=${encodeURIComponent(search)}&page=${encodeURIComponent(page)}`);
        const data = yield req.json();
        data.kind = kind;
        data.search = search;
        data.page = page;
        this.activePageService.set('page', 'search-page search-results');
        this.set('data', data);
      } catch (err) {
        window.lasterr = err;
        this.activePageService.set('page', 'search-page search-results');
        this.set('errorOccurred', true);
        throw err;
      }
    } else {
      this.set('data', null);
    }
  }

  executeNewSearch(page = this.page) {
    this.searchRepo.perform( { kind: this.kind, search: this.search, page });
  }

  @action
  updateSearch( { kind, search } ){
    this.setProperties( { kind, search } );
    let page = 0;
    this.executeNewSearch(page);
    // // proactively set the target
    // this.get('activePageService').set('page', 'search-page search-transition-to-results');
  }

  @action
  setPage( page ) {
    this.setProperties( { page } );
    this.searchRepo.perform( { kind: this.kind, search: this.search, page } );
  }
}
