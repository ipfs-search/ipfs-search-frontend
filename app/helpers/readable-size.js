import { helper } from '@ember/component/helper';
import humanizeBytes from '../utils/humanize-bytes';

export default helper(function readableSize([size], /*, hash*/) {
  if (size)
    return humanizeBytes(parseInt(size));
  else
    return "";
});
