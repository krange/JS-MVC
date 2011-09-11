//= require "../actors/Actor"
//= require "../actors/Model"

(function(){
	ModelObserver = Actor.extend({
		
		/**
		 * Constructor
		 */
		init: function(){
			this.models = {};
		},
		
		/**
		 * Registers a model. If the name of the model already exists in the
		 * framework, then the previous model replaced in the framework
		 * with the new one.
		 * 
		 * @param model Model instance to register
		 * @return Model The model if registration was successful
		 */
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
		
		/**
		 * Retrieves a model.
		 *
		 * @param name The name of the model to retrieve
		 * @return Model The model instance retrieved
		 */
		retrieveModel: function( name /*String*/ ){
			if( name &&
				this.models[name] ){
				return this.models[name];
			}
			return undefined;
		},
		
		/**
		 * Removes a model.
		 *
		 * @param name The name of the model to remove
		 * @return Boolean True if removal was successful
		 */
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