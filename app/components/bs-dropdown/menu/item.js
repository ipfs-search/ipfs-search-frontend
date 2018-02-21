import { computed } from '@ember/object';
import BsDropdownMenuItem from 'ember-bootstrap/components/base/bs-dropdown/menu/item';

export default BsDropdownMenuItem.extend({
  classNames: "dropdown-item",
  classNameBindings: "isActiveClass",

  isActiveClass: computed( 'active', function(){
    return this.get('active') && "active";
  } ),
  click: function() {
    if( this.get('action') )
      this.get('action')();
  }
});
