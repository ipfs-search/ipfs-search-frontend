import classic from "ember-classic-decorator";
import { tagName } from "@ember-decorators/component";
import Component from '@ember/component';
import { A }  from '@ember/array';

@classic
@tagName("")
export default class SearchResults extends Component {
  openAllResults = false;
  selectedHit = null;
}
