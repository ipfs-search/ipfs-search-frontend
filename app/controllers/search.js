import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'search', 'page', 'kind' ],
  search: "",
  kind: "file",
  page: 0,

  searchPlaceholder: computed('kind', function() {
    const searchKind = this.get('kind');
    return `Search ${searchKind}`;
  }),

  actions: {
    updateSearch( { search, kind } ){
      this.setProperties({ search, kind, page: 0 });
    }
  }
});
