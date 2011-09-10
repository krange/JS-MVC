//= require "../lib/Class"
//= require "observers/CommandObserver"
//= require "observers/ModelObserver"
//= require "observers/MediatorObserver"
//= require "messages/Message"
//= require "actors/Command"

(function(){
	Facade = Class.extend({
		init: function(){
			this.commandObserver = new CommandObserver();
			this.modelObserver = new ModelObserver();
			this.mediatorObserver = new MediatorObserver();
			
			this.commandObserver._register( this );
			this.modelObserver._register( this );
			this.mediatorObserver._register( this );
		},
		startup: function( element /*DOM element*/ ){
		},
		registerCommand: function( messageName /*String*/, className /*Command*/ ){
			return this.commandObserver.registerCommand( messageName, className );
		},
		removeCommand: function( messageName /*String*/ ){
			return this.commandObserver.removeCommand( messageName );
		},
		registerModel: function( model /*Model*/ ){
			return this.modelObserver.registerModel( model );
		},
		retrieveModel: function( name /*String*/ ){
			return this.modelObserver.retrieveModel( name );
		},
		removeModel: function( name /*String*/ ){
			return this.modelObserver.removeModel( name );
		},
		registerMediator: function( mediator /*Mediator*/){
			return this.mediatorObserver.registerMediator( mediator );
		},
		retrieveMediator: function( name /*String*/ ){
			return this.mediatorObserver.retrieveMediator( name );
		},
		removeMediator: function( name /*String*/ ){
			return this.mediatorObserver.removeMediator( name );
		},
		sendMessage: function( name /*String*/, body /*Object*/, type /*String*/ ){
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