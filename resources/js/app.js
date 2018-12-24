define([
    'd1',
    'goScroll'
], function ( d1, goScroll ) {
    'use strict';

    var w = window,
        d = w.document;

    return {

        util : d1,
        initial: {},
        views : {},
        data : {},
        mail: ['hello', 'dotburo', 'org'],
        resolution : Math.max( screen.width, screen.height ) * d1.scrDensity,
        hasHistory : w.history && w.history.pushState && w.history.state !== undefined,
        showingContact: 0,
        
        initialize : function ( initialState ) {
            
            this.initial = initialState;
            this.closeBtn = d.getElementById( 'btn-close' );
            this.contactBtn = d.getElementById( 'btn-contact' );

            this.track();
            this.setSizable();
            this.bindHandlers();
            this.load();
        },

        bindHandlers : function () {
            var self = this;
            this.closeBtn.addEventListener( 'click', function(e){
                e.preventDefault();
                self.closePage( 1 );
            });
            this.contactBtn.addEventListener( 'click', function(e){
                self.toggleContact( e.currentTarget );
                e.preventDefault();
            });
            w.addEventListener( 'resize', d1.debounce( function(){ self.setSizable(); }, 200 ));
        },
        
        load : function () {
            var self = this;
            if ( d.readyState === 'complete' ) {
                self.onLoad();
            } else {
                w.addEventListener( 'load', function () { self.onLoad(); } );
            }
        },

        onLoad : function () {
            var self = this;

            self.insertMail();

            if ( self.wWidth <= 780 ) {
                this.navMobile = d.getElementById( 'nav-mobile' );
                this.navMobile.addEventListener( 'click', function(e){
                    self.shiftPages(e);
                });
            }
        },

        insertMail : function () {
            var el = d.getElementById( 'mail' ),
                a = d.createElement( 'a' ),
                addr = this.mail[0] + '@' + this.mail[1] + '.' + this.mail[2],
                txt = d.createTextNode( addr );
            a.href = 'mailto:' + addr;
            a.appendChild( txt );
            el.appendChild( a );
        },

        /**
         * Push state.
         * @param state
         */
        setHistory : function ( state ) {

            state.time = (new Date()).getTime();
            this.resetDocument( state );

            if ( this.hasHistory ) {
                w.history.pushState( state, state.title, state.url );
            }
        },

        /**
         * Pop state
         * @param state
         */
        handlePopState : function ( state ) {

            state.time = (new Date()).getTime();
            this.resetDocument( state );

            if ( !state.id ) {
                this.closePage( 0 );
            } else {
                this.views.grid.launchPage( d.getElementById( state.id ), state );
            }
        },

        /**
         * Set doc title & send to Google Analytics.
         * @param state
         */
        resetDocument : function ( state ) {
            d.title = state.url === '/'
                ? this.initial.siteTitle
                : state.title + ' • ' + this.initial.siteTitle;

            if ( w._paq ) {
                w._paq.push(['setGenerationTimeMs', 0]);
                w._paq.push(['setCustomUrl', state.url]);
                w._paq.push(['setDocumentTitle', d.title]);
                w._paq.push(['trackPageView']);
            }
        },
        
        toggleCloseBtn : function ( show, test ) {
            if ( test ) {
                show = this.views.grid.activeColumn ? 1 : 0;
            }
            this.closeBtn.classList[ show ? 'remove' : 'add' ]( 'hide' );
        },

        closePage : function ( setHistory ) {
            this.toggleCloseBtn( 0 );
            this.views.grid.shrinkColumn();
            if ( setHistory ) {
                this.setHistory({
                    id : null,
                    title : this.initial.title,
                    url : '/'
                });
            }
        },

        toggleContact : function ( button ) {
            var self = this,
                scrollTo;

            if ( self.showingContact ) {
                scrollTo = 0;
                self.toggleCloseBtn( 1, true );
            } else {
                scrollTo = d.getElementById( 'pages' ).clientHeight;
                self.toggleContactVisibility( 1 );
                this.toggleCloseBtn( 0 );
            }

            self.showingContact = !self.showingContact;

            goScroll({
                to : scrollTo,
                speed: 3,
                context : d.getElementById( 'pages' ),
                callback : function () {
                    if ( !self.showingContact ) {
                        self.toggleContactVisibility(0);
                        button.innerHTML = 'contact';
                    } else {
                        button.innerHTML = 'back';
                    }
                }
            });
        },

        toggleContactVisibility : function ( show ) {
            d.getElementById('contact').parentNode.classList[ show ? 'remove' : 'add' ]( 'invisible' );
        },

        shiftPages : function ( e ) {
            var btn = e.target,
                id;

            if ( btn.tagName.toLowerCase() === 'button' ) {

                id = +btn.getAttribute('data-id');

                this.navMobile.querySelector('.active').classList.remove('active');

                if ( id !== this.currentPage ) {
                    this.currentPage = id;
                    this.toggleCloseBtn( 0 );
                    this.views.grid.shrinkColumn( id +1 );
                    w.history.replaceState( this.initial, this.initial.siteTitle, '/' );
                    this.views.grid.el.style.transform = 'translate3d(-'+(id*25)+'%,0,0)';
                    btn.classList.add('active');
                }
            }
        },

        setSizable : function () {
            this.wWidth = w.innerWidth;
            this.gridWidth = this.views.grid.el.clientWidth;
        },

        track : function () {
            var u="https://analytics.dotburo.org/",
                d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];

            g.type='text/javascript';
            g.async=true;
            g.defer=true;
            g.src=u+'piwik.js';

            w._paq = w._paq || [];
            w._paq.push(['trackPageView']);
            w._paq.push(['enableLinkTracking']);
            w._paq.push(['setTrackerUrl', u+'piwik.php']);
            w._paq.push(['setSiteId', '1']);

            s.parentNode.insertBefore(g,s);
        }
    };
});