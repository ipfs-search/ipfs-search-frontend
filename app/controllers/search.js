import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject } from '@ember/service';
import fetch from 'fetch';
import { task } from 'ember-concurrency-decorators';

export default class SearchController extends Controller {
  queryParams = ['search', 'page', 'kind']
  @tracked search = ""
  @tracked page = 0
  @tracked kind = "any"

  @tracked isLoading
  @tracked isError

  @action
  updateSearch( { kind, search } ){
    this.kind = kind;
    this.search = search;
    this.page = 0;
  }
}
