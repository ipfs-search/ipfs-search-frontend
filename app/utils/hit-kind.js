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

  let kind ='any';
  Object.keys(types).some(k => {
    // TODO; create cache of matchers
    if (types[k].some(m => {
        const matcher = new RegExp(m.replace('*', '.*'))
        const r = matcher.test(mimetype);
        return r;
      })) {
      // One matches, return
      kind = k;
      return true;
    }
  });

  return kind;
}
