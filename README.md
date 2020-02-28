# Regex

[**DEMO**](https://tomashubelbauer.github.io/regex)

Like Regex101.com, but supports named groups and generates a copy-paste ready
multi-line formatted regex.

## Running

`npx serve .` (need a server due to the use of `script[type="module"]`)

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

### Pull out the editor and make its event and highlighting diff-based

The editor will start empty and every interaction with it will be reported and
used as a diff of the previous value. There will be a helper to serialize it to
the full value (which will just report the inner memoized value), but the
highlighters will work by starting with the empty value and then generating an
array of token instances on which futher operations will be executed (like
inserting text at a cursor which is contained in the token) and operations which
happen between tokens or after the last token will be invoked on the highlighter
still. The highlighter is responsible for generating instances which will have
the correct implementation of methods for handling these diff operations.

Also, it is impossible to make formatting fully work with a selection as the
selection happens on the text area not the div, but in case all the tokens in
the selection share the same format (bold or italic), it is safe to set the
formatting on the whole textarea since the unselected text will remain
transparent so in effect only the selection will have that formatting.

In case no highlighter is configured for the editor, do not even have the render
surface div and just downgrade it to a regular text area element.

### Sync cursor between pattern and code so that it is always on the same char

### Implement text area "background" highlights - the text language highlighting

### Use a 1x4 layout on mobile as compared to 2x2 on desktop

Also make the individual grid areas collapsible by clicking
on their titles

### Ignore named groups when constructing the pattern for the in-browser check

But emit them so that regexes can also be designed for Node where they are
supported.

### Test both the single line regex and the multiple lines regexen for validity

So that we can't notice if we broke the serialization of the multiple lines
regex.

### Fix the site not loading on iOS Safari and editors not being focusable/visible
