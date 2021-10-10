import Component from '@glimmer/component';

export default class SearchHitDetailsComponent extends Component {
    actions = {
        async copyHitHash() {
            await navigator.clipboard.writeText(this.args.hit.hash);
            return false;
        }
    }
}
