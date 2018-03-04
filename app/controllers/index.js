import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    search({search, kind}) {
      this.transitionToRoute('search', { queryParams: { search, kind } });
    }
  }
});
