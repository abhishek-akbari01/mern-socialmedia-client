import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import { API } from '../../BackendApi'
import M from 'materialize-css'




export default function Signup() {

    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    // console.log(API)

    const postData = () => {

        fetch(`${API}/signup`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
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
                M.toast({html:data.message, classes:"#43a047 green darken-1"})
                history.push('/login')
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Follow Karna</h2> 
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value) }/>      
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value) }/>      
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) }/>  
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>Sign Up</button>    
                <h5>
                    <Link to='/login'>Already have an account ? </Link>
                </h5>
            </div>
        </div>
    )
}
