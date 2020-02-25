import './highlightRegex.test.js';

export default function highlightRegex(/** @type {String} */ value) {
  const tokens = [];
  let state;
  for (let index = 0; index < value.length; index++) {
    const char = value[index];
    let token = tokens[tokens.length - 1];
    switch (state) {
      case undefined: {
        switch (char) {
          case '/': {
            tokens.push({ type: 'plain', value: char });
            state = 'maybe-comment';
            break;
          }
          default: {
            index--;
            state = 'pattern';
          }
        }

        break;
      }
      case 'maybe-comment': {
        switch (char) {
          case '/': {
            token.type = 'comment';
            token.value += '/';
            state = 'comment';
            break;
          }
        }

        break;
      }
      case 'comment': {
        switch (char) {
          case '\n': {
            tokens.push({ type: 'newline', value: char });
            state = undefined;
            break;
          }
          default: {
            token.value += char;
          }
        }

        break;
      }
      case 'pattern': {
        switch (char) {
          case '(': {
            tokens.push({ type: 'paren', value: char });
            tokens.push(undefined);
            break;
          }
          case ')': {
            tokens.push({ type: 'paren', value: char });
            tokens.push(undefined);
            break;
          }
          case '\n': {
            if (!token) {
              tokens.pop();
            }

            tokens.push({ type: 'newline', value: char });
            state = undefined;
            break;
          }
          default: {
            if (!token || token.type !== 'pattern') {
              if (!token) {
                tokens.pop();
              }

              token = { type: 'pattern', value: '' };
              tokens.push(token);
            }

            token.value += char;
          }
        }

        break;
      }
      default: {
        throw new Error(`Unexpected state '${state}'.`);
      }
    }
  }

  // Handle no newline at the end of value
  if (tokens[tokens.length - 1] === undefined) {
    tokens.pop();
  }

  // TODO: Do this inline?
  for (const token of tokens) {
    switch (token.type) {
      case 'comment': {
        token.color = 'green';
        break;
      }
      case 'pattern': {
        token.color = 'maroon';
        break;
      }
      case 'paren': {
        token.fontWeight = 'bold';
        break;
      }
    }
  }

  return tokens;
}
