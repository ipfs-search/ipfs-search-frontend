import classic from "ember-classic-decorator";
import { tagName } from "@ember-decorators/component";
import { action, computed } from "@ember/object";
import Component from '@ember/component';
import { rangeInclusive } from 'ipfs-search/utils/array-helpers';

const PAGES_AROUND_CURRENT = 3;

@classic
@tagName("")
export default class PageList extends Component {
  @computed('currentPage')
  get pagesBeforeMe() {
    const currentPage = this.currentPage;
    const firstPage = Math.max( currentPage - PAGES_AROUND_CURRENT, 1 );
    return rangeInclusive( firstPage, currentPage - 1 );
  }

  @computed('lastPage', 'currentPage')
  get pagesAfterMe() {
    const lastPage = this.lastPage;
    const currentPage = this.currentPage;
    const lastShownPage = Math.min( currentPage + PAGES_AROUND_CURRENT, lastPage);
    return rangeInclusive(currentPage + 1 , lastShownPage);
  }

  @computed('currentPage')
  get isFirstPage() {
    return this.currentPage == 0;
  }

  @computed('lastPage', 'currentPage')
  get hasMorePages() {
    const lastPage = this.lastPage;
    const currentPage = this.currentPage;

    return (currentPage + PAGES_AROUND_CURRENT) < lastPage;
  }

  @computed('totalPages')
  get lastPage() {
    return Math.max( 0, this.totalPages - 1);
  }

  @action
  selectPage(page) {
    const functor = this['on-change'];
    functor(page);
  }
}
