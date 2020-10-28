import { helper } from '@ember/component/helper';

import mime from 'mime';

export default helper(function hitExtension([hit]) {
  let ext = mime.getExtension(hit.mimetype)

  // Override mpga extension with mp3.
  if (ext == 'mpga') ext = 'mp3';

  return ext && ext.toUpperCase();
});
