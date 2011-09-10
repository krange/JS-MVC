//= require "../model/SomeModel"

(function(){
	ApplicationMediator = Mediator.extend({
		respondToApplicationLoadComplete: function( message /*Message*/ ){
			
			var someModel = this.facade.retrieveModel( SomeModel.NAME );
			if( someModel ){
				console.log( someModel.getData() );
			}
		}
	});
	ApplicationMediator.NAME = "ApplicationMediator";
})();
