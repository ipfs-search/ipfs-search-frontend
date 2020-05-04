import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class SearchResults extends Component {
  @tracked selectedHit = null;
}
