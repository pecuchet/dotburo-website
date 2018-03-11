define([], function () {
    'use strict';

    var w = window,
        d = w.document;

    w.handleGist = function(r) {
        d.getElementsByClassName('gist')[0].innerHTML = r.div;
    };

    function createHandler(id) {
        w['handleGist_' + id] = (function(id){
            return function(response){
                insertStyleSheet(response);
                insert(response, id);
            }
        })(id)
    }

    function insert(response, id) {
        var src = d.querySelector('.gist[src*="' + id + '"]'),
            wrap = d.createElement('div');
        wrap.innerHTML = response.div;
        src.parentNode.insertBefore(wrap, src.nextSibling);
        src.parentNode.removeChild(src);
    }

    function insertStyleSheet(response) {
        if (response.stylesheet && !d.querySelector('link[href="' + response.stylesheet + '"]')) {
            var linkTag = d.createElement('link'),
                head = d.getElementsByTagName('head')[0];
            linkTag.type = 'text/css';
            linkTag.rel = 'stylesheet';
            linkTag.href = response.stylesheet;
            head.insertBefore(linkTag, head.firstChild);
        }
    }

    function extractId(url) {
        return url.split('/').pop().replace(/\.js$/, '');
    }

    return function (src) {
        var id = extractId(src),
            tag = d.createElement('script');
        tag.src = 'https://gist.github.com/' + id + '.json?callback=handleGist_' + id;
        createHandler(id);
        d.body.appendChild(tag);
    }
});