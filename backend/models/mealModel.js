const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Meal Schema
const mealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {type: String, enum: ["simple", "recipe"], required: true },
    image: { type: String, required: true },
    recipeUrl: { type: String },
    videoUrl: { type: String },
    mealDescription: {type: String},

    tags:[{ type: String }],
    
    nbOfTimesSaved: { type: Number, default: 0 },
    calories: { type: Number, required: true },
    servingSize: {
      value: { type: Number, required: true }, // Numeric value (e.g., 355 for "355ml")
      unit: { type: String, required: true }, // Unit as a string (e.g., "ml", "g", "cup")
      description: { type: String },
    },
    
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
    sugar: { type: Number, required: true },
    fiber: { type: Number, required: true },
    sodium: { type: Number, required: true },
    caffeine: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    saturatedFats: { type: Number, required: true },
    unsaturatedFats: { type: Number, required: true }, 
    points: { type: Number, default:0 },

    //Recipe Section
    sectionedRecipe: [
      {
        title: { type: String, required: true },
        ingredients: {
          type: [
            {
              name: { type: String, required: true, trim: true },
              amount: {
                value: { type: Number, required: true },
                unit: {
                  type: String,
                  required: true,
                  enum: ["g", "kg", "mg", "lb", "oz", "ml", "L", "cup", "tbsp", "tsp", "piece", "slice", "pinch", "trace", "scoop", "cloves", "bag", "can", "handful", "head", "spray", "pieces", "cups"]
                }
              },
              calories: { type: Number, required: true },
              brand: { type: String, trim: true },
              isOptional: { type: Boolean, default: false }
            }
          ],
          default: []
        },
        steps: {
          type: [String],
          default: []
        }
      }
    ],
    
    
    // Versioning and User-Specific Copies
    version: { type: Number, default: 1 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
    parentMealId: { type: Schema.Types.ObjectId, ref: "Meal", default: null }, // Links local versions to public recipes
    isPublic: { type: Boolean, default: false }, // Determines if a meal is public or a user’s private copy
   
  },
  { timestamps: true }
);

// Indexing for quick lookups
mealSchema.index({ createdBy: 1, parentMealId: 1 }); // Optimize private recipe queries

// Pre-save middleware to calculate points
mealSchema.pre("save", function (next) {
  // Only calculate if core nutritional values are provided
  if (this.calories && this.sugar != null && this.protein != null && this.fiber != null) {
    const calories = this.calories || 0;
    const sugar = this.sugar || 0;
    const protein = this.protein || 0;
    const fiber = this.fiber || 0;

    const rawPoints = (calories / 33) + (sugar / 4) - (protein / 10) - (fiber / 5);
    this.points = Math.round(Math.max(0, rawPoints)); // Ensure non-negative and round to nearest int
  }

  next();
});


// Export the Meal model
module.exports = mongoose.model("Meal", mealSchema);