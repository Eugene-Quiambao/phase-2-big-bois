import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import {useState} from 'react';
// this form submits the input to a database to be rendered later on after submission
const Reply = (props) => {
    const url = window.location.href
    console.log(url.substring(31, url.length))
    const postId = url.substring(31, url.length)
    const [details, setDetails] = useState({poster_username: Cookies.get("thegameforum_userLogin"), body: "", id: postId});
    const [errorMessage, setErrorMessage] = useState("");
    const changeError = (text) => setErrorMessage(text);

    const submitHandler = e => {
        console.log("submitHandler is getting executed");
        e.preventDefault();
        console.log(details);
        
        if(details.body.length > 0)
        {
            changeError("");
            axios.post('/newReply', details)
                     .then(res => {
                         console.log(res);
                         axios.post('/addGamerscore', details)
                            .then(res => {
                                console.log(res);
                                window.location.reload()
                            })
                         .catch(err => {
                             console.error(err);
                         });
                     })
                     .catch(err => {
                     console.error(err);
                     });

        
        }
        else
        {
            changeError("No Body");
            console.log("no Body");
        }
    }
    return (
        <div className="reply-form" onSubmit={submitHandler}>
            <div className="reply">reply to {props.op}</div>
            <div className="errormsg">{errorMessage}</div>
            <form >
                <input type="text" placeholder="Enter your reply here" className="post-body" onChange={e => setDetails({...details, body: e.target.value})} value={details.body}></input>
                <input type="submit" className="reply-btn"></input>
            </form>
        </div>
    )
}

export default Reply
