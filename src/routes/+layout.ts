// Static-site flags: every route is baked at build time into HTML, and all
// URLs carry a trailing slash so GitHub Pages serves `index.html` from each
// directory without redirects.
export const prerender = true;
export const trailingSlash = 'always';
