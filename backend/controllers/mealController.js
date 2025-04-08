const Meal= require("../models/mealModel");

// Nutrition facts validation
const nutritionFacts = [
{ key: 'sugar', label: 'Sugar' },
{ key: 'fiber', label: 'Fiber' },
{ key: 'sodium', label: 'Sodium' },
{ key: 'caffeine', label: 'Caffeine' },
{ key: 'cholesterol', label: 'Cholesterol' },
{ key: 'saturatedFats', label: 'Saturated Fats' },
{ key: 'unsaturatedFats', label: 'Unsaturated Fats' },
{ key: 'protein', label: 'Protein' },
{ key: 'carbs', label: 'Carbohydrates' }
];

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
            protein,
            carbs,
            ingredients,
            recipeSteps,
            nbOfTimesSaved,
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

        //Validate Nutrition Facts
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
            protein,
            carbs,
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


//Get Public Meals (All Meals)
exports.getPublicMeals = async (req, res) => {
    try {
        // Fetch all meals where isPublic is true
        const publicMeals = await Meal.find({ isPublic: true });

        // Respond with the list of public meals
        res.status(200).json({
            message: "Public meals retrieved successfully.",
            meals: publicMeals
        });
    } catch (error) {
        console.error("Error retrieving public meals:", error.message);
        res.status(500).json({
            message: "An error occurred while fetching public meals.",
            error: error.message
        });
    }
};



// Get User Meals
exports.getUserMeals = async (req, res) => {
    try {
        const userId = req.user._id;
        const meals = await Meal.find({ createdBy: userId });

        if (!meals) {
            return res.status(404).json({ message: 'No meals found for this user' });
        }

        res.status(200).json({ meals });
    } catch (error) {
        console.error('Error fetching user meals:', error.message);
        res.status(500).json({ message: 'An error occurred while fetching user meals', error: error.message });
    }
};



//Get Meal By Id
exports.getMealById = async (req, res) => {
    try {
        const mealId = req.params.mealId;
        const userId = req.user ? req.user.id : null;

        const meal = await Meal.findById(mealId);

        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        // Check if the meal is public or if the user is the creator
        if (!meal.isPublic && meal.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to view this meal.' });
        }

        res.status(200).json(meal);
    } catch (error) {
        console.error('Error fetching meal:', error.message);
        res.status(500).json({ message: 'An error occurred while fetching the meal', error: error.message });
    }
};


//Save Public Meal To My Meals
exports.saveMealAsCopy = async (req, res) => {
    try {
      const userId = req.user?.id;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
      }
  
      const { mealId } = req.params;
  
      const originalMeal = await Meal.findById(mealId);
      if (!originalMeal || !originalMeal.isPublic) {
        return res.status(404).json({ message: "Public meal not found." });
      }
  
      // Increment save count
      originalMeal.nbOfTimesSaved += 1;
      await originalMeal.save();
  
      // Create the private copy
      const copiedMeal = new Meal({
        name: originalMeal.name,
        type: originalMeal.type,
        image: originalMeal.image,
        recipeUrl: originalMeal.recipeUrl,
        videoUrl: originalMeal.videoUrl,
        tags: originalMeal.tags,
        calories: originalMeal.calories,
        servingSize: originalMeal.servingSize,
        sugar: originalMeal.sugar,
        fiber: originalMeal.fiber,
        sodium: originalMeal.sodium,
        caffeine: originalMeal.caffeine,
        cholesterol: originalMeal.cholesterol,
        saturatedFats: originalMeal.saturatedFats,
        unsaturatedFats: originalMeal.unsaturatedFats,
        protein: originalMeal.protein,
        carbs: originalMeal.carbs,
        ingredients: originalMeal.ingredients,
        recipeSteps: originalMeal.recipeSteps,
        version: originalMeal.nbOfTimesSaved,
        parentMealId: originalMeal._id,
        createdBy: userId,
        isPublic: false
      });
  
      const savedCopy = await copiedMeal.save();
  
      res.status(201).json({
        message: "Meal saved to your meals.",
        meal: savedCopy
      });
    } catch (error) {
      console.error("Error saving meal copy:", error.message);
      res.status(500).json({
        message: "An error occurred while saving the meal.",
        error: error.message
      });
    }
};
  

//Delete a User's Meal
const deleteMeal = async (req, res) => {
    try {
      const mealId = req.params.id;
      const userId = req.user._id; // assuming you get the user from JWT middleware
  
      const meal = await Meal.findById(mealId);
      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' });
      }
  
      // ✅ Check ownership
      if (meal.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this meal' });
      }
  
      await Meal.findByIdAndDelete(mealId);
      res.status(200).json({ message: 'Meal deleted successfully' });
    } catch (err) {
      console.error('Error deleting meal:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

