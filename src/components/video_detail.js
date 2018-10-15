import React from 'react';

const VideoDetail = ({video}) => {
    if(!video) {
        /* When the site first renders I have no videos because the call to the API takes some time.
         * So, the first time this is called, video == null.
         * Then, after the call to YouTube is ready, the components re-render themselves as state is being updated
         * this time, video != null and we can now try to show the videos. When state changes, it also renders the children.
         * So, when app re-renders itself because of a state change, all children re-render themselves (like VideoDetails).
         */
        return <div>Loading...</div>;
    }

    const videoId = video.id.videoId;
    //const url = 'https://www.youtube.com/embed/' + videoId;
    /* You can concat strings the old fashioned way like above, or use the all new ES6 way like below.
     * Using back-ticks and is called string interpolation or template strings.
     */
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}/>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;