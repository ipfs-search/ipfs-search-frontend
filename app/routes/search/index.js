import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  activePageService: inject(),
  activate() {
    this.get('activePageService').set('page', 'search-page search-index');
  }
});
