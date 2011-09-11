//= require "../actors/Actor"
//= require "../actors/Command"

(function(){
	CommandObserver = Actor.extend({
		
		/**
		 * Constructor
		 */
		init: function(){
			this.commands = {};
		},
		
		/**
		 * Registers a command to respond to a specific message.
		 * 
		 * @param messageName Name of the message this command will respond to
		 * @param className Class name of the command which will be instantiated
		 * @return Boolean True if the command addition was successful
		 */
		registerCommand: function( messageName /*String*/, className /*Command*/ ){
			if( messageName &&
				className ){
				var messages = [];
				if( this.commands[messageName] ){
					messages = this.commands[messageName];
				}
				messages[messages.length] = className;
				this.commands[messageName] = messages;
				return true;
			}
			return false;
		},
		
		/**
		 * Removes commands from responding to messages. If multiple commands 
		 * are registered to the same message, all commands will be removed.
		 *
		 * @param messageName Name of the message to remove
		 */
		removeCommand: function( messageName /*String*/ ){
			if( messageName &&
				this.commands[messageName] ){
				delete this.commands[messageName];
				return true;
			}
			return false;
		},
		
		/**
		 * Retrieves all commands registered in the observer
		 *
		 * @return Array All commands registered
		 */
		getCommands: function(){
			return this.commands;
		}
	});
})();