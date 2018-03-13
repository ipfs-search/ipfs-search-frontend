import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  activePageService: inject(),
  kind: 'any',
  actions: {
    updateSearch( { kind, search } ){
      this.setProperties( {kind, search} );
      this.transitionToRoute('search.results', { kind, search, page: 0 });
      // proactively set the target
      this.get('activePageService').set('page', 'search-page search-transition-to-results');
    }
  }
});
