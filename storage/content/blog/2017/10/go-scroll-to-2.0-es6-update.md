/*
Title: Go-scroll-to upgraded to ES6
Date: 2017-10-03
Modified: 2018-04-11
Read: 1
Keywords: javascript, es6
*/

Our lightweight scrolling package *go-scroll-to* has been rewritten as 
a javascript ES6 module &mdash; support for older browsers has been definitely dropped.

The same features are still present: it's **stoppable**, it scrolls **by a given speed** instead of a duration, 
and **to a specified position or to an element**, either in the context of the document or of **any scrollable element**.  

You just call the exported function without parameters to scroll to the top of the page, or you can specify some options, 
like speed, scroll context and an element to scroll to:  

```
import scroll from 'go-scroll-to';

// to top of the page
scroll();

// to an elemnt inside another one
scroll({
    to: document.getElementById('element'),
    context: document.getElementById('scrollable'),
    speed: .3
});
```  

Do check the [github repository](https://github.com/pecuchet/go-scroll-to){target=_blank rel=noopener}
or [npm](https://www.npmjs.com/package/go-scroll-to){target=_blank rel=noopener}
for installation and usage details.
