import React from 'react'


//requires Title, Thumbnail, and original subreddit
//title should be link to original post
export default function RedditListItem({post}) {
    const {title, thumbnail, subreddit, permalink } = post
    return (
        <div>
            <span>{title}</span>
            <div className='imageHolder'>
                <img src={thumbnail} alt="Thumbnail failed to load" />
            </div>
            <div>{`Originally posted to r/${subreddit}`} </div>
            <br/>
        </div>
    )
}
