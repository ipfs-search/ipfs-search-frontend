import { get } from '@ember/object';
import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function cssAvailabilityClass([hit] /*, hash*/) {
  const lastSeen = get( hit, "last-seen" );

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
});
