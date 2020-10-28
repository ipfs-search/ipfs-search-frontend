import { helper } from '@ember/component/helper';
import cliTruncate from 'cli-truncate';

export default helper(function shorten([s, characters]) {
  return cliTruncate(s, characters, {position: 'middle'});
});
