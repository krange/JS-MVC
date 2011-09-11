//= require "Actor"

(function(){
	Command = Actor.extend({
		
		/**
		 * Constructor
		 */
		init: function( name /*String*/ ){
			this._super( name );
		},
		
		/**
		 * Called when a message this sent out to the application that this
		 * command should respond to.
		 * 
		 * @param message Message instance being sent to the command
		 */
		execute: function( message /*Message*/ ){
			//console.log( 'execute', this );
		},
		
		/**
		 * Sugar method to register a mediator instead of accessing this.facade 
		 * directly.
		 *
		 * @param mediator The mediator to register
		 * @return Boolean True if registration was successful
		 */
		registerMediator: function( mediator /*Mediator*/){
			if( this.facade ){
				return this.facade.registerMediator( mediator );
			}
		},
		
		/**
		 * Sugar method to retrieve a mediator instead of accessing this.facade 
		 * directly.
		 *
		 * @param name The name of the mediator to retrieve
		 * @return Mediator The mediator which was retrieved
		 */
		retrieveMediator: function( name /*String*/ ){
			if( this.facade ){
				return this.facade.retrieveMediator( name );
			}
		},
		
		/**
		 * Sugar method to remove a mediator instead of accessing this.facade 
		 * directly.
		 *
		 * @param name The name of the mediator to remove
		 * @return Boolean True if the removal was successful
		 */
		removeMediator: function( name /*String*/ ){
			if( this.facade ){
				return this.facade.retrieveMediator( name );
			}
		},
		
		/**
		 * @private
		 * Override
		 */
		_register: function( args ){
			this._super( args );
		},
		
		/**
		 * @private
		 * Override
		 */
		_remove: function( args ){
			this.onRemove();
			this._super( args );
		}
	});
})();