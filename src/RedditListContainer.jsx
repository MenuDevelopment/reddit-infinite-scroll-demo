import React, {useState, useEffect, useRef, useCallback} from 'react'
import RedditListItem from './RedditListItem'
import axios from 'axios'

const redditUrl = "https://www.reddit.com/r/aww/top.json"

export default function RedditListContainer() {


    let [loading, setLoading] = useState(true)
    let [after, setAfter] = useState('')
    let [posts, setPosts] = useState([])
    const observer = useRef()
    const lastPostRef = useCallback(element =>{
        if (loading){
            return
        }
        if (observer.current){
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log('last post visibile')
            }
        })
        if (element) {
            observer.current.observe(element)
        }
    }, [loading])

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
            {posts.map((post, index) => {
                if (index === posts.length -1){
                    return( 
                        <div ref={lastPostRef} key={post.title} >
                            <RedditListItem post={post} key={post.title} />
                        </div>
                    )
                }
                return <RedditListItem post={post} key={post.title}/>
            })}
        </div>
    )
}
