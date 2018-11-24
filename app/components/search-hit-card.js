import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  cardOpen: computed( 'more', 'forceExpand', function() {
    return this.more || this.forceExpand;
  }),
  actions: {
    showMore(){
      this.toggleProperty('more');
    },
    openModal(){
      this.toggleProperty('openModal');
    }
  }
});
