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

export { rangeInclusive };
