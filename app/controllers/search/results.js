import classic from "ember-classic-decorator";
import { computed } from "@ember/object";
import Controller from '@ember/controller';

@classic
export default class ResultsController extends Controller {
  @computed('kind')
  get searchPlaceholder() {
    const searchKind = this.kind;
    return `Search ${searchKind}`;
  }
}
