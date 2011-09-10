//= require "Actor"

(function(){
	Mediator = Actor.extend({
		init: function( name /*String*/, mediatorComponent /*DOM element*/ ){
			this._super( name );
			
			this.mediatorComponent = mediatorComponent;
			
			// Determine message interests
			this.messageInterests = [];
			for( var func in this ){
				if( func.indexOf( 'respondTo' ) == 0 ){
					var interest = func.substring(9);
					interest = interest.charAt(0).toLowerCase() + interest.slice(1);
					this.messageInterests[this.messageInterests.length] = interest;
				}
			}
		},
		onRegister: function(){
			//console.log( 'onRegister', this );
		},
		onRemove: function(){
			//console.log( 'onRemove', this );
		},
		
		getMessageInterests: function(){
			return this.messageInterests;
		},
		
		_register: function( args ){
			this._super( args );
			this.onRegister();
		},
		_remove: function( args ){
			this.onRemove();;
			this._super( args );
		}
	});
})();