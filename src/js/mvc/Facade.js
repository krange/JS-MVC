//= require "../lib/Class"
//= require  observers/CommandObserver"
//= require "observers/ModelObserver"
//= require "observers/ViewObserver"
//= require "messages/Message"

(function(){
	Facade = Class.extend({
		init: function(){
			this.commandObserver = new CommandObserver();
			this.modelObserver = new ModelObserver();
			this.viewObserver = new ViewObserver();
			
			this.commandObserver._register( this );
			this.modelObserver._register( this );
			this.viewObserver._register( this );
		},
		startup: function(el /*DOM element*/){
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
		registerView: function( view /*View*/){
			return this.viewObserver.registerView( view );
		},
		retrieveView: function( name /*String*/ ){
			return this.viewObserver.retrieveView( name );
		},
		removeView: function( name /*String*/ ){
			return this.viewObserver.removeView( name );
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
						command._register( this );
						command.execute( message );
					}
					break;
				}
			}
			
			// Loop through views
			var views = this.viewObserver.getViews();
			for( var view in views ){
				var interests = views[view].getMessageInterests();
				var interestsLen = interests.length;
				for( var i = 0; i < interestsLen; i++ ){
					var interest = interests[i];
					if( name == interest )
					{
						views[view][ interests[i] ]( message );
					}
				}
			}
		}
	});
})();