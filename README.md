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

### Make the highlight work on diffs and have the editor send diffs in change

So that the highlight is responsible for updating, adding and deleting tokens
instead of us flushing the whole thing each time.

Do this in a new repo dedicated to the editor control based on diffs.

### Sync cursor between pattern and code so that it is always on the same char

### Implement text area "background" highlights - the text language highlighting

### Use a 1x4 layout on mobile as compared to 2x2 on desktop

Also make the individual grid areas collapsible by clicking
on their titles

### Detect selection in the editor and give it color

Hide the text corresponding to the selection range in the
backdrop syntax highlighted divs and make the selected text
visible using CSS `::selection` selector. This will make the
selection contrast OS-native. We need to hide the corresponding
highlighted characters otherwise they will interfere with the
subpixel antialiasing of the now-visible selected text.

### Simplify the editor to a bare text are with no div etc. if no highlighter

Will not be needed as at that point it is reduced to a normal textarea.

### Ignore named groups when constructing the pattern for the in-browser check

But emit them so that regexes can also be designed for Node where they are
supported.

### Test both the single line regex and the multiple lines regexen for validity

So that we can't notice if we broke the serialization of the multiple lines
regex.

### Fix titles not taking height despite the CSS rule (seen by the match area)

### Fix the site not loading on iOS Safari and editors not being focusable/visible
