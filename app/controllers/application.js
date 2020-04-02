import classic from "ember-classic-decorator";
import { classNameBindings } from "@ember-decorators/component";
import { inject } from "@ember/service";
import { alias } from "@ember/object/computed";
import Controller from '@ember/controller';

@classic
@classNameBindings('activePage')
export default class ApplicationController extends Controller {
  @inject()
  activePageService;

  @alias('activePageService.page')
  activePage;
}
