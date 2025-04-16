const express= require('express')
const router = express.Router();
const { 
    getPublicMeals, 
    createMeal, 
    getMealById,
    getUserMeals,
    saveMealAsCopy,
    deleteMeal,
} = require('../controllers/mealController');  // Ensure the path is correct

const {authenticate, optionalAuthenticate}= require('../middlewares/authMiddleware')




// Create a new meal (private if authorized)
router.post("/createMeal", authenticate, createMeal);

// Edit Meal (private if authorized)
router.put("/editMeal/:mealId", authenticate, editMeal);

// Route to get all public meals
router.get("/publicMeals", getPublicMeals);

//Rout to get user meals (private ones)
router.get("/userMeals", authenticate, getUserMeals);

// Route to get a meal by ID
router.get('/:mealId', optionalAuthenticate, getMealById);

// Save a public meal to the user's meals (My Meals)
router.post('/saveToMyMeals/:mealId', authenticate, saveMealAsCopy);

//Delete Meal by its Creator
router.delete('/deleteMeal/:mealId', authenticate, deleteMeal);




 
module.exports = router; 