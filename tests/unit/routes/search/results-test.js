import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | search/results', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:search/results');
    assert.ok(route);
  });
});
