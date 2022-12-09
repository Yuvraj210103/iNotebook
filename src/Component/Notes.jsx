import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useEffect } from "react";
import emptyNotes from "./Assets/emptyNotes.svg";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div className="mx-8 h-screen">
        <h1 className="font-extrabold text-3xl md:text-4xl my-4 border-b-4 border-blue-400 inline-block">
          <span className="text-purple-900 ">Your</span>{" "}
          <span className="text-violet-400">Notes</span>{" "}
        </h1>

        {/* noteitem */}

        {notes.length === 0 || !localStorage.getItem('token') ? (
          <div>
            <img src={emptyNotes} className="mx-auto my-20 relative z-10" alt="" />
            
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5">
            {notes.map((note) => {
              return <NoteItem note={note} key={note._id} showAlert={props.showAlert}/>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
