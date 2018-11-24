import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  searchPlaceholder: computed('kind', function() {
    const searchKind = this.kind;
    return `Search ${searchKind}`;
  })
});
