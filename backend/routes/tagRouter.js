const express = require("express");
const router = express.Router();
const { createTag, getTags, updateTag, deleteTag } = require("../controllers/tagController");
const { authenticate } = require("../middleware/authMiddleware");

// Get all tags
router.get("/", getTags);

// Create a new tag 
router.post("/", authenticate, createTag);

// Update a tag by ID 
router.put("/:id", authenticate, updateTag);

// Delete a tag by ID 
router.delete("/:id", authenticate, deleteTag);

module.exports = router;
