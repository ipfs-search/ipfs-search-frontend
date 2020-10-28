import { helper } from '@ember/component/helper';

export default helper(function hitUrl([hit]) {
  if (hit.references) {
    return hit.references[0].name;
  }

  return hit.hash;
});
