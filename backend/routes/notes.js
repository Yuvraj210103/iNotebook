const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using: GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add the  new notes using: POST "api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a  Valid title").isLength({ min: 3 }),
    body("description", "").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there is error return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update the existing notes using: GET "api/notes/updatenote". Login required
router.put( "/updatenote/:id",fetchuser,async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        
    
    //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(tag){newNote.tag = tag};
    if(description){newNote.description = description};

    //Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}
}
);



// Route 4: Delete the existing notes using: Delete "api/notes/deletenote/:id". Login required
router.delete( "/deletenote/:id",fetchuser,async (req, res) => {
    
    try {
        
    

    //Find the note to be deleted 
    let note = await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")}

    //Allow deleteion only if  user owns it

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json("Success note is deleted");
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error"); 
}
}
);

module.exports = router;
