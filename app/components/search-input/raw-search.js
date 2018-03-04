import { observer } from '@ember/object';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  searchPlaceholder: computed('kind', function() {
    const searchKind = this.get('kind');
    return `Search ${searchKind}`;
  }),

  updateNewSearchStringObserver: observer('search', function() {
    this.set('newSearchString', this.get('search'));
  }).on('init'),

  updateNewKindObserver: observer( 'kind', function() {
    this.set('newSearchKind', this.get('kind'));
  }).on('init'),

  actions: {
    updateSearch(){
      this.onSearch({
        search: this.get('newSearchString'),
        kind: this.get('newSearchKind')
      });
    },
    changeKind(kind) {
      this.onSearch({
        search: this.get('newSearchString'),
        kind: kind
      });
    }
  }
});
