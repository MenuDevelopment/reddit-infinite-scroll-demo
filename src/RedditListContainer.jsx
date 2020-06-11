import React, {useState, useRef, useCallback} from 'react'
import RedditListItem from './RedditListItem'
import useRedditSearch from './useRedditSearch'

const BASE_URL = 'https://www.reddit.com/r/aww/top.json'



export default function RedditListContainer() {

    const [redditUrl, setRedditUrl] = useState(BASE_URL)
    const {loading, posts, after} = useRedditSearch(redditUrl)

    const observer = useRef()

    const lastPostRef = useCallback(element =>{
        if (loading){
            return
        }
        if (observer.current){
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading) {
                setRedditUrl(BASE_URL + `?after=${after}`)
            }
        })
        if (element) {
            observer.current.observe(element)
        }
    }, [after, loading])


    return (
        <div>
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
