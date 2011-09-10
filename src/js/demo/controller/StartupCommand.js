//= require "../model/SomeModel"
//= require "../view/ApplicationView"

(function(){
	StartupCommand = Command.extend({
		execute: function( message /*Message*/ ){
			
			// Remove initial startup command
			this.facade.removeCommand( 'startup' );
			
			// Register models
			var someModel = new SomeModel( SomeModel.NAME, { id : 23 } );
			this.facade.registerModel( someModel );
			
			// Register views
			var applicationView = new ApplicationView( ApplicationView.NAME, message.getBody() );
			this.facade.registerView( applicationView );
			
			// Send mesage that application has loaded
			this.facade.sendMessage( "applicationLoadComplete" );
		}
	});
})();
