import { inject as service } from '@ember/service';
import classic from "ember-classic-decorator";
import { action } from "@ember/object";
import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class SearchRoute extends Route {
  @service activePageService

  queryParams = {
    search: { refreshModel: true },
    kind: { refreshModel: true },
    page: { refreshModel: true }
  }

  @action
  async model({search, kind, page}) {
    if( search || ( kind && kind !== "any") ) {
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

      if( kind == "directory" )
        search += " _type:directory";

      const req = await fetch(`https://api.ipfs-search.com/v1/search?q=${encodeURIComponent(search)}&page=${encodeURIComponent(page)}`);
      const data = await req.json();
      data.kind = kind;
      data.search = search;
      data.page = page;
      return data;
    } else {
      return null;
    }
  }

  @action
  loading(transition) {
    let controller = this.controllerFor('search');
    controller.isLoading = true;
    controller.isError = false;
    transition.promise.finally(() => {
      this.activePageService.page = 'search-page search-results';
      controller.isLoading = false;
    });
  }

  @action
  error(transition) {
    let controller = this.controllerFor('search');
    controller.isLoading = false;
    controller.isError = true;
  }
}
