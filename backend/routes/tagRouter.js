const express = require("express");
const router = express.Router();
const { createTag, editTag, deleteTag,makeMealPublic } = require("../controllers/tagController");
const { authenticate } = require("../middlewares/authMiddleware");



// Create a new tag (User)
router.post("/createTag", authenticate, createTag);

// Edit a private tag (User)
router.put("/:tagId", authenticate, editTag);

// Delete a private tag (User)
router.delete("/:tagId", authenticate, deleteTag);

// Make a meal public, and hence its tags (Admin only)
router.put("/meal/makePublic", authenticate, makeMealPublic);

module.exports = router;

