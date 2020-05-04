import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class SearchHitMetadataControlsComponent extends Component {
  @tracked showMetadata = false;
}
