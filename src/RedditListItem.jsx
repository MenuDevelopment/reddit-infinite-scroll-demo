import React from 'react'

const itemStyle = {
    boxShadow: '4px 4px 1px 1px rgba(0, 0, 255, .2)',
    width: '25%',
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

}

const titleStyle = {

}

//requires Title, Thumbnail, and original subreddit
//title should be link to original post
export default function RedditListItem({post}) {
    const {title, thumbnail, subreddit, permalink } = post
    return (
        <div style={itemStyle}>
            <a style={titleStyle} href={permalink} rel="noopener noreferrer" target="_blank">{title}</a>
            <div className='imageHolder'>
                <img src={thumbnail} alt="Thumbnail failed to load" />
            </div>
            <div>{`Originally posted to r/${subreddit}`} </div>
            <br/>
        </div>
    )
}
