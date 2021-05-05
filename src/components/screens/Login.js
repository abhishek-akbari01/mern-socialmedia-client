import React,{useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import { API } from '../../BackendApi'
import M from 'materialize-css'
import { userContext } from '../../App'




export default function Login() {

    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const postData = () => {

        fetch(`${API}/signin`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error)
            {
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else
            {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Login Success", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err => console.log(err))
    }


    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Follow Karna</h2> 
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value) }/>      
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) }/>  
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>Login</button>    
                <h5>
                    <Link to='/signup'>Don't have account ? Create Account.. </Link>
                </h5>
            </div>
        </div>
    )
}
