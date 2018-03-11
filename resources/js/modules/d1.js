define([], function () {
    'use strict';

    var w = window,
        navigator = w.navigator,
        D = {
            scrDensity: 'devicePixelRatio' in w ? w.devicePixelRatio : 1,
            isTouch: 'ontouchstart' in w || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
        };

    /*
     |--------------------------------------------------------------------------
     | Utilities
     |--------------------------------------------------------------------------
     |
     |
     */

    D.isIE9 = function () {
        var nav = navigator.userAgent.toLowerCase();
        return ( nav.indexOf('msie') !== -1 ) ? parseInt( nav.split('msie')[1] ) === 9 : false;
    };

    D.debounce = function (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    /*
     |--------------------------------------------------------------------------
     | DOM functions
     |--------------------------------------------------------------------------
     |
     |
     */

    D.parent = function( element, tagname ) {
        tagname = tagname.toLowerCase();
        do {
            if (element.tagName.toLowerCase() === tagname)
                return element;
        } while (element = element.parentNode);
        return null;
    };

    D.elementArray = function ( nodeList ) {
        return Array.prototype.slice.call( nodeList );
    };

    D.elementIndex = function ( node ) {
        var index = 0;
        while ( node = node.previousElementSibling ) {
            index++;
        }
        return index;
    };

    return D;
});