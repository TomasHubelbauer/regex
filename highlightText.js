export default function highlightText(matches, selectedIndex) {
  return function* (/** @type {String} */ value) {
    let cursor = 0;
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      const gap = match.index - cursor;
      if (gap > 0) {
        yield { value: value.slice(cursor, match.index) };
      }

      yield { value: value.slice(match.index, match.index + match[0].length), color: index % 2 === 0 ? 'salmon' : 'olive', fontWeight: index === selectedIndex ? 'bold' : 'normal' };
      cursor = match.index + match[0].length;
    }

    const gap = value.length - cursor;
    if (gap > 0) {
      yield { value: value.slice(cursor) };
    }
  }
}
