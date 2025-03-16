const Meal= require("../models/mealModel");



// Get all public meals
exports.getPublicMeals = async (req, res) => {
    try {
        const publicMeals = await Meal.find({ isPublic: true }); // Fetch meals where isPublic is true
        res.status(200).json(publicMeals);
    } catch (error) {
        console.error("Error fetching public meals:", error);
        res.status(500).json({ message: "Server error fetching public meals." });
    }
};

exports.getUserMeals = (req, res) => {
    res.send("getUserMeals function not implemented yet.");
};

exports.getMealById = (req, res) => {
    res.send("getMealById function not implemented yet.");
};

exports.savePublicMealAsPrivate = (req, res) => {
    res.send("savePublicMealAsPrivate function not implemented yet.");
};

// Create a new meal (user must be authenticated)
/* exports.createMeal = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        // Extract meal details from the request body
        const {
            name,
            type,
            image,
            description,
            recipeUrl,
            videoUrl,
            tags,
            calories,
            servingSize,
            macros,
            sugar,
            fiber,
            sodium,
            caffeine,
            cholesterol,
            saturatedFats,
            unsaturatedFats,
            ingredients,
            recipeSteps,
            isPublic
        } = req.body;

        // Validate required fields
        if (!name || !type || !image || !description || !calories || !servingSize || !macros) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Create new meal object
        const newMeal = new Meal({
            name,
            type,
            image,
            description,
            recipeUrl,
            videoUrl,
            tags,
            calories,
            servingSize,
            macros,
            sugar,
            fiber,
            sodium,
            caffeine,
            cholesterol,
            saturatedFats,
            unsaturatedFats,
            ingredients,
            recipeSteps,
            isPublic: false, // Default to public if not provided
            createdBy: req.user.id // Assign authenticated user as creator
        });

        // Save to database
        const savedMeal = await newMeal.save();

        // Return success response
        res.status(201).json({
            message: "Meal created successfully!",
            meal: savedMeal
        });

    } catch (error) {
        console.error("Error creating meal:", error);
        res.status(500).json({ message: "Server error while creating meal." });
    }
}; */

exports.createMeal = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        // Extract meal details from the request body
        const {
            name,
            type,
            image,
            description,
            recipeUrl,
            videoUrl,
            tags,
            calories,
            servingSize,
            macros,
            sugar,
            fiber,
            sodium,
            caffeine,
            cholesterol,
            saturatedFats,
            unsaturatedFats,
            ingredients,
            recipeSteps,
            isPublic
        } = req.body;

        // Validate required fields
        if (!name || !type || !image || !description || !calories || !servingSize || !macros) {
            return res.status(400).json({ message: "Missing required fields. Ensure all mandatory fields are provided." });
        }

        // Create new meal object
        const newMeal = new Meal({
            name,
            type,
            image,
            description,
            recipeUrl,
            videoUrl,
            tags,
            calories,
            servingSize,
            macros,
            sugar,
            fiber,
            sodium,
            caffeine,
            cholesterol,
            saturatedFats,
            unsaturatedFats,
            ingredients,
            recipeSteps,
            isPublic: isPublic !== undefined ? isPublic : false, // Default to false if not provided
            createdBy: req.user.id // Assign authenticated user as creator
        });

        // Save to database
        const savedMeal = await newMeal.save();

        // Return success response
        res.status(201).json({
            message: "Meal created successfully!",
            meal: savedMeal
        });

    } catch (error) {
        console.error("Error creating meal:", error); // Log full error stack

        // Handle Mongoose Validation Errors
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", errors: error.errors });
        }

        // Handle Duplicate Key Errors (e.g., unique constraints)
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate entry detected. The meal name might already exist." });
        }

        // Handle Other Errors (e.g., Database Connection Issues)
        res.status(500).json({
            message: "An unexpected error occurred while creating the meal.",
            error: error.message
        });
    }
};


exports.updateMeal = (req, res) => {
    res.send("updateMeal function not implemented yet.");
};

exports.deleteMeal = (req, res) => {
    res.send("deleteMeal function not implemented yet.");
};

exports.searchMeals = (req, res) => {
    res.send("searchMeals function not implemented yet.");
};

exports.filterMeals = (req, res) => {
    res.send("filterMeals function not implemented yet.");
};

exports.sortMeals = (req, res) => {
    res.send("sortMeals function not implemented yet.");
};

exports.getMealSaves = (req, res) => {
    res.send("getMealSaves function not implemented yet.");
};

