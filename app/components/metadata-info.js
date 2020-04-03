import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';

export default class MetdataInfoComponent extends Component {
  @tracked metadata = null;

  constructor(){
    super( ...arguments );
    this.fetchMetadata.perform();
  }

  @task({restartable: true})
  *fetchMetadata() {
    const hash = this.args.hit.hash;

    yield timeout( 50 );

    if( !hash ) return;

    const req = yield fetch(`https://api.ipfs-search.com/v1/metadata/${hash}`);
    const response = yield req.json();

    this.metadata = response.metadata;
  }

  get tableContents() {
    const metadataObject = this.metadata || {};

    return Object.entries( metadataObject ).map( ([key, values]) => {
      return { key, valueString: values.join(",") };
    });
  }
}
