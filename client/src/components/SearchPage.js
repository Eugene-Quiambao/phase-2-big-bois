import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Post from './Post'
import Navbar from './Navbar'

const SearchPage = (props) => {
    
    const url = window.location.href
    const keys = decodeURI(url.substring(37, url.length))
    // console.log(decodeURI(keys))
    const [searchRes, setSearchRes] = useState("No results found")

    const [searchResBodies, setSearchResBodies] = useState("No results found")

    const updateSearchRes = (resArray) => setSearchRes(resArray.data.map((post, index) => {
        return (
            <Post 
                title = {post.title}
                body = {post.body}
                score = {post.gamerscore}
                username = {post.poster_username}
                board = {post.board}
                id = {post._id}
                key = {index}
            />
        )
    }))

    const updateSearchResBodies = (resArray) => setSearchResBodies(resArray.data.reverse().map((post, index) => {
        return (
            <Post 
                title = {post.title}
                body = {post.body}
                score = {post.gamerscore}
                username = {post.poster_username}
                board = {post.board}
                id = {post._id}
                key = {index}
            />
        )
    }))

    const noSearchRes = () => setSearchRes("No results found")

    const noSearchResBody = () => setSearchResBodies("No results found")

    useEffect(() => {
        axios.post('/searchPost', {title: keys})
            .then(res => {
                // console.log(res)
                if (res.data.length === 0){
                    noSearchRes()
                }
                else {
                    updateSearchRes(res)
                }
            })
            .catch(err => {
                console.error(err)
            })
        console.log("yeehaw")
        axios.post('/searchPostBody', {expression: keys})
            .then(res => {
                // console.log(res)
                if (res.data.length === 0){
                    noSearchResBody()
                }
                else {
                    updateSearchResBodies(res)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [keys])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <h1 className="search-head">Search Results</h1>
            <div className="search-results">
                <h1 className="search-title">Titles with "{keys}"</h1>
                <ul>
                     {searchRes} 
                </ul>
                <h1 className="search-body">Posts with "{keys}"</h1>
                <ul>
                    {searchResBodies}
                </ul>
            </div>
        </div>
    )
}

export default SearchPage
