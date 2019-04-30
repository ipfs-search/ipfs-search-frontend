import Component from '@ember/component';
import { A }  from '@ember/array';

export default Component.extend({
  openAllResults: false,
  selectedHit: null,

  actions: {
    setAsSelectedHit(hash) {
      this.set('selectedHit', hash);
    }
  }
});
