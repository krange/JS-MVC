//= require "../lib/Class"
//= require "observers/CommandObserver"
//= require "observers/ModelObserver"
//= require "observers/MediatorObserver"
//= require "messages/Message"
//= require "actors/Command"

(function(){
	Facade = Class.extend({
		
		/**
		 * Constructor
		 */
		init: function(){
			this.commandObserver = new CommandObserver();
			this.modelObserver = new ModelObserver();
			this.mediatorObserver = new MediatorObserver();
			
			this.commandObserver._register( this );
			this.modelObserver._register( this );
			this.mediatorObserver._register( this );
		},
		
		/**
		 * Provides ability to start up the framework after all initialization 
		 * tasks have completed.
		 * 
		 * @param element Application root DOM element
		 */
		startup: function( element /*DOM element*/ ){
		},
		
		/**
		 * Registers a command to respond to a specific message.
		 * 
		 * @param messageName Name of the message this command will respond to
		 * @param className Class name of the command which will be instantiated
		 * @return Boolean True if the command addition was successful
		 */
		registerCommand: function( messageName /*String*/, className /*Command*/ ){
			return this.commandObserver.registerCommand( messageName, className );
		},
		
		/**
		 * Removes commands from responding to messages. If multiple commands 
		 * are registered to the same message, all commands will be removed.
		 *
		 * @param messageName Name of the message to remove
		 */
		removeCommand: function( messageName /*String*/ ){
			return this.commandObserver.removeCommand( messageName );
		},
		
		/**
		 * Registers a model. If the name of the model already exists in the
		 * framework, then the previous model replaced in the framework
		 * with the new one.
		 * 
		 * @param model Model instance to register
		 * @return Model The model if registration was successful
		 */
		registerModel: function( model /*Model*/ ){
			return this.modelObserver.registerModel( model );
		},
		
		/**
		 * Retrieves a model.
		 *
		 * @param name The name of the model to retrieve
		 * @return Model The model instance retrieved
		 */
		retrieveModel: function( name /*String*/ ){
			return this.modelObserver.retrieveModel( name );
		},
		
		/**
		 * Removes a model.
		 *
		 * @param name The name of the model to remove
		 * @return Boolean True if removal was successful
		 */
		removeModel: function( name /*String*/ ){
			return this.modelObserver.removeModel( name );
		},
		
		/**
		 * Registers a mediator.
		 *
		 * @param mediator The mediator to register
		 * @return Boolean True if registration was successful
		 */
		registerMediator: function( mediator /*Mediator*/){
			return this.mediatorObserver.registerMediator( mediator );
		},
		
		/**
		 * Retrieves a mediator. If the name of the mediator already exists in 
		 * the framework, then the previous mediator replaced in the framework
		 * with the new one.
		 *
		 * @param name The name of the mediator to retrieve
		 * @return Mediator The mediator which was retrieved
		 */
		retrieveMediator: function( name /*String*/ ){
			return this.mediatorObserver.retrieveMediator( name );
		},
		
		/**
		 * Removes a mediator.
		 *
		 * @param name The name of the mediator to remove
		 * @return Boolean True if the removal was successful
		 */
		removeMediator: function( name /*String*/ ){
			return this.mediatorObserver.removeMediator( name );
		},
		
		/**
		 * Sends a message to any framework actors who may be listening. This 
		 * includes commands and mediators. Models are excluded from this 
		 * functionality.
		 * 
		 * @param name The name of the message to send
		 * @param body Optional body to send. Can be of any type
		 * @param type The string type of message to send
		 */
		sendMessage: function( name /*String*/, body /*Object*/, type /*String*/ ){
			
			// Instantiate the message
			var message = new Message( name, body, type );
			
			// Loop through commands
			var commands = this.commandObserver.getCommands();
			for( var commandMessageName in commands ){
				if( name == commandMessageName ){
					var commandArr = commands[commandMessageName];
					var commandArrLen = commandArr.length;
					for( var i = 0; i < commandArrLen; i++ ){
						var command = new commandArr[i];
						if( command instanceof Command ){
							command._register( this );
							command.execute( message );
						}
					}
					break;
				}
			}
			
			// Loop through mediators
			var mediators = this.mediatorObserver.getMediators();
			for( var mediator in mediators ){
				var interests = mediators[mediator].getMessageInterests();
				var interestsLen = interests.length;
				for( var i = 0; i < interestsLen; i++ ){
					var interest = interests[i];
					if( name == interest )
					{
						interest = interests[i].charAt(0).toUpperCase() + interest.slice(1);
						mediators[mediator][ 'respondTo' + interest ]( message );
					}
				}
			}
		}
	});
})();