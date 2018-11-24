import { alias } from '@ember/object/computed';
import { inject } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  activePageService: inject(),
  classNameBindings: ['activePage'],
  activePage: alias( 'activePageService.page')
});
