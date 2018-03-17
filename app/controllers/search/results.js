import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['search', 'page', 'kind'],
  search: "",
  page: 0,
  kind: "any",

  searchPlaceholder: computed('kind', function() {
    const searchKind = this.get('kind');
    return `Search ${searchKind}`;
  })
});
