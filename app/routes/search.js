import { inject as service } from '@ember/service';
import classic from "ember-classic-decorator";
import { action } from "@ember/object";
import Route from '@ember/routing/route';
import fetch from 'fetch';

import types from './../utils/types';

function makeTypeFilter(typeList) {
  // Add quotes for literals, leave wildcards as-is
  const t = typeList.map(x => (x.includes('*') && x) || '"'+x+'"')
  return ' metadata.Content-Type:('+t.join(' OR ')+')';
}

function getContentFilter(kind) {
  // Lookup known kinds (video, audio, text, image) or return '' (any or directory)
  return (types[kind] && makeTypeFilter(types[kind])) || '';
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
    // Launch search if query *or* kind are given - otherwise home page not rendered well.
    if (search || kind != 'any') {
      // Query or wildcard (anything)
      const query = (search + getContentFilter(kind)) || '*';
      const type = getType(kind);

      console.log('Query:', query);
      console.log('Type:', type);

      const req = await fetch(`https://api.ipfs-search.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&page=${encodeURIComponent(page)}`);
      const data = await req.json();

      data.kind = kind;
      data.search = search;
      data.page = page;

      return data;
    }

    return null;
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
