import { helper } from '@ember/component/helper';
import mime from 'mime';

const gatewayUrl = 'https://gateway.ipfs.io';

export default helper(function hitUrl([hit, download]) {
  if (download !== true) download = false;

  if (hit.references) {
    let parent = hit.references[0];

    // Use first reference available to construct link from parent hash
    return `${gatewayUrl}/ipfs/${parent.parent_hash}/${parent.name}?download=${download}`;
  }

  let extension = mime.getExtension(hit.mimetype);
  let title = hit.title || hit.hash;
  return `${gatewayUrl}/ipfs/${hit.hash}?filename=${title}.${extension}&download=${download}`;
});
