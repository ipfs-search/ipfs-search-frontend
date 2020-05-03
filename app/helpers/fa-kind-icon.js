import { helper } from '@ember/component/helper';

export default helper(function faKindIcon([kind]/*, hash*/) {
  if( kind == "image" )
    return "fa-image";
  else if( kind == "video" )
    return "fa-video";
  else if( kind == "audio" )
    return "fa-volume-up";
  else if( kind == "directory" )
    return "fa-folder-open";
  else if( kind == "any" )
    return "fa-file-alt";
  else if( kind == "file" )
    return "fa-file";
  else
    return "fa-file-alt"; // fallback is same as any
});
