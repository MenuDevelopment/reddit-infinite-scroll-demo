import React, {useState, useEffect} from 'react'
import RedditListItem from './RedditListItem'
import axios from 'axios'

const redditUrl = "https://www.reddit.com/r/aww/new.json"

export default function RedditListContainer() {


    let [loading, setLoading] = useState(true)
    let [after, setAfter] = useState('')
    let [posts, setPosts] = useState([])

    useEffect(()=>{
        setLoading(true)
        axios.get(redditUrl).then(response => {
            const data = response?.data?.data
            const posts = data.children.map(post => {
                const {title, thumbnail, subreddit, permalink} = post.data
                return {title, thumbnail, subreddit, permalink}
                
            })
            setPosts(prevPosts => [...prevPosts, ...posts])

        })
        setLoading(false)
    }, [])

    return (
        <div>
            {loading && 'Loading...'}
            {posts.map(post => <RedditListItem post={post} key={post.permalink} />)}
        </div>
    )
}
