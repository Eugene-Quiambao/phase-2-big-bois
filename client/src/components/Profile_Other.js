import axios from 'axios'
import React from 'react'
import './components.css'
// import ProfilePicture from '../graphics/profpic.jpg';
import Navbar from './Navbar'
import Post from './Post'
import Cookies from 'js-cookie'
import {useEffect, useState, useParams, useHistory} from 'react'

// const profPic = () => {
//     return 
// }
const Profile = (props) => {
    // console.log(props.match.params.username)
    const user = props.match.params.username
    const [posts, setPosts] = useState("Nothing to see here")

    const updatePosts = (postArray) => setPosts(postArray.data.map((post, index) => {
        return (
            <Post 
                title = {post.title}
                body = {post.body}
                score = {post.gamerscore}
                username = {post.poster_username}
                board = "Esports"
            />
        )
    }))

    useEffect(() => {
        axios.post('http://localhost:5000/getUserPosts', {poster_username: user})
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
            <div className='profile'>

                <div className='profile-header'>
                    <div className = 'userName'>
                        {/* TODO: Make this adjust to real Username */}
                        {/* {Cookies.get("thegameforum_userLogin")} */}
                        {props.match.params.username}
                    </div>
                    <div className = 'profile-header-dot'>
                        ⋅ 
                    </div>
                    <div className = 'gamerScore'>
                        {/* {gamerscore} */}
                    </div>
                </div>

                {/* display the user's posts for the day here */}
                <div className="profile-posts">
                    <h1>RECENT POSTS</h1>
                    <ul>
                        {posts}
                        {/* {posts} */}
                    </ul>
                </div>
                
                
            </div>
        </div>
    )
}

export default Profile
