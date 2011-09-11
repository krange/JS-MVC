//= require "Actor"

(function(){
	Model = Actor.extend({
		
		/**
		 * Constructor
		 */
		init: function( name /*String*/, data /*Object*/ ){
			this._super( name );
			this.data = data;
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
		 * Retrieves the current data set by the model
		 * 
		 * @return Object The current data
		 */
		getData: function(){
			return this.data;
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
			this.onRemove();
			this._super( args );
		}
	});
})();