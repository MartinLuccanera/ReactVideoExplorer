/* This component doesn't need state, doesn't record any user interaction doesn't re-render in any fashion. We can
 * really make it a plain functional component.
 */

import React from 'react';
import VideoListItem from './video_list_item';

//Here the props is what I get from my parent.
//Here (in a functional component), props is an argument. In a class-based component, props are available anywhere
//in any method we define as this.props. So it is very important that whenever we refactor a component from
//functional to class-based we have to update all our references from props to this.props.
const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem
                onVideoSelect={props.onVideoSelect}
                key={video.etag}
                video={video} />
        );
        //JS was complaining about missing key. You need an identifying value for the elements in the array. This
        //doesn't have to be anything specific (can be string, number, etc) but needs to be consistent and unique.
        //In this case, we have a unique etag that comes with the video when we make the API call.
    });

    return (
        /*col-md-4: bootstrap column of width 4*/
        <ul className="col-md-4 list-group"> {/*These are bootstrap classnames that we import for niceness' sakes*/}
            {videoItems}
            {/*Stay away from for-loops*/}
            {/*array.map is a function native to any array that if we pass a function to the map, the map will execute that
            function for every item in the array.
            Like this:
            var array = [1, 2, 3];
            array.map(function(number) { return number * 2 });
            result -> [2, 4, 6]*/}

        </ul>
    );
};

export default VideoList;