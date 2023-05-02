import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddShow ({setShows}) {
    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState('')
    const [season, setSeason] = useState ('')

    const navigate = useNavigate()

    console.log({title})

    const handleAddShow = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")//get out jwt from localStorage

        fetch("https://tv-shows-api-vdf.web.app/shows", {
            method: "POST",
            headers:{ "Content-Type":"application/json",
            "Authorization": token,//added token to request
        },
            body: JSON.stringify({title,poster,season})
        })
        .then(resp => resp.json())
        .then(data => {
             if (data.message){
                alert(data.message)
            return
        }

        setShows(data)
        navigate("/")
        })

        .catch(alert)
        
    }

    return(
        <>
        <h2>AddShow</h2>
        <form onSubmit ={handleAddShow}>
            <label htmlFor= "title">Title
            <input 
            type="title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}/>
                
        </label>

        <br />

        <label htmlFor="poster">Poster
            <input
            type= "text"
            value= {poster}
            onChange= {(e) => {setPoster(e.target.value)}}/>
        </label>

        <br />

        <label htmlFor="season">Season
            <input
            type= "text"
            value= {season}
            onChange= {(e) => {setSeason(e.target.value)}}/>
        </label>

        <br />

        <input type="submit" value="Add Show"/>
    </form>
  </>
 )
}




            
