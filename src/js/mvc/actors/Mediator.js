//= require "Actor"

(function(){
	Mediator = Actor.extend({
		
		/**
		 * Constructor
		 */
		init: function( name /*String*/, mediatorComponent /*DOM element*/ ){
			this._super( name );
			
			this.mediatorComponent = mediatorComponent;
			
			// Determine message interests as defined by functions in this class
			// instance that are prefixed with 'respondTo'
			this.messageInterests = [];
			for( var func in this ){
				if( func.indexOf( 'respondTo' ) == 0 ){
					var interest = func.substring(9);
					interest = interest.charAt(0).toLowerCase() + interest.slice(1);
					this.messageInterests[this.messageInterests.length] = interest;
				}
			}
		},
		
		/**
		 * Called by the facade once the mediator has been registered
		 */
		onRegister: function(){
		},
		
		/**
		 * Called by the facade once the mediator has been removed
		 */
		onRemove: function(){
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
		 * Retrieves all messages the mediator is interested in
		 *
		 * @return Array An array of all messages this mediator is interested in
		 */
		getMessageInterests: function(){
			return this.messageInterests;
		},
		
		/**
		 * @private
		 * Override
		 */
		_register: function( args ){
			this._super( args );
			this.onRegister();
		},
		
		/**
		 * @private
		 * Override
		 */
		_remove: function( args ){
			this.onRemove();;
			this._super( args );
		}
	});
})();