//= require "../../lib/Class"

(function(){
	Actor = Class.extend({
		
		/**
		 * Constructor
		 */
		init: function( name /*String*/ ){
			this.name = name;
			this.facade;
		},
		
		/**
		 * Retrieve the unique name of the actor. This is required to be 
		 * registered to the framework.
		 */
		getName: function(){
			return this.name;
		},
		
		/**
		 * Sugar method to register a command instead of accessing this.facade 
		 * directly.
		 * 
		 * @param messageName Name of the message this command will respond to
		 * @param className Class name of the command which will be instantiated
		 * @return Boolean True if the command addition was successful
		 */
		registerCommand: function( messageName /*String*/, className /*Command*/ ){
			if( this.facade ){
				return this.facade.registerCommand( messageName, className );
			}
			return undefined;
		},
		
		/**
		 * Sugar method to remove a command instead of accessing this.facade 
		 * directly.
		 *
		 * @param messageName Name of the message to remove
		 */
		removeCommand: function( messageName /*String*/ ){
			if( this.facade ){
				return this.facade.removeCommand( messageName );
			}
			return undefined;
		},
		
		/**
		 * Sugar method to register a model instead of accessing this.facade 
		 * directly.
		 * 
		 * @param model Model instance to register
		 * @return Model The model if registration was successful
		 */
		registerModel: function( model /*Model*/ ){
			if( this.facade ){
				return this.facade.registerModel( model );
			}
			return undefined;
		},
		
		/**
		 * Sugar method to register a model instead of accessing this.facade 
		 * directly.
		 *
		 * @param name The name of the model to retrieve
		 * @return Model The model instance retrieved
		 */
		retrieveModel: function( name /*String*/ ){
			if( this.facade ){
				return this.facade.retrieveModel( name );
			}
			return undefined;
		},
		
		/**
		 * Sugar method to remove a model instead of accessing this.facade 
		 * directly.
		 *
		 * @param name The name of the model to remove
		 * @return Boolean True if removal was successful
		 */
		removeModel: function( name /*String*/ ){
			if( this.facade ){
				return this.facade.removeModel( name );
			}
			return undefined;
		},
		
		/**
		 * Sugar method to send a message to any framework actors who may be 
		 * listening instead of accessing this.facade directly.
		 * 
		 * @param name The name of the message to send
		 * @param body Optional body to send. Can be of any type
		 * @param type The string type of message to send
		 */
		sendMessage: function( name /*String*/, body /*Object*/, type /*String*/ ){
			if( this.facade ){
				return this.facade.sendMessage( name, body, type );
			}
			return undefined;
		},
		
		/**
		 * @private
		 * Called by the facade when the actor is registered.
		 *
		 * @param facade Facade instance the actor is registered
		 */
		_register: function( facade /*Facade*/ ){
			this.facade = facade;
		},
		
		/**
		 * @private
		 * Called by the facade when the actor is removed.
		 */
		_remove: function(){
			this.facade = null;
		}
	});
})();