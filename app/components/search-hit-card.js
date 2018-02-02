import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  cardOpen: computed( 'more', 'forceExpand', function() {
    return this.get('more') || this.get('forceExpand');
  }),
  actions: {
    showMore(){
      this.toggleProperty('more');
    }
  }
});
