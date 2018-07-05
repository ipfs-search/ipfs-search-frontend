import { computed } from '@ember/object';
import Component from '@ember/component';
import { rangeInclusive } from 'ipfs-search/utils/array-helpers';

const PAGES_AROUND_CURRENT = 3;

export default Component.extend({
  pagesBeforeMe: computed('currentPage', function() {
    const currentPage = this.get('currentPage');
    const firstPage = Math.max( currentPage - PAGES_AROUND_CURRENT, 1 );
    return rangeInclusive( firstPage, currentPage - 1 );
  }),
  pagesAfterMe: computed('lastPage', 'currentPage', function() {
    const lastPage = this.get('lastPage');
    const currentPage = this.get('currentPage');
    const lastShownPage = Math.min( currentPage + PAGES_AROUND_CURRENT, lastPage);
    return rangeInclusive(currentPage + 1 , lastShownPage);
  }),
  isFirstPage: computed('currentPage', function() {
    return this.get('currentPage') == 0;
  }),
  hasMorePages: computed('lastPage', 'currentPage', function() {
    const lastPage = this.get('lastPage');
    const currentPage = this.get('currentPage');

    return (currentPage + PAGES_AROUND_CURRENT) < lastPage;
  }),
  lastPage: computed('totalPages', function() {
    return Math.max( 0, this.get('totalPages') - 1);
  }),
  actions: {
    selectPage( page ){
      console.log(`Selecting page ${page}`);
      const functor = this.get('on-change');
      functor(page);
    }
  }
});
