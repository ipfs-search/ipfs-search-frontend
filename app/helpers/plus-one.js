import { helper } from '@ember/component/helper';

export function plusOne([value]) {
  return value + 1;
}

export default helper(plusOne);
