import { useState } from "react";
import { json } from "react-router-dom";
import NoteContexct from "./noteContext";

const NoteState = (props) => {
  const host = "https://bored-cod-fez.cyclic.app/";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);
  //Add a Note

  const getNotes = async () => {
    if(localStorage.getItem('token')){
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    setnotes(json);
  }
  };

  //Add a Note

  const addNote = async ( title, description, tag) => {
    if(localStorage.getItem('token')){
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });

     const json = await response.json();
     const note = json;
     
    setnotes(notes.concat(note));
  }
  };

  //Delete a Note

  const deleteNote = async (id, showAlert) => {
    if(localStorage.getItem('token')){
    //api call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
    showAlert("Note Deleted Successfully", "bg-green-500")
  }
  };

  //Edit a Note

  const editNote = async (id, title, description, tag) => {
    if(localStorage.getItem('token')){
    //Api call
    console.log(id)
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    
    );
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit
   /* for (let index = 0; index < newNotes.length; index++) {
      const element =newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newNotes)*/
  }
  };

  return (
    <NoteContexct.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContexct.Provider>
  );
};

export default NoteState;
