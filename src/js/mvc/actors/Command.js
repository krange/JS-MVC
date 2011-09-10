//= require "Actor"

(function(){
	Command = Actor.extend({
		init: function( name /*String*/ ){
			this._super( name );
		},
		execute: function( message /*Message*/ ){
			//console.log( 'execute', this );
		},
		onRemove: function(){
			//console.log( 'onRemove', this );
		},
		
		_register: function( args ){
			this._super( args );
		},
		_remove: function( args ){
			this.onRemove();
			this._super( args );
		}
	});
})();