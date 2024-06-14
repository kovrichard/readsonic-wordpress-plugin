# Official ReadSonic WordPress Plugin

Official WordPress plugin for [ReadSonic](https://readsonic.io).

## Files

- `index.js` - Block entry point with settings and block registration.
- `edit.js` - Block edit component in the Gutenberg editor.
    + React component with form fields for editing the block.
- `save.js` - The static HTML that gets saved in the database.
    + This is served on the front-end when the block is rendered.
- `view.js` - Handles JavaScript for the block in the front-end.
