import { computed } from '@ember/object';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: "",

  init(){
    this._super(...arguments);
    this.fetchMetadata.perform();
  },

  didReceiveAttrs(){
    this.fetchMetadata.perform();
  },

  ajax: inject(),

  fetchMetadata: task( function * () {
    const hash = this.get('hit.hash');

    yield timeout( 50 );

    if( !hash ) return;

    const response = yield this.ajax.request(`https://api.ipfs-search.com/v1/metadata/${hash}`);
    this.set('metadata', response.metadata);
  } ).restartable(),

  tableContents: computed('metadata', function() {
    const metadataObject = this.metadata || {};

    return Object.entries( metadataObject ).map( ([key, values]) => {
      return { key: key, valueString: values.join(",") };
    } );
  })
});
