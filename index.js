import Editor from './Editor.js';
import highlightPattern from './highlightPattern.js';
import highlightCode from './highlightCode.js';
import highlightText from './highlightText.js';
import parsePattern from './parsePattern.js';
import serializeMultipleLinesCode from './serializeMultipleLinesCode.js';
import serializeSingleLinesCode from './serializeSingleLinesCode.js';
import serializeRegExp from './serializeRegExp.js';

customElements.define('th-editor', Editor);

window.addEventListener('load', () => {
  /** @type {Editor} */
  const patternEditor = document.getElementById('patternEditor');
  patternEditor.highlighter = highlightPattern;
  patternEditor.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const gFlagInput = document.getElementById('gFlagInput');
  gFlagInput.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const iFlagInput = document.getElementById('iFlagInput');
  iFlagInput.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const mFlagInput = document.getElementById('mFlagInput');
  mFlagInput.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const sFlagInput = document.getElementById('sFlagInput');
  sFlagInput.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const uFlagInput = document.getElementById('uFlagInput');
  uFlagInput.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const yFlagInput = document.getElementById('yFlagInput');
  yFlagInput.addEventListener('change', work);

  /** @type {Editor} */
  const codeEditor = document.getElementById('codeEditor');
  codeEditor.highlighter = highlightCode;

  /** @type {HTMLInputElement} */
  const multipleLinesInput = document.getElementById('multipleLinesInput');
  multipleLinesInput.addEventListener('change', work);

  /** @type {HTMLInputElement} */
  const singleLinesInput = document.getElementById('singleLinesInput');
  singleLinesInput.addEventListener('change', work);

  /** @type {Editor} */
  const textEditor = document.getElementById('textEditor');
  textEditor.addEventListener('change', work);

  /** @type {HTMLDivElement} */
  const matchDiv = document.getElementById('matchDiv');

  /** @type {HTMLSpanElement} */
  const cursorSpan = document.getElementById('cursorSpan');

  /** @type {HTMLButtonElement} */
  const prevButton = document.getElementById('prevButton');
  prevButton.addEventListener('click', handlePrevButtonClick);

  /** @type {HTMLButtonElement} */
  const nextButton = document.getElementById('nextButton');
  nextButton.addEventListener('click', handleNextButtonClick);

  /** @type {HTMLSpanElement} */
  const perfSpan = document.getElementById('perfSpan');

  let index = 0;

  function work() {
    if (patternEditor.value.length === 0) {
      codeEditor.value = '';
      cursorSpan.textContent = '';
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    let flags = '';

    if (gFlagInput.checked) {
      flags += 'g';
    }

    if (iFlagInput.checked) {
      flags += 'i';
    }

    if (mFlagInput.checked) {
      flags += 'm';
    }

    if (sFlagInput.checked) {
      flags += 's';
    }

    if (uFlagInput.checked) {
      flags += 'u';
    }

    if (yFlagInput.checked) {
      flags += 'y';
    }

    const tokens = [...parsePattern(patternEditor.value)];
    if (multipleLinesInput.checked) {
      codeEditor.value = serializeMultipleLinesCode(tokens, flags);
    }
    else {
      codeEditor.value = serializeSingleLinesCode(tokens, flags);
    }

    try {
      const regex = serializeRegExp(tokens, flags);

      const matches = [];
      let match;
      const stamp = performance.now();
      while (match = regex.exec(textEditor.value)) {
        matches.push(match);
      }

      perfSpan.textContent = `${~~(performance.now() - stamp)} ms`;

      const matchOl = document.createElement('ol');
      for (let matchIndex = 0; matchIndex < matches.length; matchIndex++) {
        const match = matches[matchIndex];

        const matchLi = document.createElement('li');
        matchLi.className = index === matchIndex ? 'selected' : '';
        const matchButton = document.createElement('button');
        matchButton.dataset._index = index;
        matchButton.dataset.index = match.index;
        matchButton.dataset.length = match[0].length;
        matchButton.textContent = match[0];
        matchButton.addEventListener('click', handleMatchButtonClick);
        matchLi.append(matchButton);
        matchLi.append(` ${match.index}-${match.index + match[0].length} (${match[0].length})`);

        if (match.length > 1) {
          const groupOl = document.createElement('ol');
          for (let index = 1; index < match.length; index++) {
            const groupLi = document.createElement('li');
            groupLi.textContent = match[index];
            groupOl.append(groupLi);
          }

          matchLi.append(groupOl);
        }


        matchOl.append(matchLi);
      }

      matchDiv.innerHTML = '';
      matchDiv.append(matchOl);

      // Reset index if it has gone out of range since the last match
      if (index >= matches.length) {
        index = 0;
      }

      cursorSpan.textContent = `${index + 1} / ${matches.length}`;

      prevButton.disabled = index === 0;
      if (!prevButton.disabled) {
        prevButton.dataset.index = matches[index - 1].index;
        prevButton.dataset.length = matches[index - 1][0].length;
      }

      nextButton.disabled = index === matches.length - 1;
      if (!nextButton.disabled) {
        nextButton.dataset.index = matches[index + 1].index;
        nextButton.dataset.length = matches[index + 1][0].length;
      }

      textEditor.removeEventListener('change', work);
      textEditor.highlighter = highlightText(matches, index);
      textEditor.addEventListener('change', work);
    }
    catch (error) {
      matchDiv.textContent = error;
      cursorSpan.textContent = '';
    }
  }

  function handleMatchButtonClick(event) {
    const { index, length } = event.currentTarget.dataset;
    textEditor.select(Number(index), Number(length));
    work();
  }

  function handlePrevButtonClick(event) {
    index--;
    handleMatchButtonClick(event);
    work();
  }

  function handleNextButtonClick(event) {
    index++;
    handleMatchButtonClick(event);
    work();
  }

  // Load the demo content
  patternEditor.value = '// Opening bracket\n<\n// Tag name\n(\\w+)\n// Tag attributes\n[^>]+\n// Closing bracket\n>\n';
  textEditor.value = '<img />&nbsp;<a href="https://hubelbauer.net">Tomas Hubelbauer</a>\n'.repeat(10);
});
