import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search-input/raw-search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{search-input/raw-search}}`);

    assert.equal( this.element.getElementsByClassName("ember-text-field").length, 1, "Should have one textfield" );
    assert.equal( this.element.getElementsByClassName("dropdown-menu").length, 1, "Should have one dropdown menu" );
    assert.equal( this.element.getElementsByClassName("search-button").length, 1, "Should have one search button" );
  });
});
