export default function serializeMultipleLinesCode(tokens, flags) {
  let value = `new RegExp(''\n`;
  for (const token of tokens) {
    if (!token.value) {
      continue;
    }

    switch (token.type) {
      case 'comment': {
        value += '  ' + token.value;
        break;
      }
      case 'newline': {
        value += token.value;
        break;
      }
      case 'pattern': {
        value += `  + /${token.value}/.source`;
        break;
      }
      default: {
        throw new Error(`Unexpected token ${JSON.stringify(token)}.`);
      }
    }
  }

  value += `  , '${flags}'\n);\n`;
  return value;
}
