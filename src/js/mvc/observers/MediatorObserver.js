//= require "../actors/Actor"
//= require "../actors/Mediator"

(function(){
	MediatorObserver = Actor.extend({
		init: function(){
			this.mediators = {};
		},
		registerMediator: function( mediator /*Mediator*/ ){
			if( mediator &&
				mediator instanceof Mediator ){
				var mediatorName = mediator.getName();
				if( mediatorName && 
					mediatorName.length > 0 &&
					!this.mediators[mediatorName] ){
					this.mediators[mediatorName] = mediator
					mediator._register( this.facade );
					return mediator;
				}
			}
			return undefined;
		},
		retrieveMediator: function( name /*String*/ ){
			if( name &&
				this.mediators[name] ){
				return this.mediators[name];
			}
			return undefined;
		},
		removeMediator: function( name /*String*/ ){
			var mediator = this.retrieveMediator( name );
			if( mediator ){
				mediator._remove();
				delete this.mediators[mediator.getName()];
				return mediator;
			}
			return undefined;
		},
		getMediators: function(){
			return this.mediators;
		}
	});
})();