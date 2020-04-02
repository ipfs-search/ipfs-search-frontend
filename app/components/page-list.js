import { computed } from '@ember/object';
import Component from '@ember/component';
import { rangeInclusive } from 'ipfs-search/utils/array-helpers';

const PAGES_AROUND_CURRENT = 3;

export default Component.extend({
  tagName: "",

  pagesBeforeMe: computed('currentPage', function() {
    const currentPage = this.currentPage;
    const firstPage = Math.max( currentPage - PAGES_AROUND_CURRENT, 1 );
    return rangeInclusive( firstPage, currentPage - 1 );
  }),

  pagesAfterMe: computed('lastPage', 'currentPage', function() {
    const lastPage = this.lastPage;
    const currentPage = this.currentPage;
    const lastShownPage = Math.min( currentPage + PAGES_AROUND_CURRENT, lastPage);
    return rangeInclusive(currentPage + 1 , lastShownPage);
  }),

  isFirstPage: computed('currentPage', function() {
    return this.currentPage == 0;
  }),

  hasMorePages: computed('lastPage', 'currentPage', function() {
    const lastPage = this.lastPage;
    const currentPage = this.currentPage;

    return (currentPage + PAGES_AROUND_CURRENT) < lastPage;
  }),

  lastPage: computed('totalPages', function() {
    return Math.max( 0, this.totalPages - 1);
  }),

  actions: {
    selectPage( page ){
      const functor = this['on-change'];
      functor(page);
    }
  }
});
