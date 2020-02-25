import highlightRegex from './highlightRegex.js';

void function test() {
  const actual = highlightRegex('// Opening bracket\n<\n// Tag name\n(?<name>\\w+)\n// Tag attributes\n[^>]+\n// Closing bracket\n(>|/>)\n');
  const expected = [
    {
      "type": "comment",
      "value": "// Opening bracket",
      "color": "green"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "pattern",
      "value": "<",
      "color": "maroon"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "comment",
      "value": "// Tag name",
      "color": "green"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "paren",
      "value": "(",
      "fontWeight": "bold"
    },
    {
      "type": "pattern",
      "value": "?<name>\\w+",
      "color": "maroon"
    },
    {
      "type": "paren",
      "value": ")",
      "fontWeight": "bold"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "comment",
      "value": "// Tag attributes",
      "color": "green"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "pattern",
      "value": "[^>]+",
      "color": "maroon"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "comment",
      "value": "// Closing bracket",
      "color": "green"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "paren",
      "value": "(",
      "fontWeight": "bold"
    },
    {
      "type": "pattern",
      "value": ">|/>",
      "color": "maroon"
    },
    {
      "type": "paren",
      "value": ")",
      "fontWeight": "bold"
    },
    {
      "type": "newline",
      "value": "\n"
    }
  ];

  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.log(JSON.stringify(actual, null, 2));
    throw new Error('Failed to parse');
  }
}()
