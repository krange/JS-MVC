//= require "../../lib/Class"

(function(){
	Actor = Class.extend({
		init: function( name /*String*/ ){
			this.name = name;
			this.facade;
		},
		getName: function(){
			return this.name;
		},
		_register: function( facade /*Facade*/ ){
			this.facade = facade;
		},
		_remove: function(){
			this.facade = null;
		}
	});
})();