import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'search', 'page' ],
  search: "",
  page: 0,
  actions: {
    updateSearch(){
      this.setProperties({
        search: this.get('newSearchString'),
        page: 0
      });
    }
  }
});
