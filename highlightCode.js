export default function* highlightRegex(/** @type {String} */ value) {
  // Split into lines keeping the line break separators
  const lines = value.split(/(\r?\n)/g);

  // Special case the single-line format
  // TODO: Check the line ends with no or a valid combination of flags
  if (lines.length === 3 && (lines[0].startsWith('/')) && (lines[1] === '\n' || lines[1] === '\r\n') && lines[2] === '') {
    let line = lines[0];
    line = line.slice('/'.length);
    const index = line.lastIndexOf('/');
    if (index === -1) {
      throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
    }

    const flags = line.slice(index + 1);
    line = line.slice(0, index);
    yield { value: '/', fontWeight: 'bold' };
    yield { value: line, color: 'maroon' };
    yield { value: '/', fontWeight: 'bold' };
    yield { value: flags, fontWeight: 'bold' };
    yield { value: lines[1] };
    return;
  }

  for (let line of lines) {
    if (!line) {
      continue;
    }

    if (line === '\n' || line === '\r\n') {
      yield { value: line };
      continue;
    }

    if (line === `new RegExp(''`) {
      yield { value: 'new', color: 'blue' };
      yield { value: ' ' };
      yield { value: 'RegExp', color: 'purple' };
      yield { value: '(', fontWeight: 'bold' };
      yield { value: `''`, color: 'maroon' };
      continue;
    }

    if (line === ');') {
      yield { value: ')', fontWeight: 'bold' };
      yield { value: ';' };
      continue;
    }

    if (line.startsWith('  //')) {
      yield { value: line, color: 'green' };
      continue;
    }

    if (line.startsWith('  + /')) {
      line = line.slice('  + /'.length);
      yield { value: '  + ' };
      yield { value: '/', fontWeight: 'bold' };

      if (line.endsWith('/.source')) {
        line = line.slice(0, -'/.source'.length);
        yield { value: line, color: 'maroon' };
        yield { value: '/', fontWeight: 'bold' };
        yield { value: '.source' };
        continue;
      }

      if (line.endsWith('/.source,')) {
        line = line.slice(0, -'/.source,'.length);
        yield { value: line, color: 'maroon' };
        yield { value: '/', fontWeight: 'bold' };
        yield { value: '.source,' };
        continue;
      }

      throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
    }

    if (line.startsWith(`  , '`)) {
      line = line.slice('  , '.length);
      yield { value: '  , ' };

      if (!line.startsWith(`'`) || !line.endsWith(`'`)) {
        throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
      }

      // TODO: Check the line consists of no or a valid combination of flags
      line = line.slice(`'`.length, -`'`.length);
      yield { value: `'`, color: 'maroon' };
      yield { value: line, color: 'blue' };
      yield { value: `'`, color: 'maroon' };
      continue;
    }

    throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
  }
}
