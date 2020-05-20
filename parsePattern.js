export default function* parseRegex(/** @type {String} */ value) {
  // Split into lines keeping the line break separators
  const lines = value.split(/(\r?\n)/g);
  for (const line of lines) {
    if (line === '\n' || line === '\r\n') {
      yield { value: line, type: 'newline' };
      continue;
    }

    if (line.startsWith('//')) {
      yield { value: line, type: 'comment' };
      continue;
    }

    if (line.startsWith('/*') && line.endsWith('*/')) {
      yield { value: line, type: 'comment' };
      continue;
    }

    yield { value: line, type: 'pattern' };
  }
}
