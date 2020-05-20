# [Regex](https://tomashubelbauer.github.io/regex)

Regex is like regex101.com, but it supports named capture groups in JavaScript
and has a multi-line pattern editor and a code editor where the final pattern is
easy to copy.

## Running

Remotely: https://tomashubelbauer.github.io/regex

Locally:

- `index.html` if your browser allows `script[type="module"]` on `file://` protocol
- `npx serve .` and `localhost:5000` if it does not

## To-Do

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

### Fix div and text area scroll height differing when the editor is scrollable

The div and text area dimensions match, but their scroll heights do not. This
results in the selection area not mapping 1:1 between the two when the editor is
scrolled all the way to the point of their discrepancy (i.e. close to the bottom).

### Make panes collapsible on the mobile layout
