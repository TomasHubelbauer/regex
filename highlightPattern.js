import parsePattern from './parsePattern.js';

export default function highlightRegex(editor) {
  let index = 0;
  for (const token of parsePattern(editor.value)) {
    switch (token.type) {
      case 'newline': {
        index += token.value.length;
        break;
      }
      case 'comment': {
        editor.highlight(index, index + token.value.length, 'green');
        index += token.value.length;
        break;
      }

      // TODO: Highlight parens
      case 'pattern': {
        const parts = token.value.split(/(\(|\))/g);
        for (const part of parts) {
          // Ignore empties among neighbored parens
          if (!part) {
            continue;
          }

          if (part === '(' || part === ')') {
            editor.highlight(index, index + part.length, 'gray');
            index += part.length;
            continue;
          }

          editor.highlight(index, index + part.length, 'maroon');
          index += part.length;
        }

        break;
      }
      default: {
        throw new Error(`Unexptected token type ${token.type}.`);
      }
    }
  }
}
