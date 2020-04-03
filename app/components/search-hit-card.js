import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { get } from '@ember/object';
import Component from '@glimmer/component';
import moment from 'moment';
import humanizeBytes from '../utils/humanize-bytes';

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

  get availabilityClas() {
    const lastSeen = get( this.hit, "last-seen" );

    if( lastSeen ) {
      const then = moment( lastSeen );
      const timeDiff = moment().diff( then );

      const duration = moment.duration( timeDiff );
      if( duration < moment.duration( { months: 1 } ) ) {
        return "available";
      } else if( duration < moment.duration( { months: 6 } ) ) {
        return "might-be-available";
      } else {
        return "unavailable";
      }
    } else {
      // return "availability-unknown";
      return "unavailable";
    }
  }

  get kind() {
    const type = this.hit.type;
    const mimetype = this.hit.mimetype;

    if( type === "directory" ) {
      return "directory";
    } else if( ! mimetype ) {
      return "file";
    } else if( mimetype.indexOf("image") === 0 ) {
      return "image";
    } else if( mimetype.indexOf("text") === 0 ) {
      return "text";
    } else if( mimetype.indexOf("video") === 0 ) {
      return "video";
    } else if( mimetype.indexOf("audio") === 0 ) {
      return "audio";
    } else {
      return "any";
    }
  }

  get humanizedSize() {
    if (this.hit.size)
      return humanizeBytes(parseInt(this.hit.size));
    else
      return "";
  }

  get faIcon() {
    if( this.kind == "image" )
      return "fa-image";
    else if( this.kind == "video" )
      return "fa-video";
    else if( this.kind == "audio" )
      return "fa-volume-up";
    else if( this.kind == "directory" )
      return "fa-folder-open";
    else if( this.kind == "any" )
      return "fa-file-alt";
    else if( this.kind == "file" )
      return "fa-file";
    else
      return "fa-file-alt"; // fallback is same as any
  }

  @action
  openDetails(){
    this.detailsAreShown = !this.detailsAreShown;
    if( this.detailsAreShown && typeof this.args.onOpenDetail === "function" ) {
      this.args.onOpenDetail();
    }
  }
}
