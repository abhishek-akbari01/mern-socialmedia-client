import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../../App'
import '../../App.css'
import { API } from '../../BackendApi'




export default function Profile() {

   const [userProfile, setUserProfile] = useState(null)
    const {state,dispatch} = useContext(userContext)
    const [showfollow, setShowfollow] = useState(true)

    const {userid} = useParams()

    useEffect(() => {
        fetch(`${API}/user/${userid}`,{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            setUserProfile(result)
        })

    }, [])


    const followUser = () => {
        fetch(`${API}/follow`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res => res.json())
        .then(data => {
            // console.log(data);
            dispatch({type:"UPDATE",payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setUserProfile((prevState) => {
                return {
                    ...prevState,
                    user:{...prevState.user, followers:[...prevState.user.followers,data._id]}
                }
            })
            setShowfollow(false)
        })
    }

    const unfollowUser = () => {
        fetch(`${API}/unfollow`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res => res.json())
        .then(data => { 
            // console.log(data);
            dispatch({type:"UPDATE",payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
 
            setUserProfile((prevState) => {
            const newFollower = prevState.user.followers.filter(item => item != data._id )

                return {
                    ...prevState,
                    user:{...prevState.user, followers:newFollower}
                }
            })
            setShowfollow(true)
        })
    }

    return (
        <>
        {userProfile ?
            <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img src="https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{width:"160px", borderRadius:"80px"}} alt=""/>
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h5>{userProfile.posts.length} posts</h5>
                            <h5>{userProfile.user.followers.length} followers</h5>
                            <h5>{userProfile.user.following.length} following</h5>
                        </div>
                        {showfollow ?
                        <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                        onClick={() => followUser()}>
                            Follow
                            </button> 
                        : 
                        <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                         onClick={() => unfollowUser()}>
                        Unfollow
                        </button>
                        }
                    
                            

                    
                </div>
            </div>

            <div className='gallery'>
                {
                    userProfile.posts.map((item) => {
                        return(
                            <img key={item._id} className='item' src={item.photo}  alt={item.title}/>
                        )
                    })
                }

            </div>
        </div>
        
            : <h2>loading...</h2>}

        </>
    )
}
