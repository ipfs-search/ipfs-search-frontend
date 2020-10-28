import { helper } from '@ember/component/helper';

const gatewayUrl = 'https://gateway.ipfs.io';

export default helper(function hashURL([hash, download]) {
  if (download !== true) download = false;

  return `${gatewayUrl}/ipfs/${hash}?download=${download}`;
});
