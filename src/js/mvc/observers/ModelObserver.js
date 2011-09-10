//= require "../actors/Actor"
//= require "../actors/Model"

(function(){
	ModelObserver = Actor.extend({
		init: function(){
			this.models = {};
		},
		registerModel: function( model /*Model*/ ){
			if( model &&
				model instanceof Model ){
				var modelName = model.getName();
				if( modelName && 
					modelName.length > 0 &&
					!this.models[modelName] ){
					this.models[modelName] = model
					model._register( this.facade );
					return model;
				}
			}
			return undefined;
		},
		retrieveModel: function( name /*String*/ ){
			if( name &&
				this.models[name] ){
				return this.models[name];
			}
			return undefined;
		},
		removeModel: function( name /*String*/ ){
			var model = this.retrieveModel( name );
			if( model ){
				model._remove();
				delete this.models[model.getName()];
				return model;
			}
			return undefined;
		}
	});
})();