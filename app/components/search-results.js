import Component from '@ember/component';
import { A }  from '@ember/array';

export default Component.extend({
  openAllResults: false,
  alreadyPreviewdResults: A([]),

  actions: {
    addToAlreadyPreviewdResults(result) {
      this.alreadyPreviewdResults.forEach(res => {
        res.setOld();
      });
      this.alreadyPreviewdResults.push(result);
      result.setNew();
    }
  }
});
