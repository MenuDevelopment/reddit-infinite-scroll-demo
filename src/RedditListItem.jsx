import React from 'react'


//requires Title, Thumbnail, and original subreddit
//title should be link to original post
export default function RedditListItem({post}) {
    const {title, thumbnail, subreddit, permalink } = post
    return (
        <div>
            <div className='imageHolder'>{thumbnail}</div>
            <span>{title}</span>
            <span>{`Originally posted to r/${subreddit}`} </span>
        </div>
    )
}
