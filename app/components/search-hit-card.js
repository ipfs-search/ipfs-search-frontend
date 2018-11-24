import { computed } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({
  tagName: '',

  cardOpen: computed( 'more', 'forceExpand', function() {
    return this.more || this.forceExpand;
  }),
  availabilityClass: computed( 'hit.last-seen', function() {
    if( this.get('hit.last-seen') ) {
      const then = moment( this.get('hit.last-seen') );
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
  }),
  faIcon: computed( 'kind', function() {
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
  } ),
  actions: {
    showMore(){
      this.toggleProperty('more');
    },
    openModal(){
      this.toggleProperty('openModal');
    }
  }
});
