# Matthew Rowlandson's Portfolio Site

Technical portfolio site, highlighting technical knowledge, work & school experience, and personal projects.

Built using: HTML5, SASS, Bootstrap, Gulp@4

See live at [www.matthewrowlandson.com](https://www.matthewrowlandson.com)

## Development:

`npm install && gulp`

> installs dependencies, compiles sass and launches webserver. Auto reloads on changes made to `src` and `index.html`

Note: Modify `src` sass files only, `css` files are overwritten by gulp.

## Push git to production:

### Ensure remote is configured

Note: Ensure you've setup the git remote `live` for this to work, pointing at the live server. Also setup the git `hooks` on production.
`git remote add live root@<ip>/var/repo/matthewrowlandson.git`

### Push
`git push live`

> Pushes directly to production for live site.
