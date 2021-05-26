import {FaFeather} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Post from './Post'
import Navbar from './Navbar'
import axios from 'axios';
import { useState, useEffect } from 'react'
import React from 'react'

const EsportsBoard = () => {

    const [posts, setPosts] = useState("Nothing to see here")

    const updatePosts = (postArray) => setPosts(postArray.data.map((post, index) => {
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

    useEffect(() => {
        axios.post('http://localhost:5000/getPost', {board: "esports"})
            .then(res => {
                updatePosts(res)
            })
            .catch(err => {
                console.error(err);
            })
    })

    return (
        <div> 
            <Navbar/>
        <div className="board-name">
            <div className="board-header">
                <h1>E-SPORTS</h1>
                <Link to="/newpost">
                    <div className='new-post'>
                        <FaFeather />
                    </div>
                </Link>
            </div>
            
            {/* append or render the posts here */}
            <div className='posts'>
                <ul>
                    {posts}
                </ul>
            </div>
        </div>
        </div>
    )
}

export default EsportsBoard
