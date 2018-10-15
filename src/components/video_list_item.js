import React from 'react';

/* Each VideoListItem contains one video.
 * So whenever I click on any of them on the app, only 1 video can be passed to parent containers.
 */
/* So, ES6 brings a lot of new ways to write stuff. To handle the videos that come inside props we can do it like this
 * const VideoListItem = (props) => {
 *  const video = props.video;
 * };
 * Or we can use some of the syntactic sugar that comes with ES6 and do it like this:
 * Which means, Hey! there is a thing called video in the argument, create a new var(or const) named video to handle that.
 */
const VideoListItem = ({video, onVideoSelect}) => {
    /* doing this
     * ({video, onVideoSelect})
     * is the same as
     * const video = props.video
     * const onVideoSelect = props.onVideoSelect
     *
    */
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
        <li onClick={() => onVideoSelect(video)}
            className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl} />
                </div>
                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>

        </li>
    );
};

export default VideoListItem;