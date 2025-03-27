const Meal= require("../models/mealModel");

// Top of your file (recommended)
const nutritionFacts = [
    { key: 'carbs', label: 'Carbs' },
    { key: 'protein', label: 'Protein' },
    { key: 'saturatedFats', label: 'Saturated fats' },
    { key: 'unsaturatedFats', label: 'Unsaturated fats' },
    { key: 'sugar', label: 'Sugar' },
    { key: 'fiber', label: 'Fiber' },
    { key: 'sodium', label: 'Sodium' },
    { key: 'caffeine', label: 'Caffeine' },
    { key: 'cholesterol', label: 'Cholesterol' }
];


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
            recipeUrl,
            videoUrl,
            tags,
            calories,
            servingSize,
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
        const errors = [];

        if (!name) errors.push("Name is required.");
        if (!type || !["simple", "recipe"].includes(type.toLowerCase())) 
            errors.push("Type is required and must be 'simple' or 'recipe'.");
        if (!image) errors.push("Image is required.");
        if (!Number.isFinite(calories)) errors.push("Calories are required.");
        if (!servingSize || !Number.isFinite(servingSize.value) || !servingSize.unit) 
            errors.push("Serving size with value and unit is required.");
        
        // Nutrition facts validation
        nutritionFacts.forEach(fact => {
            if (!Number.isFinite(req.body[fact.key]) || req.body[fact.key] < 0) {
                errors.push(`${fact.label} is required and must be a positive number or zero.`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation Error", errors });
        }

        // Determine public status based on user role
        const userRole = req.user.role;
        const finalIsPublic = userRole === "admin" ? true : false;

        // Create new meal object
        const newMeal = new Meal({
            name,
            type,
            image,
            recipeUrl,
            videoUrl,
            tags,
            calories,
            servingSize,
            sugar,
            fiber,
            sodium,
            caffeine,
            cholesterol,
            saturatedFats,
            unsaturatedFats,
            ingredients,
            recipeSteps,
            isPublic: finalIsPublic,
            createdBy: req.user.id
        });

        // Save to database
        const savedMeal = await newMeal.save();

        res.status(201).json({
            message: "Meal created successfully!",
            meal: savedMeal
        });
    } catch (error) {
        console.error("Error creating meal:", error.message);

        if (error.name === "ValidationError") {
            const validationErrors = Object.entries(error.errors).map(([field, err]) => `${field}: ${err.message}`);
            return res.status(400).json({ message: "Validation Error", errors: validationErrors });
        }

        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate entry detected. The meal name might already exist." });
        }

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

