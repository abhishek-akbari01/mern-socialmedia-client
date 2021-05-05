import React,{useContext} from 'react'
import { Link,useHistory,Redirect } from 'react-router-dom'
import { userContext } from '../App'
import '../App.css'


export default function Navbar() {

    const history = useHistory()

    const {state,dispatch} = useContext(userContext)

    const renderList = () => {
        if(state)
        {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li style={{marginRight:"20px"}}>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')

                    }} >Logout</button>    
                </li>
            ]
        }
        else
        {
            return [
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white" >
            <Link to={state ? "/" : "/signin"} className="brand-logo left">Follow Karna</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
            </div>
        </nav>
    )
}
