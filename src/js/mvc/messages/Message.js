//= require "../../lib/Class"

(function(){
	Message = Class.extend({
		init: function(name /*String*/,body /*Object*/,type /*String*/){
			this.name = name;
			this.body = body;
			this.type = type;
		},
		getName: function(){
			return this.name;
		},
		getBody: function(){
			return this.body;
		},
		getType: function(){
			return this.type;
		}
	});
})();