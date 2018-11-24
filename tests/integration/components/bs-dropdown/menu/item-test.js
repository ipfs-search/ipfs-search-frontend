import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs dropdown/menu/item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{bs-dropdown/menu/item}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#bs-dropdown/menu/item}}
        template block text
      {{/bs-dropdown/menu/item}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
