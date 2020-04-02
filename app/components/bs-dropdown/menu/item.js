import classic from "ember-classic-decorator";
import { classNames, classNameBindings } from "@ember-decorators/component";
import { computed } from "@ember/object";
import BsDropdownMenuItem from 'ember-bootstrap/components/base/bs-dropdown/menu/item';

@classic
@classNames("dropdown-item")
@classNameBindings("isActiveClass")
export default class Item extends BsDropdownMenuItem {
  @computed('active')
  get isActiveClass() {
    return this.active && "active";
  }

  click() {
    if( this.action )
      this.action();
  }
}
