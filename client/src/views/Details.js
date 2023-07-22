import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
    
const Detail = (props) => {
    const [notes, setNotes] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const {removeFromDom}=props;

    // const deleteNote = (noteId) => {
    //     axios.delete(`http://localhost:8000/api/note/${noteId}`)
    //   .then(res => {
    //     removeFromDom(noteId);
    // })
    // .catch(err => console.error(err));
// };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/note/${id}`)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.error(err));
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/note/' +id)
            .then(res => setNotes(res.data))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <div>
<Link to={'/api/note/' + notes._id + '/edit' } >Edit</Link>
            <p>Title: {notes.title}</p>
            <p>Body: {notes.body}</p>
            <button onClick={handleDelete} >Delete</button>
        </div>
    )
}
    
export default Detail;
