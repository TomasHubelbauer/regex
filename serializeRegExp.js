export default function serializeRegExp(tokens, flags) {
  let value = '';
  for (const token of tokens) {
    switch (token.type) {
      case 'comment': {
        continue;
      }
      case 'newline': {
        continue;
      }
      case 'pattern': {
        value += token.value;
        break;
      }
      default: {
        throw new Error(`Unexpected token ${JSON.stringify(token)}.`);
      }
    }
  }

  return new RegExp(value, flags);
}
