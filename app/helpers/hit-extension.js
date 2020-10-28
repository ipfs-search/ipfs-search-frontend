import { helper } from '@ember/component/helper';

import mime from 'mime';

export default helper(function hitExtension([hit]) {
  return mime.getExtension(hit.mimetype).toUpperCase();
});
