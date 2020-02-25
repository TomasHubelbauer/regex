import Editor from './Editor.js';
import highlightRegex from './highlightRegex.js';

customElements.define('th-editor', Editor);

window.addEventListener('load', () => {
  /** @type {Editor} */
  const patternEditor = document.getElementById('patternEditor');
  patternEditor.highlighter = highlightRegex;
  patternEditor.addEventListener('change', work);

  /** @type {Editor} */
  const codeEditor = document.getElementById('codeEditor');

  /** @type {Editor} */
  const textEditor = document.getElementById('textEditor');
  textEditor.addEventListener('change', work);

  /** @type {HTMLDivElement} */
  const matchDiv = document.getElementById('matchDiv');

  function work() {
    let pattern = '/';
    let code = `new RegExp(''\n  `;

    let lastToken;
    const tokens = highlightRegex(patternEditor.value);
    for (const token of tokens) {
      switch (token.type) {
        case 'comment': {
          code += token.value;
          break;
        }
        case 'newline': {
          if (lastToken.type !== 'comment') {
            code += '/.source,';
          }

          code += token.value + '  ';
          break;
        }
        case 'pattern': {
          if (lastToken.type === 'newline') {
            code += '/';
          }

          code += token.value;
          pattern += token.value;
          break;
        }
        case 'paren': {
          if (lastToken.type === 'newline') {
            code += '/';
          }

          code += token.value;
          pattern += token.value;
          break;
        }
        default: {
          throw new Error(`Unexpected token ${JSON.stringify(token)}.`);
        }
      }

      lastToken = token;
    }

    code = code.slice(0, -',\n  '.length);
    code += '\n);\n';
    pattern += '/g';

    // TODO: Display accoding to the multiple/single line switch
    // TODO: Highlight the value of this editor
    codeEditor.value = code + '\n' + pattern;

    try {
      const regex = new RegExp(pattern.slice('/'.length, -'/g'.length), 'g');
      let match;
      const fragment = document.createDocumentFragment();
      while (match = regex.exec(textEditor.value)) {
        const matchDiv = document.createElement('div');
        for (let index = 0; index < match.length; index++) {
          const groupButton = document.createElement('button');
          groupButton.textContent = match[index];
          matchDiv.append(groupButton);
        }

        fragment.append(matchDiv);
      }

      matchDiv.innerHTML = '';
      matchDiv.append(fragment);
    }
    catch (error) {
      matchDiv.textContent = error;
    }
  }

  // Load the demo content
  patternEditor.value = '// Opening bracket\n<\n// Tag name\n(\\w+)\n// Tag attributes\n[^>]+\n// Closing bracket\n>\n';
  textEditor.value = '<img /><a href="https://hubelbauer.net">Tomas Hubelbauer</a>';
});
