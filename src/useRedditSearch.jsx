import {useEffect, useState} from 'react'
import axios from 'axios'

export default function useRedditSearch ( redditUrl){
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [after, setAfter] = useState('')

    useEffect(()=>{
        setLoading(true)
        axios.get(redditUrl).then(response => {
            const data = response?.data?.data
            setAfter(data.after)
            const posts = data.children.map(post => {
                const {title, thumbnail, subreddit} = post.data
                let {permalink} = post.data
                permalink = 'https://www.reddit.com/' + permalink
                return {title, thumbnail, subreddit, permalink}
                
            })
            setPosts(prevPosts => [...prevPosts, ...posts])

        })
        setLoading(false)
    }, [redditUrl])
    return {loading, posts, after}
}