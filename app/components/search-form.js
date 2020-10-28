import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { localCopy } from 'tracked-toolbox';

export default class SearchFormComponent extends Component {
  @localCopy("args.search") search;
  @localCopy("args.kind") kind;

  kindMenu = [
    { kind: "any", label: "Any" },
    { kind: "text", label: "Text" },
    { kind: "audio", label: "Audio" },
    { kind: "video", label: "Video" },
    { kind: "directory", label: "Directory" },
    { kind: "image", label: "Image" },
  ]

  @action
  changeSearch(event){
    this.search = event.target.value;
  }

  @action
  changeKind(kind) {
    this.kind = kind;
    this.doSearch();
  }

  @action
  submit(event){
    event.preventDefault();
    this.doSearch();
  }

  doSearch(){
    this.args.onSearch({
      search: this.search,
      kind: this.kind
    });
  }
}
