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

function getContentFilter(kind) {
  switch (kind) {
    case 'image':
      return ' metadata.Content-Type:image*';
    case 'text':
      return makeTypeFilter(textTypes);
    case 'video':
      return ' metadata.Content-Type:(video* OR "application/mp4")';
    case 'audio':
      return ' metadata.Content-Type:(audio* OR "application/ogg")';
  }

  // empty kind, any or directory
  return '';
}

function getType(kind) {
  if (kind === 'directory') return kind;

  return 'file';
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
    const query = (search + getContentFilter(kind)) || '*';
    const type = getType(kind);

    console.log('Query:', query);
    console.debug('Type:', type);

    const req = await fetch(`https://api.ipfs-search.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&page=${encodeURIComponent(page)}`);
    const data = await req.json();

    data.kind = kind;
    data.search = search;
    data.page = page;

    return data;

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
