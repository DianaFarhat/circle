const express = require("express");
const router = express.Router();
const { createTag } = require("../controllers/tagController");
const { authenticate } = require("../middlewares/authMiddleware");



// Create a new tag 
router.post("/createTag", authenticate, createTag);

/* // Update a tag by ID 
router.put("/:id", authenticate, updateTag);

// Delete a tag by ID 
router.delete("/:id", authenticate, deleteTag);

// Get all tags
router.get("/", getTags); */

module.exports = router;
