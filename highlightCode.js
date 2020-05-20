export default function highlightRegex(editor) {
  // Split into lines keeping the line break separators
  const lines = editor.value.split(/(\r?\n)/g);
  let index = 0;

  for (let line of lines) {
    if (!line) {
      continue;
    }

    if (line === '\n' || line === '\r\n') {
      index += line.length;
      continue;
    }

    // Special case the single-line format
    // TODO: Check the line ends with no or a valid combination of flags
    if (line.match(/^\/.*\/[gimsuy]+$/)) {
      editor.highlight(index, index + '/'.length, 'gray');
      index += '/'.length;

      const indexEnd = line.lastIndexOf('/');
      if (indexEnd === -1) {
        throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
      }

      const length = indexEnd - 1;
      editor.highlight(index, index + length, 'maroon');
      index += length;

      editor.highlight(index, index + '/'.length, 'gray');
      index += '/'.length;

      const flags = line.slice(indexEnd + 1);
      editor.highlight(index, index + flags.length, 'blue');
      index += flags.length;

      continue;
    }

    if (line === `new RegExp(''`) {
      editor.highlight(index, index + 'new'.length, 'blue');
      index += 'new'.length;

      index += ' '.length;

      editor.highlight(index, index + 'RegExp'.length, 'purple');
      index += 'RegExp'.length;

      editor.highlight(index, index + '('.length, 'gray');
      index += '('.length;

      editor.highlight(index, index + `''`.length, 'maroon');
      index += `''`.length;

      continue;
    }

    if (line === ');') {
      editor.highlight(index, index + ')'.length, 'gray');
      index += ')'.length;

      index += ';'.length;

      continue;
    }

    if (line.startsWith('  //')) {
      editor.highlight(index, index + line.length, 'green');
      index += line.length;
      continue;
    }

    if (line.startsWith('  + /')) {
      index += '  + '.length;

      editor.highlight(index, index + '/'.length, 'gray');
      index += '/'.length;

      if (line.endsWith('/.source')) {
        const length = line.length - '  + /'.length - '/.source'.length;

        editor.highlight(index, index + length, 'maroon');
        index += length;

        editor.highlight(index, index + '/'.length, 'gray');
        index += '/'.length;

        index += '.source'.length;

        continue;
      }

      throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
    }

    if (line.startsWith(`  , '`)) {
      index += `  , `.length;

      if (line[`  , `.length] !== `'` || line[line.length - 1] !== `'`) {
        throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
      }

      editor.highlight(index, index + `'`.length, 'maroon');
      index += `'`.length;

      // TODO: Check the line consists of no or a valid combination of flags
      const length = line.length - `  , '`.length - `'`.length;
      editor.highlight(index, index + length, 'blue');
      index += length;

      editor.highlight(index, index + `'`.length, 'maroon');
      index += `'`.length;

      continue;
    }

    throw new Error(`Unexpected code line ${JSON.stringify(line)}.`);
  }
}
