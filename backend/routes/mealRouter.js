const express= require('express')
const router = express.Router();
const { 
    getPublicMeals, 
    createMeal, 
    getMealById
} = require('../controllers/mealController');  // Ensure the path is correct

const {authenticate, optionalAuthenticate}= require('../middlewares/authMiddleware')




// Create a new meal (private if authorized)
router.post("/createMeal", authenticate, createMeal);

// Route to get all public meals
router.get("/publicMeals", getPublicMeals);

// Route to get a meal by ID
router.get('/:mealId', optionalAuthenticate, getMealById);

/*
// Get user's private meals (requires authentication)
router.get("/private", authenticate, getUserMeals);

// Get a specific meal by ID (public)
router.get("/:id", getMealById);

// Get a specific meal by ID (private)
router.get("/:id", authenticate, getMealById);

// Save a public meal as a private copy
router.post("/:id/save", authenticate, savePublicMealAsPrivate);

// Update a private meal
router.put("/:id", authenticate, updateMeal);

// Delete a private meal
router.delete("/:id", authenticate, deleteMeal);

// Search meals by name, ingredients, or description
router.get("/search", searchMeals);

// Filter meals by tags and optionally sort
router.get("/filter", filterMeals);

// Sort meals (by most saved, calories, newest)
router.get("/sort", authenticate, sortMeals);

// Get number of times a meal was saved
router.get("/:id/saves", getMealSaves);


*/




 
module.exports = router; 