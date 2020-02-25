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

### Implement the match navigation buttons

### Make the highlight work on diffs and have the editor send diffs in change

So that the highlight is responsible for updating, adding and deleting tokens
instead of us flushing the whole thing each time.

### Sync text area and highlight div scrolls

### Sync cursor between the two text areas so that it is always on the same char

### Expand syntax highlighting of the regex (both sides) and the JS code prelude

### Make match grid area a list where clicking an item highlights in regex & text

### Highlight groups/matches in the text editor

### Implement the toggle between multiple and single line code output

Single-line mode strips comments. Right now both variants are shown at once.

### Implement the copy to clipboard button to the code grid area

### Implement the highlight selector of the text grid area

To make it easier to spot patterns to base the regex on in the text area.
Start off with HTML only or maybe HTML and CSS or something for the highlights.

### Implement the checkboxen for flags to the regex grid area title

### Fix text are font not being applied in mobile Safari

### Fix mobile Safari crashing when clearing the textarea

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

### Fix iOS Safari highlight and text area texts not matching

iOS Safari probably enforces a minimal font height which is less
than what I have in my CSS now.

### Simplify the editor to a bare text are with no div etc. if no highlighter

Will not be needed as at that point it is reduced to a normal textarea.

### Use the parser project I have elsewhere for the highlighters

### Make code editor readonly

### Find the way to reuse the highliter tokens between the editor and the change callsite

So that we don't have to call it again in `work`. Probably pass the tokens in
the event? And when the highlighter gets diff-based pass the resolved full token
array?
