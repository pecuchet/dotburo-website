;(function (w) {
    'use strict';

    var d = w.document,
        loc = w.location,
        pathname = loc.pathname;

    require.config({
        baseUrl: '/resources/js',
        paths: {
            xhr: "vendor/xhr",
            goScroll: "vendor/goScroll",
            d1: "modules/d1",

            app: "app",
            templates: "modules/pageTpl",
            Grid: "modules/Grid",
            Page: "modules/Page",
            gistHandle: "modules/gist-handle"
        }
    });

    require(['app', 'Grid', 'Page'], function (app, Grid, Page) {
        var isWin = !w.navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i),
            state = {
                pageLoad: 1,
                isSingle: pathname !== '/' && pathname !== '/index.php' && !d.getElementsByClassName('.err-404').length,
                siteTitle: d.getElementById('site-title').getAttribute('content'),
                title: d.title,
                url: loc.href
            };

        if (isWin) d.body.classList.add('is-win');

        d.body.classList.add(app.util.isTouch ? 'is-touch' : 'no-touch');

        // History handling
        if (app.hasHistory) {
            // On pop state launch view
            w.addEventListener('popstate', function (e) {
                // prevent pop state on first load for Safari & Chrome 34-
                if (!e.state) return;
                app.handlePopState(e.state);
            });

            // Replace initial state to store the initial content so we can revisit it later.
            w.history.replaceState(state, state.title, state.url);
        }

        // Set up grid
        app.views.grid = new Grid({
            el: d.getElementById('grid')
        });

        // Start
        app.initialize(state);

        // Set up the page, if needed
        if (state.isSingle) {
            app.views.page = new Page({}, state);
            app.views.grid.shiftGrid(d.querySelector('.col.open'), /(blog)/.test(pathname));
            app.views.grid.onColumnExpanded();
        }

        app.initial.pageLoad = 0;
    });
})(window);