//= require "../../lib/Class"

(function(){
	Message = Class.extend({
		
		/**
		 * Constructor
		 */
		init: function( name /*String*/, body /*Object*/, type /*String*/ ){
			this.name = name;
			this.body = body;
			this.type = type;
		},
		
		/**
		 * Retrieve the message name
		 * 
		 * @return String Name of the message
		 */
		getName: function(){
			return this.name;
		},
		
		/**
		 * Retrieve the message body
		 * 
		 * @return Object Data of the message
		 */
		getBody: function(){
			return this.body;
		},
		
		/**
		 * Retrieve the message type
		 * 
		 * @return String Type of the message
		 */
		getType: function(){
			return this.type;
		}
	});
})();