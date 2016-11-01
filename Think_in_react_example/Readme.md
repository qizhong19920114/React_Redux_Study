#Think in React Example

I did this extra example for practice mainly because I was still having some confusion about the following things:
- when to use state?
- when to use props?
- Where to put state?
- How does React one way data flow works if we want to update state based on user action?

This example answers it all. See the **Notes** section 

Just a little spoiler of how data flow works: 

 **The idea is that while data flows from parent to child, events can go the other way**

##Run:

```
npm install
npm run start
```
The web should be available at localhost:3000. 

##Demo:

![Imgur](http://i.imgur.com/2jVWOsf.gif)

##Notes:

- a component should ideally only do one thing

- Remember use export default even for the json object file...

- In **simpler examples**, it's usually easier to go **top-down**, but on **larger projects**, it's easier to go **bottom-up** and write tests as you build components

- State vs Props: see the state vs Props file

- I know this is very basic but I did forgot... this is how you use the style sheet in the html: 
	
	```
	<link rel="stylesheet" href="./style.css"> 
	```

- Figure out the **absolute minimal** representation of the **state** your application needs and compute everything else you need on-demand

- Here is how to figure out if a component needs state: 
	1. Is it passed in from a parent via props? If so, it probably isn't state.
	2. Does it remain unchanged over time? If so, it probably isn't state.
	3. Can you compute it based on any other state or props in your component? If so, it isn't state.

- Use **indexOf()** to check if a string is contained by the other string, for example:
	``` 
	if (product.name.indexOf(this.props.filterText) === -1 )
	```

- There's a little error in the original tutorial. The forEach we need to use .bind(this) so we can access the this.props.filterText

- Here is how to figure out which component you assign state to. For each piece of state in your application:

	- Identify every component that renders something based on that state.
	- **Find a common owner component** (a single component above all the components that need the state in the hierarchy).
	- Either the common owner or another component higher up in the hierarchy should own the state.
	- If you can't find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

- Without add the event handle, you will realize that we can't type or check the check box. This is intentional, as we've set the value prop of the input to always be equal to the state passed in from FilterableProductTable. 

- In the input tags, ref is what you can get the value from the user. for example:  
```
<input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange}/>
```

- It seems like the _event handler_ for the state change comes from the same component where state is declared. 

- **Props** doesn't have to be a variable, it can be a function or a constant (for example, the data read from static file)

- I'm trying to understand the **one way dataflow**. It seems like the data flow is top down, from the top component flow to the lower level components. so the Model (state) --> View (component) is top down. The View --> Model is a little different, but it's still top down (one way flow), just a little more compllicated. So the user changes input (in this example, the checkbox or the textbox), the low level handler collect the new values from the ref variable of low level component. In stead of changing the model from the from that low level component, the ref is passed to the high level component (through the low level event handler, which is just a wrapper). The high level component take the ref, pass it to the real event handler (not a wrapper) change its states based on the ref. Then the states got passed down to component and because the state and the props changes, the ReactDOM is able to detect that and make the change of the View of the low level component. 

- This is a great quote explains how the onw way data flow works with react: 

	>We need some way to update the state in our application – If data flows from parent to child, this can’t work – or can it?

	>**The idea is that while data flows from parent to child, events can go the other way.**




##More info: 
- Think in React official post ([link](https://facebook.github.io/react/docs/thinking-in-react.html))
- State and Lifecycle official post ([link](https://facebook.github.io/react/docs/state-and-lifecycle.html))
