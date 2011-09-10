//= require "Actor"

(function(){
	Model = Actor.extend({
		init: function( name /*String*/, data /*Object*/ ){
			this._super( name );
			this.data = data;
		},
		onRegister: function(){
			//console.log( 'onRegister', this );
		},
		onRemove: function(){
			//console.log( 'onRemove', this );
		},
		getData: function(){
			return this.data;
		},
		
		_register: function( args ){
			this._super( args );
			this.onRegister();
		},
		_remove: function( args ){
			this.onRemove();
			this._super( args );
		}
	});
})();