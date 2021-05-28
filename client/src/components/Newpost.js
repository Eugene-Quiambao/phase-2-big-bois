import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'

const Newpost = () => {

    const history = useHistory()

    const [details, setDetails] = useState({poster_username: Cookies.get("thegameforum_userLogin"), body: "", board: "general", title: ""});
    const [errorMessage, setErrorMessage] = useState("");
    const changeError = (text) => setErrorMessage(text);

    const submitHandler = e => {
        console.log("submitHandler is getting executed");
        e.preventDefault();
        console.log(details);
        
        if(details.title.length > 0)
        {
            changeError("");
            axios.post('/newPost', details)
                     .then(res => {
                         console.log(res);
                         axios.post('/addGamerscore', details)
                            .then(res => {
                                console.log(res);
                                history.push({pathname: `/boards/${details.board}`})
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
            changeError("No Title");
            console.log("no title");
        }
    }

    return (
        <div>
            <Navbar/>
        <div>
            <div className='board-post'>
            <div className="errormsg">{errorMessage}</div>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Title' className='title-input' onChange={e => setDetails({...details, title: e.target.value})} value={details.title}></input>
                    <br></br>
                    <textarea name='post-body' className='post-body' placeholder='Type in your post here' onChange={e => setDetails({...details, body: e.target.value})} value={details.body}></textarea>
                    <br></br>
                    <label>Choose a board to place this thread: </label>
                    <select name='board-select' className='board-select' onChange={e => setDetails({...details, board: e.target.value})} value={details.board}>
                        <option value='general'>General</option>
                        <option value='esports'>E-sports</option>
                        <option value='news'>News</option>
                        <option value='social'>Social</option>
                        <option value='retro'>Retro</option>
                        <option value='tabletop'>Tabletop</option>
                        <option value='tech'>Tech</option>
                        <option value='rigs'>Rigs</option>
                        <option value='support'>Support</option>
                    </select>
                    <input type="submit" className='submit-btn'></input>
                </form>

                

                {/* find out how to do previous page using react : ) */}
                <Link to='/Dashboard' style={{textDecoration: 'none',}}>
                    <div className='cancel-butt'>
                        cancel
                    </div>
                </Link>
            </div>
            
        </div>
        </div>
    )
}

export default Newpost
