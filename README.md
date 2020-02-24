# Regex

Like Regex101.com, but supports named groups and generates a copy-paste ready
multi-line formatted regex.

## Usage

Type your regex, e.g.:

```javascript
// Start of the row
<tr>
// The data cell
<td>\d+</td>
// End of the row
<\/td>
```

You can split the regex into multiple lines. The newline character does not
become a part of the regex. You can also use JavaScript comments which will
become a part of the output regex:

```javascript
new RegExp(''
  // Start of the row
  + /<tr>/.source,
  // The data cell
  + /<td>\d+</td>/.source,
  // End of the row
  + /<\/td>/.source,
);
```

## To-Do

### Extract the editor component idea out because it is extremely neat

### Sync text area and highlight div scrolls

### Sync cursor between the two text areas so that it is always on the same char

### Expand syntax highlighting of the regex (both sides) and the JS code prelude

### Implement the match grid area

Clicking on a match selects the regex grid area portion corresponding to it.

### Implement the text grid area

### Make the grid area titles in HTML not CSS by splitting grid area and editor

This will make it possible to add extra elements to the grid area title.

### Add a toggle between multiple and single line code output

Single-line mode strips comments.

### Add a copy button to the code grid area

### Add a highlight selector to the text grid area

To make it easier to spot patterns to base the regex on in the text area.
Start off with HTML only or maybe HTML and CSS or something for the highlights.
