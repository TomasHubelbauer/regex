export default function serializeMultipleLinesCode(tokens, flags) {
  let value = '/';
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

  value += `/${flags}\n`;
  return value;
}
