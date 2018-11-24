import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search hit card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('hit', {
      hash: "1234",
      size: "42"
    });

    await render(hbs`{{search-hit-card hit=hit}}`);

    assert.dom('*').hasText('1234 - 42bytes');
  });
});
