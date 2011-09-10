JS-MVC
=======

# Introduction

JS-MVC is an beta experiment in a lightweight JavaScript MVC architecture that I figured I would upload. I really enjoy using PureMVC (ActionScript and Objective-C) but did not enjoy the JavaScript port and its dependencies. So, I decided to spend some time one night and right something a bit simplier. This interpretation is similiar architectually but with some additional adaptions and uses John Resig's JavaScript Class implementation for inheritence.

# Usage

### Facade

First step is to create and extend the Facade class. This provides the entrance into the framework and starts everything up. To start, override the startup method, provide the root level dom element that your application will work with. You can then either create an view to hold this element or pass it to some sort of startup command.

Commands, Models and Mediators are provided access to the facade directly by accessing the variable *this.facade*. This enables any actor in the framework access to register, retrieve or remove any other actor. 

**Note**: It is not recommended, for example, to register, retrieve or remove a Mediator for example directly from a Model. The programming gods might send you directly to hell for that!

#### ApplicationFacade.js

```js
ApplicationFacade = Facade.extend({
	startup: function(element){
		this.facade.registerCommand( 'startup', StartupCommand );
	}
});
```

### Commands

Commands execute your user interactions and interact with the models. To create a command, extend the Command class and override the execute method. Simple!

#### SomeCommand.js

```js
(function(){
	StartupCommand = Command.extend({
		execute: function( message /*Message*/ ){
			// Register main view
			var applicationMediator = new ApplicationMediator( ApplicationMediator.NAME, message.getBody() );
			this.facade.registerView( applicationMediator );
		}
	});
})();
```

### Models

Models store your data and your business/domain logic to interact with them. To create a model, extend the Model class. 

In order for the application to find the model when requested, you can either create a static *NAME* variable which you pass in on instantiation or override the *getName* method and return your own name structure that could be a bit more dynamic.

Data is provided through the *this.data* property. The rest is up to you!

#### SomeModel.js

```js
(function(){
	SomeModel = Model.extend({
		outputTheDataToTheConsole: function(){
			console.log( this.data );
		}
	});
	SomeModel.NAME = "SomeModel";
})();
```

### Mediators

Mediators are the interface between your views and the application framework. You should only listen for events/signals in mediators from your views which then interact directly with the dom. 

In order for the application to find the mediator when requested, you can either create a static *NAME* variable which you pass in on instantiation or override the *getName* method and return your own name structure that could be a bit more dynamic.

When a message is sent out in the framework, mediators can listen to them directly by adding a function named *respondTo[MessageName]*. For example, if you are sending out a mesage named *applicationLoadComplete*, a medaitor could listen to that command by adding the prefix **respondTo** and the mesasge (first letter capitalized). The full function would then be named **respondToApplicationLoadComplete**. The function will always be passed 1 argument which is a *Message*

#### ApplicationMediator.js

```js
(function(){
	ApplicationMediator = Mediator.extend({
		onRegister: function(){
			// Do something
		},
		respondToSomeMessage: function( message /*Message*/ ){
			var someModel = this.facade.retrieveModel( SomeModel.NAME );
		}
	});
	ApplicationMediator.NAME = "ApplicationMediator";
})();
```

### Messages

Notification is such a long word to write. Message is much easier and faster. Same basic principle, an actor sends out a mesasge that other actors are listening and can respond to. A *Message* takes 3 parameters ( name, body, type ) but only *name* is required.

```js
(function(){
	StartupCommand = Command.extend({
		execute: function( message /*Message*/ ){
			this.sendMessage( "applicationLoadComplete" );
		}
	});
})();
```

### Tying it all together

Create a 'main' style class and instantiate your facade with your provided application level dom element you would like to work with. If everything else is set up, you should be on your way!

You can either run this all within one single JavaScript file or run your own dependency-management suite to concatenate and minimize. For this beta, I have used Sprockets and YUI-Compressor, which are a nice combination!

#### main.js

```js
var facade = new ApplicationFacade();
facade.startup( $( '#container' )[0] );
```