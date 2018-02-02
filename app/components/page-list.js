import { computed } from '@ember/object';
import Component from '@ember/component';

const PAGES_AROUND_CURRENT = 3;

/**
 * Returns an array from start to end, both inclusive.
 * If end is not greater than start, resultList is
 * returned.
 */
function rangeInclusive( start, end ){
  const resultList = [];
  if( ! end > start )
    return resultList;

  for (let i = start; i <= end; i++) {
    resultList.push(i);
  }
  return resultList;
}

export default Component.extend({
  pagesBeforeMe: computed('totalPages', 'currentPage', function() {
    const currentPage = this.get('currentPage');
    const firstPage = Math.max( currentPage - PAGES_AROUND_CURRENT, 0 );
    return rangeInclusive( firstPage, currentPage - 1 );
  }),
  pagesAfterMe: computed('totalPages', 'currentPage', function() {
    const totalPages = this.get('totalPages');
    const lastPage = this.get('lastPage');
    const currentPage = this.get('currentPage');
    const lastShownPage = Math.min( currentPage + PAGES_AROUND_CURRENT, lastPage);
    return rangeInclusive(currentPage + 1 , lastShownPage);
  }),
  lastPage: computed('totalPages', function() {
    return Math.max( 0, this.get('totalPages') - 1);
  }),
  actions: {
    selectPage( page ){
      const functor = this.get('on-change');
      functor(page);
    }
  }
});
