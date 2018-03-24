/*
Title: Go-scroll-to upgraded to ES6
Date: 2017-10-03
Modified: 2017-10-03
Read: 1
Keywords: javascript, es6
*/

Our lightweight page scrolling package go-scroll-to has been rewritten as 
a javascript ES6 module&mdash;support for older browsers has been definitely dropped.  
<br>
Apart from that the same features are still present: it's **stoppable**, it scrolls **by a given speed** instead of a duration, 
and **to a specified position or element**, either in the context of the whole page or **any scrollable element**.  
<br>
You can do ``goScroll()`` to scroll to the top of the page without further ado, or you can specify some options, 
like speed, scroll context and an element to scroll to:  
<br>
```
goScroll({
    speed: .3,
    to: document.getElementById('element'),
    context: document.getElementById('scrollable')
});
```  
<br>
Check the <a href="https://github.com/pecuchet/go-scroll-to" target="_blank" rel="noopener">github repo</a>
or <a href="https://www.npmjs.com/package/go-scroll-to" target="_blank" rel="noopener">npm</a>
for installation and usage details.


