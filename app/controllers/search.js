import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'search', 'page', 'kind' ],
  search: "",
  kind: "file",
  page: 0,
  actions: {
    updateSearch(){
      this.setProperties({
        search: this.get('newSearchString'),
        page: 0
      });
    },
    newKind(kind) {
      this.set('kind', kind);
    }
  }
});
