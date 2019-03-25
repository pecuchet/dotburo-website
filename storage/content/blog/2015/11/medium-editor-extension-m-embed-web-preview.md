/*
Title: Embedding link previews in Medium Editor (M-Embed)
Date: 2015-11-19
Modified: 2018-03-24
Read: 1
*/

[Axel Cleeremans' project](https://dotburo.org/axel-cleeremans/){rel=noopener} is a Laravel back-end with a custom "single page application" admin dashboard.
In the admin I used the inline text editor [Medium Editor](https://yabwe.github.io/medium-editor/){target=_blank rel=noopener} 
to provide the author with rich tools to edit the posts and pages of his website.

One of the requirements of the project however, was the ability to embed *link previews* of web pages &mdash; 
much like one shares web content on Facebook. Since that feature isn’t built-in in Medium Editor, I decided to
develop an extension for it.  

After a lengthy research I came up with the suitable and original name for the plugin: “M-Embed”. It adds one button to 
the inline Medium Editor toolbar which enables to edit the currently selected URL or to embed it directly into the current
contenteditable area. A [demo of the extension](https://pecuchet.github.io/m-embed/){target=_blank rel=noopener} 
as well as [the source code](https://github.com/pecuchet/m-embed){target=_blank rel=noopener} are available on Github.  

The data of the URL to embed is fetched through [Embedly](http://embed.ly/cards), which handles the parsing and caching of the requested resource.
<span class="txt-st">Luckily [Embedly](http://embed.ly/cards) has a free basic plan which is sufficient for my purposes.</span> 
(March 24th, 2018 EDIT: it seems the service is no longer offering the free plan, or not under the same terms and with the same usability). With Embedly I don’t need to rely
solely on OEmbed or HTML meta tags, instead I can rely on the service to receive rich meta data about the web location.  
