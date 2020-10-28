import { helper } from '@ember/component/helper';
import cliTruncate from 'cli-truncate';

export default helper(function hitUrl([hit]) {
  if (hit.references) {
    return hit.references[0].name;
  }

  return cliTruncate(hit.hash, 14, {position: 'middle'});
});
