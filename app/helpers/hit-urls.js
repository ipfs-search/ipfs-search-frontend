import { helper } from '@ember/component/helper';

export default helper(function hitUrls([hit]/*, hash*/) {
  return [
    `https://gateway.ipfs.io/ipfs/${hit.hash}`,
    `https://clowdflare-ipfs.com/ipfs/${hit.hash}`
  ];
});
