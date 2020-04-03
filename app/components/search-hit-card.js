import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { get } from '@ember/object';
import Component from '@glimmer/component';

export default class SearchHitCardComponent extends Component {
  @tracked showMetadata = false;
  @tracked detailsAreShown = false;
  @tracked more = false;

  get hit() {
    return this.args.hit;
  }

  get cardOpen(){
    return this.more || this.forceExpand;
  }

  get humanizedSize() {
    if (this.hit.size)
      return humanizeBytes(parseInt(this.hit.size));
    else
      return "";
  }

  @action
  openDetails(){
    this.detailsAreShown = !this.detailsAreShown;
    if( this.detailsAreShown && typeof this.args.onOpenDetail === "function" ) {
      this.args.onOpenDetail();
    }
  }

  @action
  changeOpenState(open){
    this.detailsAreShown = open;

    if( open && this.args.onOpenDetails ) {
      this.args.onOpenDetails();
    }
  }
}
