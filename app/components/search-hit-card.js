import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { get } from '@ember/object';
import Component from '@glimmer/component';

export default class SearchHitCardComponent extends Component {
  @tracked detailsAreShown = false;

  @action
  changeOpenState(open){
    this.detailsAreShown = open;

    if( open && this.args.onOpenDetails ) {
      this.args.onOpenDetails();
    }
  }
}
