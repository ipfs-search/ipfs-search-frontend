import { observer } from '@ember/object';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  searchKindLabel: computed('kind', function() {
    const kind = this.kind;
    if( kind == "any" ) {
      return "Filter";
    } else {
      return kind || "Filter";
    }
  }),

  searchPlaceholder: computed('kind', function() {
    const searchKind = this.kind;
    return `Search ${searchKind}`;
  }),

  updateNewSearchStringObserver: observer('search', function() {
    this.set('newSearchString', this.search);
  }).on('init'),

  updateNewKindObserver: observer( 'kind', function() {
    this.set('newSearchKind', this.kind);
  }).on('init'),

  actions: {
    updateSearch(){
      this.onSearch({
        search: this.newSearchString,
        kind: this.newSearchKind
      });
    },
    changeKind(kind) {
      this.onSearch({
        search: this.newSearchString,
        kind: kind
      });
    }
  }
});
