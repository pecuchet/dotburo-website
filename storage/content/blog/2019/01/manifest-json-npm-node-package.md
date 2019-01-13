/*
Title: Minimani references web assets with a cache busting suffix in a manifest.json file
Date: 2019-01-13
Modified: 2019-01-13
Read: 1
Keywords: node, npm, manifest
*/
For small web projects installing and configuring Webpack, or even Gulp or Grunt, can sometimes be overkill. A handful npm scripts could be enough. 
Minimani will reference files in a manifest file appending a timestamp to them and deleting the previously referenced one.  

<br>
## Examples

A simple npm script may look like this:  
```
"scripts": {
  "build:css": "cleancss -o css/index.min.css css/index.css && minimani index.css:css/index.min.css"
}
```
<br>
Cleancss contatenates and minifies your css to a new file called `index.min.css` located in a `css` folder; 
minimani will then use that file to create the following manifest file:  
```
{"index.css": "css/index.min.1547379363884.css"}
```
<br>
If you have multiple entry points to your project with, for instance, a js file for a dashboard application  as well as one for a client app,
you can branch out the json and pretty-print it along the way.  
`minimani -p dashboard:index.js:css/index.min.js` will generate:  
```
{
  "dashboard": {
    "index.js": "css/index.min.1547379363884.js"
  }
}
```

