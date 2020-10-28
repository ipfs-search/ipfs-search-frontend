import { helper } from '@ember/component/helper';

const gatewayUrl = 'https://gateway.ipfs.io';

export default helper(function referenceUrl([reference, download]) {
  if (download !== true) download = false;

  // Use first reference available to construct link from parent hash
  return `${gatewayUrl}/ipfs/${reference.parent_hash}/${reference.name}?download=${download}`;
});
