# Regex

[**DEMO**](https://tomashubelbauer.github.io/regex)

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

### Make match grid area a list where clicking an item highlights in regex & text

### Refresh the result on text grid area content - reflect in the matches

### Make text grid area into an editor as well and highlight groups/matches in it

### Make the grid area titles in HTML not CSS by splitting grid area and editor

This will make it possible to add extra elements to the grid area title.

### Add a toggle between multiple and single line code output

Single-line mode strips comments. Right now both variants are shown at once.

### Add a copy to clipboard button to the code grid area

### Add a highlight selector to the text grid area

To make it easier to spot patterns to base the regex on in the text area.
Start off with HTML only or maybe HTML and CSS or something for the highlights.

### Add a UI for flags to the regex grid area title

Checkboxen for the various flags.

### Fix text are font not being applied in mobile Safari

### Fix mobile Safari crashing when clearing the textarea

### Use a 1x4 layout on mobile as compared to 2x2 on desktop

Also make the individual grid areas collapsible by clicking
on their titles
