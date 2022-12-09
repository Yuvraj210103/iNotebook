import { useState , useEffect} from 'react';
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


const NewNote = (props) => {
  useEffect(() => {
    props.showNotes(false);
  }, []);
    let navigate = useNavigate()
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "",description: "", tag: ""})

    const handleClick = (e)=>{
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      props.showAlert("Note Added Successfully", "bg-green-500")
      navigate("/");
    }
    const onChange = (e)=>{

      setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className=' flex-col justify-center items-center grid md:my-10'>
        
      <Link to="/">  <button className='text-purple-500 mr-auto my-3 flex items-center'><AiOutlineArrowLeft className='mx-1'/> Home</button></Link>
        
        <h1 className='text-3xl md:text-5xl my-3 font-bold'>Create New Note</h1>
        <h3 className='my-3 font-semibold'>Add a new note with your info/note</h3>
        <input className='outline my-3 p-2 rounded-sm outline-1' required type="text" id='title' name='title' placeholder='Title *' onChange={onChange}/>
        <input className='outline my-3 p-2 rounded-sm outline-1'  type="text" id='tag'  name='tag' placeholder='Tags *' onChange={onChange}/>
        <textarea className='outline my-3 p-2 rounded-sm outline-1'  required type="text" id='description' name='description' placeholder='Description *' onChange={onChange}/>
        
        <button disabled={note.title.length<3 || note.description.length<5 } onClick={handleClick} className='text-center w-full rounded-sm bg-purple-500 text-white font-bold py-2 my-3'>Add Note</button>

    </div>
  )
}

export default NewNote