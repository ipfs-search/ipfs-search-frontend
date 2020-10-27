import types from './../utils/types';

export default function hitKind(hit) {
  const type = hit.type;
  const mimetype = hit.mimetype;

  if (type === "directory") {
    return "directory";
  }

  // No mimetype set; generic 'file'
  if (!mimetype) {
    return "file";
  }
  console.log(mimetype)

  let kind ='any';
  Object.keys(types).some(k => {
    // TODO; create cache of matchers
    if (types[k].some(m => {
        console.log(mimetype, m);
        const matcher = new RegExp(m.replace('*', '.*'))
        const r = matcher.test(mimetype);
        console.log(r);
        return r;
      })) {
      console.log(k);
      // One matches, return
      kind = k;
      return true;
    }
  });

  return kind;
}
