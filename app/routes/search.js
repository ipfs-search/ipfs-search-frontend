import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    kind: {
      refreshModel: true
    }
  },
  search: null,
  ajax: inject(),
  defaultGateway: 'https://gateway.ipfs.io',
  model( { search, page, kind } ) {
    if( search || kind ) {
      if( ! search ) { search = ""; }
      let fileOrDirectory = "file";
      if( kind ){
        if( kind == "image" ) {
          search += " metadata.Content-Type:image*";
        }
        if( kind == "text" ) {
          search += " metadata.Content-Type:text*";
        }
        if( kind == "video" ) {
          search += " metadata.Content-Type:video*";
        }
        if( kind == "audio" ) {
          search += " metadata.Content-Type:audio*";
        }
        if( kind == "directory" ) {
          fileOrDirectory = "directory";
        }
      }

      let response = this.get('ajax').request('http://api.ipfs-search.com/v1/search', {
        method: 'GET',
        data: { q: search, page: page, _type: fileOrDirectory }
      }).catch( (err) => {
        window.lasterr = err;
        throw err;
      } );

      let gateway = this.get('ajax').raw('http://localhost:8080/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/ping', {
        method: 'GET',
        cache: false,
        timeout: 50,
        dataType: 'text',
      }).catch( () => {
        return this.defaultGateway;
      }).then( (response) => {
        if (response.payload !== 'ipfs') {
          return this.defaultGateway;
        }
        return 'http://localhost:8080';
      });

      return RSVP.hash({
        response: response,
        gateway: gateway
      });
    } else {
      return null;
    }
  }
});
