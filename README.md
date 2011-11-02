### I wrote this semantic event delegation script to replace a legacy system. While the performance of this module has been surprising at times, please be aware that there is an inherent limitation with using semantic event delegation in that you must trade performance for having functionality descriptors in markup. ###

Usage:

In order to use semantic event delegation, there needs to be a particular namespace where delegated functions are located. The parent of this namespace is what is provided to this script.

For example, if your application has a namespace of `App`, then it should contain an object namespace called `actions` (basically `App.actions = { };`).

Methods can then be added to this container:

	// In some application bootstrapping file:
	// End of delegation script:
	})( App );

	// Set up what events are delegated on the page:
	App.delegate( 'click' );

	// Register actions namespace:
    App.actions = {};

    // In your view-specific JS file:
    (function ( actions ) {
    	
    	actions.doSomething = function ( e ) {
    	};

    })( App.actions )

    // In your markup
    <div data-click="doSomething"></div>

And that's all there is to it. Clicking inside this `div` will cause the `doSomething` method to execute, and it's context set to the `div`. No need to wire up or register events. You can even execute multiple methods on the element:

 	<div data-click="doSomething doSomethingElse"></div>

The delegates mocks the bubbling process, so parent methods are also invoked:

	<div data-click="outerDoSomething">
		<div data-click="innerDoSomething"></div>
	</div>

"Bubbling" can be stopped so parent methods aren't executed by returning false from the child/inner method:

	(function ( actions ) {
		
		actions.innerDoSomething = function ( e ) {
			if (someCondition) {
				// Now parent methods won't execute
				return false;
			}	
		};

		actions.outerDoSomethign = function ( e ) {
			// This method won't be invoked if someCondition above is true
		}

	})( App.actions );

Inside of a delegated method, `this` is a reference to the element for which the method was executed. For example, with this markup:

	<div data-click="doSomething"></div>

	actions.doSomething = function ( e ) {
		// this is the element with the data-click attribute that triggered this method

		// You also have a reference to the original event, useful for mouse and keyboard events, etc.
	}

That's pretty much it. There are advantages and disadvantages to using this technique, so please evaluate your situation before using a delegation system like this. Thanks.