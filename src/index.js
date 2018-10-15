/*
What is react?

React is a JS library that is used to produce HTML that is shown to a user in a web browser.

When writing in react, we write individual components or views (which are snippets of code that produce HTML).

*/

/* GENERAL RULE: React has a term: Downwards data flow. Means that only the most parent component in an app should be
 * responsible for fetching data (be it an API, flux or even redux). We want the most parent component that is concerned
 * with a piece of information to be responsible for fetching it. In this case, index.js (or App, our top level container).
 */

/* GENERAL RULE: Always make 1 component per file.
 * Modules in JS (at least ES6 i think) are silo-ed (what you declare in a module, stays in the module
 * unless asked to be shared). Including code, vars and libraries (it doesn't matter if it installed via npm).
 */
import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from './components/search_bar';
//SearchBar here is like a variable. Will take the value of what we exported in search_bar. If in search_bar we exported
//x = 5, SearchBar will have the value 5.
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyCnLWEKNxMeSorKeIfGhON5reSd-1jJQag';

/* Example of how to call the YT API.
YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
    console.log(data);
});
*/


//React knows how to create and manage components.
//The functionality to actually render them to the DOM is a separate library called ReactDOM.



//Create a new component. This component should produce some HTML
//const is ES6. Const declares a constant (duh!). Like var, but const
//This is a kind of component. We can have many instances of App.
//This is getting re-written, so I'm gonna comment all of it for future reference and write the new version below.
/*
const App = function() {
    return (
        <div>
            <SearchBar />
        </div>
    );
    // This HTML here is called JSX. A subset of JS (or dialect) that allows us to write what
    // looks like HTML but behind the scenes is just JS. Webpack or Babel transpile this code before it
    // gets run on the browser. Gets converted to vanilla JS for hte browser to understand.
    // JSX produces the actual HTML that gets inserted into the DOM when we render the component.
    // When we say render, we mean to place this component's HTML into the page.
}*/

//Now this is a class component instead of a functional.
//We are gonna store the result of search in the state of App.
class App extends Component {
    //Constructor always gets called with props.
    constructor(props) {
        super(props);

        //this state is gonna store videos that we search for.
        //We use state because this is some data that we want to persist throughout the life cycle. Also, it is gonna
        //change over time. Which is kinda the definition of state :P .
        this.state = {
            videos: [],
            selectedVideo: null
        };

        //'(data) => {' was 'function (data) {'
        this.videoSearch('surfboards');//Initial search for videos.
    }

    /*
    * This is callback that we are gonna pass to SearchBar that will allow us to make YT searches from SearchBar*/
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            //this used to be this.setState({ videos: videos });
            /* WARNING: When you have key and values (of the array) defined with the same name (like videos: videos)
             * you can use some of the syntactic sugar that comes with ES6, and just call it 'videos'.
             * This (after parsing) will be converted to 'this.setState({ videos: videos })' but as this way of
             * writing is widely used better get used to it now than later.
             * You can still see how the state is declared (and the name of the key) in the constructor.
             * updated note: We had to change this, it used to be this.setState({ videos }); (to make the previous
             * comment valid I leave here the proper reference.
             */
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        {/*_.debounce (or lodash.debounce) it's a way to throttle function calls. Debounce takes a function and returns a
        new function that can only be called only once every Xms (in this case, every 300ms)*/}
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                {/*Here we pass the state of the parent to the child (VideoList) which gets them as props*/}
                {/*Also, we are passing a function from App to VideoList (a callback, which will end up in VideoListItem)
                which takes a video and updates as App's state video.
                That's why it's a callback, we give the children a function that affects parent's state. Now, VideoList
                has a new property (which receives via props) called props.onVideoSelect*/}
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
                {/*Here the keyword 'this' keeps a reference to App, so whenever anything from here is called,
                    makes a callback to App and fetches/sets data from/on App*/}
            </div>
        );
    }
}

//We can also define function like this (in ES6)

/*
const App = () => {
    return <div>Hi!</div>;
}
This way of defining changes how the keyword 'this' works. For everything else, is the same as defining with function()
*/


//Take this component's generated HTML and put it on the page (in the DOM)

//use ReactDOM to render into the DOM
//If we do it in this way -> ReactDOM.render(App);
// it will fail because we are passing a class.
//We need to pass an instance of the class like this -> ReactDOM.render(<App />);
//JSX instantiates components naturally when wrapped in JSX tags.
//If we try to render this like here -> ReactDOM.render(<App />);
//We are not telling it where to render it to. Where to render is the 2nd argument that ReactDOM.render() takes.
//Inside index.html we have a <div class="container"></div> which is the root node of the entire react application.
//All components rendered in the DOM by react, end up being a child of (or nested inside of) this "container".
//To pass a reference to it
ReactDOM.render(<App />, document.querySelector('.container'));

/*
 npm install --save youtube-api-search
 With --save option npm adds this package to the package.json file automatically.
 */