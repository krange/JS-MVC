//= require "../actors/Actor"
//= require "../actors/View"

(function(){
	ViewObserver = Actor.extend({
		init: function(){
			this.views = {};
		},
		registerView: function( view /*View*/ ){
			if( view &&
				view instanceof View ){
				var viewName = view.getName();
				if( viewName && 
					viewName.length > 0 &&
					!this.views[viewName] ){
					this.views[viewName] = view
					view._register( this.facade );
					return view;
				}
			}
			return undefined;
		},
		retrieveView: function( name /*String*/ ){
			if( name &&
				this.views[name] ){
				return this.views[name];
			}
			return undefined;
		},
		removeView: function( name /*String*/ ){
			var view = this.retrieveView( name );
			if( view ){
				view._remove();
				delete this.views[view.getName()];
				return view;
			}
			return undefined;
		},
		getViews: function(){
			return this.views;
		}
	});
})();