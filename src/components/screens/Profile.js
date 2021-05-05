import React,{useState,useEffect,useContext} from 'react'
import { userContext } from '../../App'
import '../../App.css'
import { API } from '../../BackendApi'



export default function Profile() {

    const [mypost, setMypost] = useState([])

    const {state,dispatch} = useContext(userContext)

    useEffect(() => {
        fetch(`${API}/mypost`,{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result);
            // console.log(state ? state.following.length : "0");
            setMypost(result.mypost)
        })

    }, [])

    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img src="https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:"160px", borderRadius:"80px"}} alt=""/>
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h5>{mypost.length} posts</h5>
                            {/* {console.log(state ? state.following.length : "0")} */}
                            <h5>{state ? state.followers.length : "0"} followers</h5>
                            <h5>{state ? state.following.length : "0"} following</h5>
                        </div>
                    
                </div>
            </div>

            <div className='gallery'>
                {
                    mypost.map((item) => {
                        return(
                            <img key={item._id} className='item' src={item.photo}  alt={item.title}/>
                        )
                    })
                }

            </div>
        </div>
    )
}
