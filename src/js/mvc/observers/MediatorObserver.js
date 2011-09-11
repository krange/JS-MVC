//= require "../actors/Actor"
//= require "../actors/Mediator"

(function(){
	MediatorObserver = Actor.extend({
		
		/**
		 * Constructor
		 */
		init: function(){
			this.mediators = {};
		},
		
		/**
		 * Registers a mediator.
		 *
		 * @param mediator The mediator to register
		 * @return Boolean True if registration was successful
		 */
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
		
		/**
		 *  Retrieves a mediator. If the name of the mediator already exists in 
		 * the framework, then the previous mediator replaced in the framework
		 * with the new one.
		 *
		 * @param name The name of the mediator to retrieve
		 * @return Mediator The mediator which was retrieved
		 */
		retrieveMediator: function( name /*String*/ ){
			if( name &&
				this.mediators[name] ){
				return this.mediators[name];
			}
			return undefined;
		},
		
		/**
		 * Removes a mediator.
		 *
		 * @param name The name of the mediator to remove
		 * @return Boolean True if the removal was successful
		 */
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