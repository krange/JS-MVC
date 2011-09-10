//= require "../actors/Actor"
//= require "../actors/Command"

(function(){
	CommandObserver = Actor.extend({
		init: function(){
			this.commands = {};
		},
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
		removeCommand: function( messageName /*String*/ ){
			if( messageName &&
				this.commands[messageName] ){
				delete this.commands[messageName];
			}
		},
		getCommands: function(){
			return this.commands;
		}
	});
})();