import Component from '@ember/component';

export default Component.extend({
  actions: {
    showMore(){
      this.toggleProperty('more');
    }
  }
});
