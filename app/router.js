import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('search', function() {
    this.route('results', { path: ":kind/:search/:page" } );
  });
});

export default Router;
