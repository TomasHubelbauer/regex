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

### Add two more panes making a grid layout: test text and match list

### Expand syntax highlighting of the regex (both sides) and the JS code prelude
