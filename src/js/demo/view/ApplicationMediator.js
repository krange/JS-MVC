//= require "../model/SomeModel"

(function(){
	ApplicationView = View.extend({
		respondToApplicationLoadComplete: function( message /*Message*/ ){
			
			var someModel = this.facade.retrieveModel( SomeModel.NAME );
			if( someModel ){
				console.log( someModel.getData() );
			}
		}
	});
	ApplicationView.NAME = "ApplicationView";
})();
