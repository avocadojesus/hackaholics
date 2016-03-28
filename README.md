# Hackaholics

Welcome to Hackaholics! We are an organization providing support for computer engineers at all competency levels and specializations. This website both serves as a tool for communicating and broadcasting information about our meetup, as well as for serving as a sandbox for the engineers coming into our app. For this reason, the app is built to scale as both a backend node api, as well as a scalable front end for writing applications at various levels of complexity.


## Quick Start
`note:` This tutorial assumes that you have the following technologies installed (with links to the quick start for each one)
* [node](https://nodejs.org/en/download/)

in the command line of your choice, do the following
```bash
cd /path/to/where/you/want/this/project # changes into a new folder
git clone https://github.com/avocadojesus/hackaholics.git # clones our code repository
cd hackaholics # changes into the newly-created folder
git checkout development # checks out the base branch for our app
npm install # installs all dependancies (from package.json)
gulp # bundles our front-end application (necessary for react apps)
```

At this point, gulp will be running on a continuous process, so you will need to open a new tab in your command line to launch your server.
```bash
# in a new terminal tab/window
cd /path/to/hackaholics
node index.js
```

## Contributing
Contributing to hackaholics is easy! the repo is public, although that does not mean anyone can merge code in. Anyone is free to clone the repo and modify their local copies, but you must make a pull request to us to actually get the code merged in. Here is an example of how to do so (assuming you have already followed the quick start guidelines)  
* create an issue in our [github repo](https://github.com/avocadojesus/hackaholics/issues/new) (this makes it easy for us to track the intended activity on our application)  
* in your command line, create a new branch, using   [gitflow](http://nvie.com/posts/a-successful-git-branching-model/) to structure your branch name. assuming your issue number was `62` and your issue name was `make my bio`, you should do the following:
```bash
cd /path/to/hackaholics
git checkout -b 'feature/#62-make-my-bio'
```  
* make changes to your local copy of the application  
* publish those changes
```bash
git push --set-upstream origin feature/#62-make-my-bio
```  
** NOTE: you can also just type `git push`. Git will automatically recognize that you have not published this branch yet, and will print out the command i listed above for you so you can just copy-paste.
* navigate to your branch in our [github repo](https://github.com/avocadojesus/hackaholics) and click the `create pull request` button.  
* explain in the comment box what modifications you have made.  
* notify one of the moderators on slack, or else wait for the code to get merged in.  

This will launch your server on port `3069`. To view, open your web browser and point to `http://localhost:3069` to view the application.  

## Generating a new member
Members are listed by running the `members` command. To view the inner-workings of this, you can view the file located at `/public/app/commands/bin/members.js`

to generate a member:
```bash
$ cd /path/to/hackaholics
$ npm run gen-member
```

this will launch a prompt, which eventually populates some boiler-plate code into public/app/members/your-member-name/index.js. Once this is done, you will need to re-run `gulp` to load in the new files. You will not have to do this on update, only on creation of a new member. To view this member's bio, you could then run `members -u me`. Also, note that you do not have to return any [jsx](https://facebook.github.io/react/docs/jsx-in-depth.html) here. You can simply return a string if you like. Whatever you return here will be printed in the prompt.

generated code:
```js
// public/app/members/me.js
var React = require('react')
exports.name = "me"
exports.description = "my description"
exports.bio = function() {
  return <div>im shy damnit</div>
}
```

## Generating a new command
Commands are the things which are executed when someone interacts with the prompt built into the Hackaholics webapp. commands include `ls`, `manifesto`, `members`, `members -u username`

to create a new command
```bash
$ cd /path/to/hackaholics
$ npm run gen-command
```

this will launch a prompt, which eventually populates some boiler-plate code into public/app/commands/bin/your-command-name.js. Once this is done, you will need to re-run `gulp` to load in the new files. You will not have to do this on update, only on creation of a new command.

generated code:
```js
// public/app/commands/bin/my-command/my-command.js
var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument

exports.name = "my-command"
exports.description = "tells you what i think"
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  return "i told you already, i'm shy, damnit"
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
```

## Infrastructure
The Hackaholics site can be separated into two fundamental sections. One is for the backend service (run by an node/express stack), and the other is for a front-end stack (built in react/react-router/flux design pattern)

### Back End
Analyzing the backend app, you will focus primarily on the following files:

* `package.json` - a place where all of our backend and frontend packages are listed. central to the npm package manager
* `index.js` - the launch file for our backend
* `app/controllers` - location of controllers being served by our backend
* `app/views` - location of all views served by our backend
* `config/application.js` - location for application-specific vars
* `config/routes.js` - map for controller routing

#### Routing
While our backend is built to scale, it is primarily serving a wildcard route which redirects everything to the same launch file for our front end. Any routes which will need to override the default will need to happen above the wildcard route, like so:

```javascript
// config/routes.js
...
exports.init = function() {
  app.get('/my/custom/route', function(req, res) {
    return MyController.customRoute(req, res)
  });

  app.get('*', function(req, res) {
    return PagesController.home(req, res)
  });
  ...
}
```

#### Controllers
Controllers come second in our stack (after the routing layer). In a typical MVC framework, the controller is responsible for:

* collecting request variables
* authenticating the request (usually delegated to a policy service)
* collecting database info (usuall delegated to the model layer)
* serializing that model data (converting it to a format appropriate for your front end to use. This should be done through a separate service)
* returning that data to a view (delegated to the view layer)

While this is certainly true of our application, it is also worth noting that our application does not currently require any backend data to operate on, so our controller simply skips to the very last step (calling a view). However, if our application does grow to elevating levels of complexity, we may turn out needing an authentication system, a model layer, a database, a policy layer, and a serialization layer. Note that while the controller is **responsible** for these actions, it should also **delegate** the actual tasks to separate layers, so as to maintain a [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) coding practice.

#### Views
Views are responsible for governing the front-end interactions. This is the primary area of discussion for our current application, as it is a front-end application, but the discussion for that can be found in our front end documentation. In this application, our view is simply loading a bundled version of our front-end application, which is entirely composed of javascript, which then renders all of the contents of our application.

The view, in this case, would be responsible for taking any backend data (sent by the controller), and ensuring that that data is funneled into our application. Again, since our app does not have any backend data to process, this is currently unnecessary.

### Front End
While our application contains many different technologies, it is built primarily on the following:
* [ReactRouter](https://github.com/reactjs/react-router)
* [Reactjs](https://facebook.github.io/react/)
* [Flux](https://facebook.github.io/flux/)

In addition to being familiar with those technologies, there is also a design practice associated with `flux`, as it is not just a package, but also a design principle which can be implemented a variety of ways.

## Understanding React
React is not foundationally a lot different from other leading component-based frameworks like `angularjs` and `emberjs`. They share the common goal of simplifying your data flow, allowing you to maintain your data in one layer of your application and then distribute it uniformly to all of your different front-end components. This is benefitial because any changes in that data are immediately distributed to all parts of your application that rely on it. Of course, maintaining this design flow does require a strict protocol for distributing, modifying, updating, and deleting data. Enter the flux framework.

## Understanding Flux
To understand flux, it is best to stay out of code land for a little bit and instead speak abstractly about the kinds of problems it solves, and why it works so well with a framework like react. In flux, several layers are introduced to your application stack, each responsible for different stages of your application. These layers are described below:
* **controllers**: a controller is primarily responsible for establishing a relationship with stores. It does so in the interest of subscribing to specific changes in data, so that it can perform its' second purpose: distributing that updated data to the view. A controller can also call to the action layer to collect data from a server.
* **views**: A view is responsible for collecting the data it needs from the distributed data, rendering visual components, binding to user interactions (clicks, mousemoves, form submissions, etc), and then calling to actions to do things (like update a user's info on the server)
* **actions**: An action can do a lot of different things, and is treated differently in many implementations of the flux framework, but it typically will make a call to another service layer (such as an API layer, which will perform an http request to your server, say, to update a user's information), and then, based on the response of that server, make calls to your dispatcher
* **dispatchers**: a dispatcher is a device which receives certain calls, and then distributes them to registered listeners (such as stores or controllers)
* **stores**: A store is like a database. It is responsible for acquiring data and storing it. It also exposes a small API for registering callback functions, which can be called when the store's data is updated in any way. Typically, a controller will be the only one doing this.

I know flux is hard. It can be a challenge for those who are new, but stay strong! These design principles exist at all layers of many different application stacks, and understanding them can really help you hone your architecting skills. If you want more resources, here are some links to excellent articles that will hopefully illustrate this clearly for you:

* [for engineers](https://medium.com/@garychambers108/understanding-flux-f93e9f650af7#.ma8cffp1u)
* [for teh n00bz (nothing wrong with that!)](http://blog.andrewray.me/flux-for-stupid-people/)

## Building a new view from scratch
Here, we will cover only the process of writing code. For an understanding of how to contribute, please see our contributing guide. This will help you to better understand what protocols take place before you begin writing your code.

### 1. Route
Create a new route, and direct it to a controller
```javascript
// config/routes.js
var MyController = require('../app/controller/my-controller.js')
...
exports.init = function() {
  app.get('/my/custom/route', function(req, res) {
    return MyController.customRoute(req, res)
  });

  app.get('*', function(req, res) {
    return PagesController.home(req, res)
  });
  ...
}
```

### 2. Controller
Create the controller you pointed to in your routes
```javascript
// app/controller/my-controller.js
exports.customRoute = function(req, res) {
  res.render('my-view')
}
```

### 3. View
Create the view you pointed to in your controller
```html
<!-- app/views/my-view.ejs -->
<div>Hello Birld!</div>
```

## Building a new Front-End Route
### 1. Route
Add a route to listen for in the app's entry file. The route that you pick will determine what your url will need to look like in order to trigger this route. Normally, this is done by your server-side code, but we have delegated that to our front-end by serving a wildcard route to our front end.
```js
// public/app/app.js
...
var MyController = require('./controllers/my-controller');
...
window.onload = function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={MyController} name='my-controller' path='/my/custom/path'/>
    </Router>
  ), document.querySelector('#app-target'));
}
```

### 2. Controller
Now that we have a route, we need to bind a controller to it
```js
// public/app/controllers/my-controller.js
var React = require('react')
var View = require('../views/my-view')
var UserStore = require('../stores/user-store') // assuming you need user data to distibute to your view

var MyController = React.createClass({
  displayName: 'MyController',
  getInitialState: function() {
    return {
      users: UserStore.get()
    }
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this.__handleChangeEvent)
  },
  render: function() {
    return (
      <View
        users={this.state.users}
        />
    )
  },
  __handleChangeEvent: function() {
    this.setState({
      users: UserStore.get()
    })
  }
})

module.exports = MyController
```

of course, this model assumes you need to distibute data to your views. If you do not, the controller layer is not entirely relevant, and would probably look much slimmer, more like this:

```js
// public/app/controllers/my-controller.js
var React = require('react')
var View = require('../views/my-view')

var MyController = React.createClass({
  displayName: 'MyController',
  render: function() {
    return (
      <View />
    )
  }
})

module.exports = MyController
```

### 3. Store
`note: If you do not need to distribute data, you can skip to step 4, as you are probably not going to require stores`
Stores are objects which respond to dispatcher updates (usually called by actions), and updates it's data based on the action. In the case of a user store, these actions would be to either create a user, update a user that already exists, or else delete a user that already exists.

```js
// require dependancies
var AppDispatcher = require('../dispatchers/app-dispatcher');
var appConstants = require('../constants/app-constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

// build store (it is a simple model)
var _store = {
  list: []
};
var addItem = function(item){
  _store.list.push(item);
};
var updateItem = function(id, new_item){
  _store.list = _store.list.map(function(item) {
    if (item.id !== id) return item
    if (item.id === id) return new_item // note, you can also use _.merge here
  })
};
var deleteItem = function(id){
  _store.list = _store.list.map(function(item) {
    if (item.id !== id) return item
  })
}

// build the mechanism for subscribing and unsubscribing callbacks (this is what we actually expose to the rest of our application)
var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  get: function(){
    return _store.list;
  },
});

// register certain events with the dispatcher
AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CREATE_USER:
      addItem(action.data);
      userStore.emit(CHANGE_EVENT);
      break;
    case appConstants.DELETE_USER:
      deleteItem(action.id);
      userStore.emit(CHANGE_EVENT);
      break;
    case appConstants.UPDATE_USER:
      updateItem(action.id);
      userStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = userStore;
```

### 4. App Constants
App Constants allow our application to share a central repository for named variables (in case we decide to change our naming conventions later). This prevents us from using slightly different language accross our application for performing the same operations.
```js
// public/app/constants/app-constants
module.exports = {
  ...
  CREATE_USER: "CREATE_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  ...
}
```

### 5. Building a View
Views are the first point of contact for data gathered by a controller. They are meant primarily to render child components which handle specific responsibilities (like generating a dialog, or an interactive button).
```js
// public/app/views/my-view/index.js
// this file allows us to simply require the folder, while still maintaining a unique file name
module.exports = require('./my-view.js')
```

```js
// public/app/views/my-view/my-view.js
var React = require('react')
var ReactDOM = require('react-dom')
var MyComponent = require('my-component')
require('./my-view.less')

var MyView = React.createClass({
  displayName: 'MyView',
  propTypes: {
    users: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      users: []
    }
  },
  render: function() {
    return (
      <div className='my-view view'>
        {this.props.users.map(function(user, i) {
          return <MyComponent user={user} key={i} />
        })}
      </div>
    )
  }
})

module.exports = MyView
```

Of course, if you had no users, we could slim this down even further, like so:
```js
// public/app/views/my-view/my-view.js
var React = require('react')
var ReactDOM = require('react-dom')
var MyComponent = require('my-component')
require('./my-view.less')

var MyView = React.createClass({
  displayName: 'MyView',
  render: function() {
    return (
      <div className='my-view view'>
        <MyComponent />
      </div>
    )
  }
})

module.exports = MyView
```

```less
// public/app/views/my-view/my-view.less
@import "../../config.less";

.my-view {
  background: @myImportedColor;
}
// note: not a real color, just showing how to import variables from config.
```

### 6. Building a component
Components are meant to handle simple, isolated user interactions. A good example of this would be a dialog box that allows a user to sign up via a form (shown below)
```js
// public/app/components/my-component/index.js
module.exports = require('./my-component.js')
```

```js
// public/app/components/my-component/my-component.js
var React = require('react')
var UserActions = require('../../actions/user-actions')

var MyComponent = React.createClass({
  displayName: 'MyComponent',
  render: function() {
    return (
      <div>
        <input ref='username' type='text' />
        <input ref='password' type='password' />
        <input onClick={this.__handleSubmit} type='submit' />
      </div>
    )
  },
  __handleSubmit: function() {
    UserActions.create(
      this.refs.username.value,
      this.refs.password.value,
      function(data) {
        alert('DATA CREATED!!!')
      },
      function(error) {
        alert('ERRORRRRR!!!!')
      }
    )
  }
})

module.exports = MyComponent
```

### 7. Acion
Actions are meant to inform a dispatcher of an information update, often after performing an operation on that data via a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer). Please note that the example below assumes you have a REST API in place that accepts an endpoint for a `POST` to `/users`, which returns a JSON output with a user object.

```js
// public/app/actions/user-actions
...
var jquery = require('jquery')
var AppDispatcher = require('../dispatchers/app-dispatcher')
...
exports.create = function(username, password, success, fail) {
  var url = '/users'
  var payload = {
    username: username,
    password: password
  }

  $.ajax(url, {
    method: 'POST',
    data: payload,
    complete: function(user) {
      AppDispatcher.handleAction({
        actionType: appConstants.CREATE_USER,
        data: user
      });
    },
    error: fail
  })
}
```

This completes the data-flow cycle for a FLUX application. The `controller` collects initial data from a `store`, then renders a `view`, distributing the data down. The view then renders a `component` for creating a user. The component renders a form, which, when submitted, calls an `action`. That action then makes an external request to create a new user, receives the response, and then bubbles that response back to our `dispatcher`. Our `store` was set up initially to listen for the AppDispatcher's calls, and responds by creating the new user in local memory. It then any listeners which are subscribed to its updates, which in this case is our `controller`. The controller then distributes the new data to the view.

## Style Guide
While we are relatively loose with our style guide, the one thing we do ask (so that the code does not get chewed up by anybodies operating system) is that everyone maintain `soft tabs` with an indentation of `2 spaces`
