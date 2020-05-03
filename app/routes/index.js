import classic from "ember-classic-decorator";
import { inject } from "@ember/service";
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @inject()
  activePageService;

  activate() {
    this.transitionTo('search');
  }
}
