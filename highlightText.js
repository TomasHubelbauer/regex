export default function highlightText(editor, matches, selectedMatchIndex) {
  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    editor.highlight(match.index, match.index + match[0].length, selectedMatchIndex === index ? 'red' : (index % 2 === 0 ? 'salmon' : 'olive'));
  }
}
