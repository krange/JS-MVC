//= require "../model/SomeModel"
//= require "../view/ApplicationMediator"

(function(){
	StartupCommand = Command.extend({
		execute: function( message /*Message*/ ){
			
			// Remove initial startup command
			this.facade.removeCommand( 'startup' );
			
			// Register models
			var someModel = new SomeModel( SomeModel.NAME, { id : 23 } );
			this.facade.registerModel( someModel );
			
			// Register mediators
			var applicationMediator = new ApplicationMediator( ApplicationMediator.NAME, message.getBody() );
			this.facade.registerMediator( applicationMediator );
			
			// Send mesage that application has loaded
			this.facade.sendMessage( "applicationLoadComplete" );
		}
	});
})();
