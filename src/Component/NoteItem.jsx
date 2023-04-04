import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import { AiOutlineDelete, AiOutlineEdit,AiOutlineClose } from "react-icons/ai";
import ReactModal from 'react-modal';


const NoteItem = (props) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const onOpenModal1 = () => {
    setOpen1(true);
    
  };
  const onCloseModal1 = () => {
    setOpen1(false);
  };
  

  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => {
    setOpen2(false);
  };

  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note } = props;
  const [editedNote, setEditedNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };
  const handleClick = (id, title, description, tag) => {
    props.showAlert("Registered successful , Please Login Now", "bg-green-500")
    editNote(id, title, description, tag);
    setOpen1(false);
    props.showAlert("Note Updated Successfully", "bg-green-500")
    
  };
  return (
    <div>
      {/* Modal to edit Note */}

      <div className="flex">
        <ReactModal isOpen={open1} style={customStyles} onRequestClose={() => onCloseModal1()} center>
        
          <div className="flex flex-col  sm:min-w-[300px] md:min-w-[400px]">
          <button className="ml-auto" onClick={onCloseModal1}><AiOutlineClose size={25}/></button>
            <button
              onClick={() =>
                handleClick(
                  note._id,
                  editedNote.title,
                  editedNote.description,
                  editedNote.tag
                )
              }
              className="p-2 rounded-md bg-green-500 text-white mr-auto my-2"
            >
              Save 
            </button>
            <input
              className="p-2 outline outline-0"
              defaultValue={note.title}
              name="title"
              onChange={onChange}
            ></input>
            <input
              className="p-2 outline outline-0"
              defaultValue={note.tag}
              name="tag"
              onChange={onChange}
            ></input>
            <textarea
              className="p-2 outline outline-0 overflow-hidden text-ellipsis"
              defaultValue={note.description}
              name="description"
              onChange={onChange}
            ></textarea>
          </div>
        </ReactModal>
      </div>

      {/* Modal to view a full note */}

      <div className="p-5">
        <ReactModal isOpen={open2} style={customStyles} onRequestClose={() => onCloseModal2()} center>
          <div className="flex flex-col">
        <button className="ml-auto " onClick={onCloseModal2}><AiOutlineClose size={25}/></button>
          <h1 className="font-bold text-2xl my-2">{note.title}</h1>
          <h3 className="font-light">#{note.tag}</h3>
          <p className="my-2 font-semibold overflow-hidden text-ellipsis">{note.description}</p>
          </div>
        </ReactModal>
      </div>

      {/* Card to show Single note */}

      <div
        className="bg-purple-100 rounded-md flex flex-col p-3 my-3 cursor-pointer shadow-xl hover:scale-105 duration-300"
       
      >
        <div className="flex items-center">
          <h1 className="font-bold text-2xl my-2">
            {note.title.slice(0, 20)}...
          </h1>
          <div className="flex ml-auto font-semibold">
            <AiOutlineDelete
              onClick={() => {
                if (window.confirm('Are you sure you wish to delete this item?'))
                deleteNote(note._id, props.showAlert);
              }}
              className="mx-2 hover:scale-105 text-purple-500 cursor-pointer"
              size={20}
            />
            <AiOutlineEdit
              onClick={() => onOpenModal1()}
              className="mx-2 hover:scale-105 text-purple-500 cursor-pointer"
              size={20}
            />
          </div>
        </div>
        <h3 className="font-light">#{note.tag.slice(0, 20)}</h3>
        <p className="my-2 font-semibold h-20 overflow-hidden text-ellipsis">
          {note.description.slice(0, 100)}...{" "}
        </p>
        <button  onClick={() => onOpenModal2()} className="py-1 px-3 font-bold hover:scale-105 rounded-md bg-purple-500 text-white mr-auto">View</button>
      </div>
    </div>
  );
};

export default NoteItem;
