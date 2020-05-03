export default function hitKind(hit) {
  const type = hit.type;
  const mimetype = hit.mimetype;

  if( type === "directory" ) {
    return "directory";
  } else if( ! mimetype ) {
    return "file";
  } else if( mimetype.indexOf("image") === 0 ) {
    return "image";
  } else if( mimetype.indexOf("text") === 0 ) {
    return "text";
  } else if( mimetype.indexOf("video") === 0 ) {
    return "video";
  } else if( mimetype.indexOf("audio") === 0 ) {
    return "audio";
  } else {
    return "any";
  }
}
