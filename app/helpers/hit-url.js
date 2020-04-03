import { helper } from '@ember/component/helper';

export default helper(function hitUrl([hit]/*, hash*/) {
  return `https://gateway.ipfs.io/ipfs/${hit.hash}`;
});
