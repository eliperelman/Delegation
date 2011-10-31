/*
* Semantic Event Delegation
*
* Copyright 2011, Eli Perelman
* Licensed under the GPL Version 3 license.
* http://www.gnu.org/licenses/gpl-3.0.html
*
*/
/*jshint curly: true, eqeqeq: true, noarg: true, undef: true, strict: true */

(function ( ns ) {
	if ( ns ) {
		// This is the master delegate function. This method will execute every
		// time that a delegated event is triggered (e.g. click, dblclick, etc.).
		var delegate = function ( event /* click, dblclick, etc. */) {
			// Cache the event and DOM element. Feature detect browsers that don't
			// pass in the native event or target element.
			var e = event || window.event,
				element = e.target || e.srcElement,
				type = e.type,
				attrName = 'data-' + type,
				attrValue,
				events,
				i,
				l,
				expression;

			// Delegation works best with the bubbling phase, so we are going to 
			// simulate that action here. Once we have the target element, walk
			// up the DOM tree and execute its relevant actions for the current
			// event.
			while ( element && element.getAttribute ) {
				if ( attrValue = element.getAttribute( attrName ) ) {
					events = attrValue.split( ' ' );

					for ( i = 0, l = events.length; i < l; i++ ) {
						expression = ns.actions[ events[ i ] ];

						// Execute the expression. If the expression explicitly returns false,
						// quit walking up the DOM tree and exit.
						if ( typeof expression === 'function' && expression.call( element, e ) === false ) {
							return;
						}
					}
				}

				// As long as execution hasn't been stopped, continue walking up the DOM tree
				// until we eventually reach the document.
				element = element.parentNode;
			}
		};
	
		ns.delegate = function ( eventType ) {
			document[ 'on' + eventType ] = delegate;
		};

		ns.undelegate = function ( eventType ) {
			delete document[ 'on' + eventType ];
		};
	}
})();