import React, { Component } from 'react';
//We could do this the old way
//import React from 'react';
//class SearchBar extends  React.Component {
//OR
//import React from 'react';
//const Component = React.Component;
//class SearchBar extends Component {
//the {} in the ES6 kind of import (import React, { Component } from 'react';) means import react and pull off
// the property Component as a variable called Component.

class SearchBar extends Component {
    /* We use class based components when we need a component to be aware of state in some fashion (Data changing
     * over time, reacting to user events and we need to keep track of some aspect of state from render pass to render pass.
     * And functional components are used when we are taking in some information and spitting out some JSX.
     * A functional component can contain a class based component.
     */
    //When we use a class based component we still have to give it the ability to render itself somehow. To return some JSX.
    //We will do it via de render() method. Every react component that we
    //create (that is class based) must have a defined render method).

    //State, only class type components have state (functional components don't have it).
    //How to initialise state?
    constructor(props) {
        //All JS classes have a special function called constructor.
        //The constructors function is the first and only function called automatically when every instance of
        //the class is created. Like in index.js -> App.
        //The constructor is reserved for setup and initializing variables and state.
        super(props);

        //State is a plain JS object that exists on any component that is a class based component. Each instance of a
        //class based component has its own copy of state.
        //Whenever we use state, we start by declaring a new object and assign it to this.state
        //The object we pass will also contain properties that we want to record in the state.
        //In this case, we want to record the property term on state. Term = searchTerm (the value the user inputs in
        //search input).
        //As the user inputs text, we want to update 'term' to whatever the user is inputting.
        this.state = { term: ''};
        //Only inside the constructor we access the state directly (without using the setter).
    }

    render() {
        //Whenever App tries to render SearchBar it's gonna call render()
        //return <input onChange={this.onInputChange}/>;
        //All HTML inputs emit a 'change' event whenever a user interacts with them.
        //The way to reference this stuff is via 'on' + the name of the event and then the handler in {}.

        //This could also be like this for ES6 ->
        //return <input onChange={(event) => console.log(event.target.value)} />;
        //and we could get rid of the onInputChange(event) method.
        //Also, if it is a single param event, we can write it like this (no parenthesis)
        return (
            <div className="search-bar"> {/*This is how you create a comment inside JSX, */}
                {/* This declaration here value={this.state.term} turns this field (input) into a controlled field.
                  * Controlled field: Its value is set by the state and not the other way around.
                  * When the field (in this case input) is not controlled, the input tells the state to update.
                  * But it should be the other way around. The state should tell the input its value.
                  * This happens when we tell the component that its 'value' is provided by this.state.term. So its value
                  * only ever changes when state changes.
                  * Now, when we call this.setState causes the component to re-render and when it re-renders, the value
                  * of the input is set to the new value of this.state.term.
                  * Now, when user types text, the value of the input doesn't change. We have only called the event handler
                  * with the new value. The handler runs updating this.state.term to the new value.
                  * When we update state, this causes the component to re-render and when it re-renders, we set the
                  * value of the input to this.state.term. So the new value of input is visible on the screen.
                  * What is this good for?
                  * It allows us to read the value of the input more easily. Instead of using JQuery to access the value
                  * we just call this.state.term.
                  */}
            <input
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)} />
                {/*This changed, but gonna keep it to make comments valid.*/}
                {/*onChange={event => this.setState({ term: event.target.value })} /> Always through setter*/}
                {/*Value of the input: {this.state.term}*/} {/*Always reference JS variables with {} while inside JSX*/}
            </div>
        );
        /* Explanation: Whenever we update the input element (we change the value of it) the event handler runs.
         * We set the state (this.state.term) with the new value of the input. Whenever we update our state (we call
         * this.setState) causes our component to automatically re-render and push all the updated info from the render
         * method into the DOM. Because our render method makes a reference to this.state.term every time the component
         * re-renders we get the updated this.state.term into the DOM.
         * In short: When we wanna update our component in some fashion, we think of state.
         */
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    //This runs whenever the event occurs.
    //onInputChange(event) {
    //    console.log(event.target.value)
    //}
    //I left all this old code here to understand where we are coming from.
}

//Now, any file that imports search_bar, will get SearchBar component.
export default SearchBar;