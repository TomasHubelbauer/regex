import parsePattern from './parsePattern.js';

export default function* highlightRegex(/** @type {String} */ value) {
  for (const token of parsePattern(value)) {
    switch (token.type) {
      case 'newline': {
        yield { value: token.value };
        break;
      }
      case 'comment': {
        yield { value: token.value, color: 'green' };
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
            yield { value: part, color: 'black', fontWeight: 'bold' };
            continue;
          }

          yield { value: part, color: 'maroon' };
        }

        break;
      }
      default: {
        throw new Error(`Unexptected token type ${token.type}.`);
      }
    }
  }
}
