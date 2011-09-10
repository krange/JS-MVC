//= require "controller/StartupCommand"

(function(){
	ApplicationFacade = Facade.extend({
		startup: function(el /*DOM element*/){
			this.registerCommand( 'startup', StartupCommand );
			this.sendMessage( 'startup', el );
		}
	});
})();
