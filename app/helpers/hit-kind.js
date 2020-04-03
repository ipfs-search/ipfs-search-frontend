import { helper } from '@ember/component/helper';
import hitKindUtil from '../utils/hit-kind';

export default helper(function hitKind([hit]/*, hash*/) {
  return hitKindUtil( hit );
});
