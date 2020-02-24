window.addEventListener('load', () => {
  /** @type {HTMLTextAreaElement} */
  const regexTextArea = document.getElementById('regexTextArea');

  /** @type {HTMLDivElement} */
  const regexSyntaxHighlightDiv = document.getElementById('regexSyntaxHighlightDiv');

  /** @type {HTMLTextAreaElement} */
  const codeTextArea = document.getElementById('codeTextArea');

  /** @type {HTMLDivElement} */
  const codeSyntaxHighlightDiv = document.getElementById('codeSyntaxHighlightDiv');

  regexTextArea.addEventListener('input', handleRegexTextAreaInput);

  function handleRegexTextAreaInput() {
    const { regexFragment, codeFragment, codeLines } = process(regexTextArea.value);

    regexSyntaxHighlightDiv.innerHTML = '';
    regexSyntaxHighlightDiv.append(regexFragment);

    codeSyntaxHighlightDiv.innerHTML = '';
    codeSyntaxHighlightDiv.append(codeFragment);

    codeTextArea.value = codeLines.join('\n');
  }

  // Load the demo content
  regexTextArea.value = `
// Match the opening tag of a HTML table row element with optional attributes
<tr[^>]+>
// Match the first HTML table data element with the ID number
<td>(?<id>\\d+)</td>
// Match the second HTML table data element with the title
<td>(?<title>\w+)</td>
// Skip over the actions HTML table data element
<td>.*</td>
// Match the closing tag of a HTML table row element
<\\/tr>
`.trim();

  // Highlight and convert the initial value
  handleRegexTextAreaInput();
});

function process(/** @type {String} */ text) {
  const regexFragment = document.createDocumentFragment();

  const codeLines = [`new RegExp(''`];

  const codeFragment = document.createDocumentFragment();

  // TODO: Make this highlighted
  codeFragment.append(codeLines[0]);

  const lines = text.split('\n');
  for (const line of lines) {
    // Highlight a comment line
    if (line.startsWith('//')) {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'line comment';
      commentDiv.textContent = line;
      regexFragment.append(commentDiv);

      const code = '  ' + line;
      codeLines.push(code);

      const codeDiv = document.createElement('div');
      codeDiv.className = 'line comment';
      codeDiv.textContent = '  ' + line;
      codeFragment.append(codeDiv);
    }
    else {
      const regexDiv = document.createElement('div');
      regexDiv.className = 'line regex';

      let tokenSpan = document.createElement('span');
      for (let index = 0; index < line.length; index++) {
        const character = line[index];
        if (character === '(' || character === ')') {
          // Yield the span so far if it has any text
          if (tokenSpan.textContent) {
            regexDiv.append(tokenSpan);
          }

          // Yield a separate span for the paren token
          tokenSpan = document.createElement('span');
          tokenSpan.className = 'token paren';
          tokenSpan.textContent = character;
          regexDiv.append(tokenSpan);

          // Reset a regular span
          tokenSpan = document.createElement('span');
        }
        else {
          tokenSpan.textContent += character;
        }
      }

      // Yield the span so far if it has any text
      if (tokenSpan.textContent) {
        regexDiv.append(tokenSpan);
      }

      regexFragment.append(regexDiv);

      const code = `  + /${line}/.source`;
      codeLines.push(code);

      const codeDiv = document.createElement('div');
      codeDiv.className = 'line regex';
      codeDiv.textContent = code;
      codeFragment.append(codeDiv);
    }
  }

  const code = ');';
  codeLines.push(code);
  codeFragment.append(code);

  return { regexFragment, codeFragment, codeLines };
}
