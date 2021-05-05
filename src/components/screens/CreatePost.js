import React,{useState,useEffect} from 'react'
import { API } from '../../BackendApi'
import M from 'materialize-css'
import { useHistory } from 'react-router'



export default function CreatePost() {

    const history = useHistory()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if(url)
        {
            console.log("new url - ",url)
        
        fetch(`${API}/createpost`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title:title,
                body:body,
                pic:url,
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error)
            {
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else
            {
                M.toast({html:"created post success", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err => console.log(err))
    }

    }, [url])

    

    const postDetails = () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","social-media")
        data.append("cloud_name","abhishek89")
        fetch("https://api.cloudinary.com/v1_1/abhishek89/image/upload",{
            method:"POST",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
             setUrl(data.url)

        })
        .catch(err => console.log(err))

        console.log("url - ",url)
    }

    

    return (
        <div className='card input-filed'  style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" name="" id="" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder='body'  value={body} onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postDetails()} >Submit Post</button>    

        </div>
    )
}
