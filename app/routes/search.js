import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: true,
    kind: true,
    page: true
  }
});
