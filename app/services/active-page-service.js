import { tracked } from '@glimmer/tracking';
import classic from "ember-classic-decorator";
import Service from '@ember/service';

export default class ActivePageServiceService extends Service {
  @tracked page
}
