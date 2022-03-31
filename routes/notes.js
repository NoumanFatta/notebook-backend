const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();



router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be 3 chars long").isLength({ min: 3 }),
    body("description", "Description must be 3 chars long").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({ ...req.body, user: req.user.id });
      const result = await note.save();
      res.json(result);
    } catch (error) {
      res.send(error.message);
    }
  }
);


router.get("/getnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});



router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    if (req.user.id !== note.user.toString())
      return res.status(401).send("not allowed");
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.send(error.message);
  }
});



router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    if (req.user.id !== note.user.toString())
      return res.status(401).send("not allowed");
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
