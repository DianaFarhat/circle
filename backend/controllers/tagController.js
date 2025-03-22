const Tag = require("../models/tagModel");



// Get Public Tags (Everyone can access)
exports.getPublicTags = async (req, res) => {
  try {
      const tags = await Tag.find({ isPublic: true }); // Fetch only public tags
      res.status(200).json(tags);
  } catch (err) {
      res.status(500).json({ message: "Error fetching tags" });
  }
};


//Create Tag (User)
exports.createTag = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user._id;
  
      // Check if the tag already exists
      const existingTag = await Tag.findOne({ name: name.trim().toLowerCase() });
      if (existingTag) {
        return res.status(409).json({ message: "Tag already exists." });
      }
  
      // Create a new private tag
      const newTag = new Tag({
        name: name.trim().toLowerCase(),
        createdBy: userId,
        isPublic: false,
      });
  
      await newTag.save();
      res.status(201).json({ message: "Tag created successfully", tag: newTag });
    } catch (err) {
      res.status(500).json({ message: "Error creating tag" });
    }
};


//Edit a Private Tag (User)
exports.editTag = async (req, res) => {
    try {
      const { tagId, newName } = req.body;
      const userId = req.user._id;
  
      // Find the tag
      const tag = await Tag.findById(tagId);
      if (!tag) return res.status(404).json({ message: "Tag not found" });
  
      // Authorization Check: User should be the creator and the tag should not be public
      if (tag.isPublic || tag.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You are not authorized to edit this tag" });
      }
  
      // Update the tag name
      tag.name = newName.trim().toLowerCase();
      await tag.save();
  
      res.status(200).json({ message: "Tag updated successfully", tag });
    } catch (err) {
      res.status(500).json({ message: "Error updating tag" });
    }
};

//Delete a private tag (User)
exports.deleteTag = async (req, res) => {
    try {
      const { tagId } = req.params;
      const userId = req.user._id;
  
      const tag = await Tag.findById(tagId);
      if (!tag) return res.status(404).json({ message: "Tag not found" });
  
      // Authorization Check: User should be the creator and the tag should not be public
      if (tag.isPublic || tag.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this tag" });
      }
  
      await Tag.findByIdAndDelete(tagId);
      res.status(200).json({ message: "Tag deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting tag" });
    }
};

exports.makeMealPublic = async (req, res) => {
    try {
      const { mealId } = req.body;
      const isAdmin = req.user.role === "admin";
  
      if (!isAdmin) {
        return res.status(403).json({ message: "Only admins can make meals public." });
      }
  
      const meal = await Meal.findById(mealId).populate("tags");
      if (!meal) return res.status(404).json({ message: "Meal not found" });
  
      // Update meal visibility
      meal.isPublic = true;
      await meal.save();
  
      // Make all associated tags public
      const tagIds = meal.tags.map(tag => tag._id);
      await Tag.updateMany({ _id: { $in: tagIds } }, { $set: { isPublic: true } });
  
      res.status(200).json({ message: "Meal made public successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error making meal public" });
    }
};
  
  

  
  
