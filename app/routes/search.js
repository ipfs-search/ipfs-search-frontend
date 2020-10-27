import { inject as service } from '@ember/service';
import classic from "ember-classic-decorator";
import { action } from "@ember/object";
import Route from '@ember/routing/route';
import fetch from 'fetch';

const textTypes = [
  // eBook types
  'application/x-mobipocket-ebook',
  'application/epub+zip',
  'application/vnd.amazon.ebook',
  // Scanned documents
  'image/vnd.djvu',
  'application/pdf',
  // HTML/plain text
  'text/html',
  'text/plain',
  // Text editors
  'application/postscript',
  'application/rtf',
  // Open Office et al.
  'application/vnd.oasis.opendocument.text',
  'application/vnd.sun.xml.writer',
  'application/vnd.stardivision.writer',
  'application/x-starwriter',
  // MS Word
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // Misc
  'application/x-abiword',
]

function makeTypeFilter(typeList) {
  return ' metadata.Content-Type:('+typeList.map(x => '"'+x+'"').join(' OR ')+')';
}

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
          search += makeTypeFilter(textTypes);
        }
        if( kind == "video" ) {
          search += ' metadata.Content-Type:(video* OR "application/mp4")';
        }
        if( kind == "audio" ) {
          search += ' metadata.Content-Type:(audio* OR "application/ogg")';
        }
        if( kind == "directory" ) {
          fileOrDirectory = "directory";
        }
      }

      if( kind == "directory" )
        search += " _type:directory";

      console.log("Search query: ", search);

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
