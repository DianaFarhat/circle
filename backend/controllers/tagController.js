const Tag = require("../models/tagModel");

// Create a new tag
exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate tag: only alphabets and max length of 30
        const alphaRegex = /^[A-Za-z\s]{1,30}$/;
        if (!alphaRegex.test(name)) {
            return res.status(400).json({ message: "Tag name must contain only alphabets and be 1-30 characters long." });
        }

        // Check for uniqueness
        const existingTag = await Tag.findOne({ name: name.trim().toLowerCase() });
        if (existingTag) {
            return res.status(409).json({ message: "Tag already exists." });
        }

        // Create a new tag instance
        const newTag = new Tag({ name: name.trim().toLowerCase() });
        await newTag.save();

        res.status(201).json({ message: "Tag created successfully.", tag: newTag });
    } catch (err) {
        console.error("Error creating tag:", err);
        res.status(500).json({ message: "Server error while creating tag." });
    }
};
