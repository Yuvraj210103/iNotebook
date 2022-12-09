import React,{useState} from "react";
import { Home } from "./Component/Home";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Component/About";
import NoteState from "./context/notes/NoteState";
import NewNote from "./Component/NewNote";
import Notes from "./Component/Notes";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Alert from "./Component/Alert";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  const [showNotes, setShowNotes] = useState(false)
  return (
    <>
      <NoteState>
      <BrowserRouter>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
        <Routes>
       
          <Route path="/" element={<Home  showNotes={setShowNotes}  showAlert={showAlert}/>} />
          <Route path="/about" element={<About  showNotes={setShowNotes} showAlert={showAlert}/>} />
          <Route path="/newnote" element={<NewNote  showNotes={setShowNotes} showAlert={showAlert}/>} />
          <Route path="/login" element={<Login  showNotes={setShowNotes} showAlert={showAlert}/>} />
          <Route path="/register" element={<Register showNotes={setShowNotes} showAlert={showAlert}/>} />


        </Routes>
        {showNotes && <Notes showAlert={showAlert}/>}
        

      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
