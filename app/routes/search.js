import classic from "ember-classic-decorator";
import { action } from "@ember/object";
import Route from '@ember/routing/route';

export default class SearchRoute extends Route {
  @action
  didTransition() {
    this.controller.executeNewSearch();
    return true;
  }
}
