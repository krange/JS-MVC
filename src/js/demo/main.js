//= require "ApplicationFacade"

(function(global, undefined){
	global.facade = new ApplicationFacade();
	facade.startup( $( '#container' )[0] );
})(window);
