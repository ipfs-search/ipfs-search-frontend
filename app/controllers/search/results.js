import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  searchPlaceholder: computed('kind', function() {
    const searchKind = this.get('kind');
    return `Search ${searchKind}`;
  }),
  kind: alias( 'model.kind' ),
  search: alias( 'model.search' ),
  page: alias( 'model.page' )
});
