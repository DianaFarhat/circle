import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBox, FaTag, FaFire, FaEdit, FaTimes, FaLink, FaVideo } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetMealByIdQuery, useEditMealMutation } from "../../services/mealApi";

import { useSelector } from "react-redux";

const fallbackImage = 'https://i.pinimg.com/736x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg';

const EditMeal = () => {
    //Get User
    const userId = useSelector((state) => state.auth.userInfo?._id);

    //Get Meal
    const { mealId } = useParams(); // gets the meal ID from the URL
    const { data: meal, isLoading } = useGetMealByIdQuery(mealId);
    const [updateMeal] = useEditMealMutation();

    //Meal States
    const [image, setImage] = useState(fallbackImage);
    const [imageUrlInputVisible, setImageUrlInputVisible] = useState(false); //is visible if user decides to add imageUrl
    const [imageUrl, setImageUrl] = useState("");
    const [mealName, setMealName] = useState('');
    const [type, setType] = useState('simple');
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [calories, setCalories] = useState('');
    const [servingSizeValue, setServingSizeValue] = useState('');
    const [servingSizeUnit, setServingSizeUnit] = useState('');
    const [servingSizeDescription, setServingSizeDescription] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [nutrients, setNutrients] = useState({ carbs:0, protein:0, saturatedFats:0, unsaturatedFats: 0, sugar:0, fiber:0, sodium: 0, caffeine:0, cholesterol:0});
    const nutrientsUnits = {
        carbs: "g",
        protein: "g",
        saturatedFats: "g",
        unsaturatedFats: "g",
        sugar: "g",
        fiber: "g",
        sodium: "mg",
        caffeine: "mg",
        cholesterol: "mg"
     
    };
   
    const [sectionedRecipe, setSectionedRecipe] = useState([
        {
          title: '',
          ingredients: [],
          steps: [],
        }
    ]);
      
   
    //Pre-fill Meal Data
    useEffect(() => {
      if (meal) {
        setMealName(meal.name || '');
        setType(meal.type || 'simple');
        setImage(meal.image || fallbackImage);
        setTags(meal.tags || []);
        setCalories(meal.calories?.toString() || '');
        setServingSizeValue(meal.servingSize?.value?.toString() || '');
        setServingSizeUnit(meal.servingSize?.unit || '');
        setServingSizeDescription(meal.servingSize?.description || '');
        setRecipeUrl(meal.recipeUrl || '');
        setVideoUrl(meal.videoUrl || '');
        setNutrients({
          carbs: meal.carbs?.toString() || '',
          protein: meal.protein?.toString() || '',
          saturatedFats: meal.saturatedFats?.toString() || '',
          unsaturatedFats: meal.unsaturatedFats?.toString() || '',
          sugar: meal.sugar?.toString() || '',
          fiber: meal.fiber?.toString() || '',
          sodium: meal.sodium?.toString() || '',
          caffeine: meal.caffeine?.toString() || '',
          cholesterol: meal.cholesterol?.toString() || '',
        });
        setSectionedRecipe(meal.sectionedRecipe || []);
      }
    }, [meal]);
    
    
    //Dispatches data to api then navigates
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Handle image upload from desktop
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle image upload via URL
    const handleUrlSubmit = () => {
        if (imageUrl.trim() !== "") {
            setImage(imageUrl);
            setImageUrlInputVisible(false); // Hide input after submission
        }
    };

    const addTag = () => {
        if (tag.trim() !== "" && tags.length < 20) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };


    const handleEditMeal = async () => {
        if (!userId) {
            return toast.error('User not authenticated!');
        }

        if (!mealName.trim()) return toast.error('Meal Name is required!');
        if (!calories || calories <= 0 || calories > 3000) return toast.error('Valid Calories are required!');
        
      
        // Validate Serving Size
        if (!servingSizeValue.trim() || isNaN(parseFloat(servingSizeValue)) || parseFloat(servingSizeValue) <= 0) 
            return toast.error('Serving size value must be a positive number!');
        if (!servingSizeUnit.trim()) 
            return toast.error('Serving size unit is required!');
        // Optional: Validate servingSizeDescription if provided
        if (servingSizeDescription.trim()) {
            if (servingSizeDescription.length > 200) {
                return toast.error('Serving description cannot exceed 200 characters!');
            }
            if (!/^[\w\s.,'’()&+-:;!%"/]*$/.test(servingSizeDescription)) {
                return toast.error('Serving description contains invalid characters!');
            }
        }


        // Nutrient Validation
        for (const [key, value] of Object.entries(nutrients)) {
            const numericValue = parseFloat(value);
    
          
            if (isNaN(numericValue) || numericValue < 0 || numericValue > 1000) {
                return toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} must be a positive number and cannot exceed 1000!`);
            }
            if (!/^\d+(\.\d+)?$/.test(value)) {
                return toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} must be a valid number (no alphabets allowed)!`);
            }
        }

        //Section Verification
        if (type === 'recipe') {
            if (!sectionedRecipe.length) return toast.error("At least one recipe section is required!");
        
            for (let secIndex = 0; secIndex < sectionedRecipe.length; secIndex++) {
                const section = sectionedRecipe[secIndex];
        
                if (!section.title.trim()) {
                    return toast.error(`Section ${secIndex + 1} must have a title.`);
                }
        
                // Validate ingredients ONLY IF any exist
                if (section.ingredients.length > 0) {
                    for (let ingIndex = 0; ingIndex < section.ingredients.length; ingIndex++) {
                        const ing = section.ingredients[ingIndex];
                        if (!ing.name.trim()) return toast.error(`Ingredient ${ingIndex + 1} in section ${secIndex + 1} must have a name.`);
                        if (!/^[A-Za-z\s]+$/.test(ing.name)) return toast.error(`Ingredient name must be alphabetic at ${ingIndex + 1} in section ${secIndex + 1}.`);
                        if (ing.name.length > 200) return toast.error(`Ingredient name too long at ${ingIndex + 1} in section ${secIndex + 1}.`);
                        if (isNaN(parseFloat(ing.amount)) || parseFloat(ing.amount) < 0 || parseFloat(ing.amount) > 10000) return toast.error(`Invalid amount at ingredient ${ingIndex + 1} in section ${secIndex + 1}.`);
                        if (!ing.unit) return toast.error(`Unit required for ingredient ${ingIndex + 1} in section ${secIndex + 1}.`);
                        if (isNaN(parseFloat(ing.calories)) || parseFloat(ing.calories) < 0 || parseFloat(ing.calories) > 1000) return toast.error(`Invalid calories at ingredient ${ingIndex + 1} in section ${secIndex + 1}.`);
                    }
                }
        
                // Validate steps ONLY IF any exist
                if (section.steps.length > 0) {
                    if (section.steps.length > 30) {
                        return toast.error(`You can only add up to 30 steps in section ${secIndex + 1}.`);
                    }
                    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
                        const step = section.steps[stepIndex];
                        if (!step.trim()) return toast.error(`Step ${stepIndex + 1} in section ${secIndex + 1} must not be empty.`);
                        if (step.length > 500) return toast.error(`Step ${stepIndex + 1} in section ${secIndex + 1} is too long (max 500 characters).`);
                    }
                }
            }
        }
        
    
        // All validations passed, now proceed with meal creation
        const mealData = {
            name: mealName,
            type: type.toLowerCase(),
            image: image,
            recipeUrl: recipeUrl,
            videoUrl: videoUrl,
            tags: tags,
            calories: parseFloat(calories),
            servingSize: {
                value: parseFloat(servingSizeValue),  // Directly parse the float here
                unit: servingSizeUnit.trim(),
                description: servingSizeDescription.trim() || undefined, // optional
            },
            
            carbs: parseFloat(nutrients.carbs),
            protein: parseFloat(nutrients.protein),
            sugar: parseFloat(nutrients.sugar),
            fiber: parseFloat(nutrients.fiber),
            sodium: parseFloat(nutrients.sodium),
            caffeine: parseFloat(nutrients.caffeine),
            cholesterol: parseFloat(nutrients.cholesterol),
            saturatedFats: parseFloat(nutrients.saturatedFats),
            unsaturatedFats: parseFloat(nutrients.unsaturatedFats),
            sectionedRecipe: sectionedRecipe.map(section => ({
                title: section.title.trim(),
                ingredients: section.ingredients.map(ingredient => ({
                    name: ingredient.name.trim(),
                    amount: {
                        value: parseFloat(ingredient.amount),
                        unit: ingredient.unit,
                    },
                    calories: parseFloat(ingredient.calories),
                    brand: ingredient.brand?.trim() || "",
                    isOptional: ingredient.optional === "Yes",
                })),
                steps: section.steps.map(step => step.trim()),
            })),
            version: 1,
            createdBy: userId,
        };
        try {
            console.log("Sending meal data:", mealData); // Debugging line
            await updateMeal({ mealId, mealData });
            toast.success("Meal updated successfully!");
            navigate('/');
        } catch (error) {
            console.error('Error updating meal:', error);
            if (error?.data?.message) {
                toast.error(`Error: ${error.data.message}`);
            } else if (error?.message) {
                toast.error(`Error: ${error.message}`);
            } else {
                toast.error('An unknown error occurred. Please try again.');
            }
        }
    };
    
    return (
        <div className="container mt-0">
           {isLoading ? (
              <div className="text-center mt-5">Loading...</div>
            ) : !meal ? (
              <div className="text-center mt-5 text-danger">Meal not found or doesn't exist.</div>
            ) : (
              // Your full form JSX goes here
              <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                  <div className="text-center mb-4 p-3 bg-white shadow rounded position-relative">
                      {/* Pill Button on Top */}
                      <div className="position-absolute" style={{ top: '20px', right: '20px' }}>
                          <div className="d-flex gap-0">
                              <button onClick={() => setImageUrlInputVisible(!imageUrlInputVisible)} 
                                  className="btn px-3 py-1" 
                                  style={{ backgroundColor: '#FDFD96', color: 'black', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}>
                                  Image URL
                              </button>
                              <label htmlFor="file-upload" className="btn px-3 py-1" 
                                  style={{ backgroundColor: '#b5fd94', color: 'black', borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
                                  Upload
                                  <input
                                      id="file-upload"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                      style={{ display: 'none' }}
                                  />
                              </label>
                          </div>
                      </div>

                      {/* Image URL Input (Appears Below the Pill Buttons) */}
                      {imageUrlInputVisible && (
                          <div className="position-absolute d-flex align-items-center"
                              style={{
                                  top: '60px',  // 20px below the pill (pill is at 20px)
                                  right: '20px', // 20px from the right
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  padding: '10px',
                                  borderRadius: '8px',
                                  boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                              }}>
                              <input
                                  type="text"
                                  className="form-control me-2"
                                  placeholder="Paste an image URL..."
                                  value={imageUrl}
                                  onChange={(e) => setImageUrl(e.target.value)}
                              />
                              <button className="btn btn-primary" onClick={() => {
                                  handleUrlSubmit();
                                  setImageUrlInputVisible(false); // Hide input after submitting
                              }}>Set</button>
                          </div>
                      )}
       
                      {/* Existing Image & Input */}
                      <img
                          src={image}
                          alt="Meal Image"
                          className="img-fluid rounded shadow"
                          style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                      />
                      <input 
                          type="text" 
                          className="form-control text-center border-0 fs-4 fw-bold" 
                          placeholder="Matcha Latte" 
                          value={mealName} 
                          onChange={(e) => setMealName(e.target.value)} 
                      />
                  </div>
                  <div className="row g-3 shadow" >
                      <div className="col-md-6 p-3 rounded">
                          <h4 className="fw-bold mb-3">General Info</h4>
                          <div className="mb-3">
                          <label>Meal Type</label>
                          <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                              <option value="simple">Simple</option>
                              <option value="recipe">Recipe</option>
                          </select>
                          </div>
                          <label>Calories</label>
                          <input type="number" className="form-control border-0" placeholder="Enter Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
                          <label>Serving Size Value</label>
                          <input
                              type="number"
                              className="form-control border-0"
                              placeholder="Enter serving size value"
                              required
                              value={servingSizeValue}
                              min="0"
                              max="1000"
                              step="0.01"
                              onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d+(\.\d{0,2})?$/.test(value) && parseFloat(value) <= 1000) {
                                      setServingSizeValue(value);
                                  }
                              }}
                          />
                          <label>Serving Size Unit</label>
                          <input
                              type="text"
                              className="form-control border-0"
                              placeholder="Enter unit (e.g., g, ml, slice)"
                              required
                              value={servingSizeUnit}
                              onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^[A-Za-z\s]*$/.test(value)) {
                                      setServingSizeUnit(value);
                                  }
                              }}
                          />
                          <label>Serving Description</label>
                          <input
                          type="text"
                          className="form-control border-0"
                          placeholder="e.g., 1 bowl with sauce and rice"
                          value={servingSizeDescription}
                          onChange={(e) => setServingSizeDescription(e.target.value)}
                          />
                          <label>Recipe URL <FaLink /></label>
                          <input type="text" className="form-control border-0" placeholder="Enter Recipe URL" value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} />
                          <label>Video URL <FaVideo /></label>
                          <input type="text" className="form-control border-0" placeholder="Enter Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                          <label>Tags</label>
                          <div className="d-flex gap-2">
                              <input type="text" className="form-control border-0" placeholder="Add a tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                              <button className="btn btn-primary" onClick={addTag}>Add</button>
                          </div>
                          <div className="d-flex flex-wrap gap-2 mt-2">
                              {tags.map((t, index) => (
                                  <div key={index} className="badge bg-secondary d-flex align-items-center">
                                      {t} <FaTimes className="ms-2 cursor-pointer" onClick={() => removeTag(index)} />
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="col-md-6 p-3 bg-white rounded">
                          <h4 className="fw-bold mb-3">Nutrition Facts</h4>
                          <table className="table">
                              <tbody>
                                  {Object.keys(nutrients).map((key) => (
                                      <tr key={key}>
                                          <td className="fw-bold">
                                              {key.charAt(0).toUpperCase() + key.slice(1)} ({nutrientsUnits[key]})
                                          </td>
                                          <td>
                                              <input
                                                  type="text"
                                                  className="form-control border-0"
                                                  placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                                  value={nutrients[key]}
                                                  onChange={(e) => setNutrients({ ...nutrients, [key]: e.target.value })}
                                              />
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>

                          </table>
                      </div>
                  </div>
                  {type === 'recipe' && (
                  <div className="mt-4 p-3 bg-white shadow rounded">
                      <h4 className="fw-bold">Recipe Sections</h4>
                      {sectionedRecipe.map((section, secIndex) => (
                      <div key={secIndex} className="mb-4 border rounded p-3 bg-light">
                          <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Section title (e.g., Salad, Dressing)"
                          value={section.title}
                          onChange={(e) => {
                              const updated = [...sectionedRecipe];
                              updated[secIndex].title = e.target.value;
                              setSectionedRecipe(updated);
                          }}
                          />

                          <h5>Ingredients</h5>
                          {section.ingredients.map((ingredient, ingIndex) => (
                          <div key={ingIndex} className="mb-3">
                              <div className="d-flex gap-2 mb-2">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  required
                                  value={ingredient.name}
                                  onChange={(e) => {
                                  const updated = [...sectionedRecipe];
                                  updated[secIndex].ingredients[ingIndex].name = e.target.value;
                                  setSectionedRecipe(updated);
                                  }}
                              />
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  required
                                  value={ingredient.amount}
                                  onChange={(e) => {
                                  const updated = [...sectionedRecipe];
                                  updated[secIndex].ingredients[ingIndex].amount = e.target.value;
                                  setSectionedRecipe(updated);
                                  }}
                              />
                              <select
                                  className="form-control"
                                  value={ingredient.unit}
                                  onChange={(e) => {
                                  const updated = [...sectionedRecipe];
                                  updated[secIndex].ingredients[ingIndex].unit = e.target.value;
                                  setSectionedRecipe(updated);
                                  }}
                              >
                                  {["g", "kg", "mg", "lb", "oz", "ml", "L", "cup", "tbsp", "tsp", "piece", "slice", "pinch", "trace", "scoop"].map(unit => (
                                  <option key={unit} value={unit}>{unit}</option>
                                  ))}
                              </select>
                              </div>
                              <div className="d-flex gap-2 mb-2">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Calories"
                                  required
                                  value={ingredient.calories}
                                  onChange={(e) => {
                                  const updated = [...sectionedRecipe];
                                  updated[secIndex].ingredients[ingIndex].calories = e.target.value;
                                  setSectionedRecipe(updated);
                                  }}
                              />
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Brand (Optional)"
                                  value={ingredient.brand}
                                  onChange={(e) => {
                                  const updated = [...sectionedRecipe];
                                  updated[secIndex].ingredients[ingIndex].brand = e.target.value;
                                  setSectionedRecipe(updated);
                                  }}
                              />
                              <select
                                  className="form-control"
                                  value={ingredient.optional}
                                  onChange={(e) => {
                                  const updated = [...sectionedRecipe];
                                  updated[secIndex].ingredients[ingIndex].optional = e.target.value;
                                  setSectionedRecipe(updated);
                                  }}
                              >
                                  <option value="No">Required</option>
                                  <option value="Yes">Optional</option>
                              </select>
                              </div>
                          </div>
                          ))}
                          <button
                          className="btn btn-sm btn-secondary mb-3"
                          onClick={() => {
                              const updated = [...sectionedRecipe];
                              updated[secIndex].ingredients.push({ name: '', amount: '', unit: 'g', calories: '', brand: '', optional: 'No' });
                              setSectionedRecipe(updated);
                          }}
                          >+ Ingredient</button>

                          <h5 className="mt-3">Instructions</h5>
                          {section.steps.map((step, stepIndex) => (
                          <input
                              key={stepIndex}
                              type="text"
                              className="form-control mb-2"
                              placeholder="Step description"
                              required
                              value={step}
                              onChange={(e) => {
                              const updated = [...sectionedRecipe];
                              updated[secIndex].steps[stepIndex] = e.target.value;
                              setSectionedRecipe(updated);
                              }}
                          />
                          ))}
                          <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                              const updated = [...sectionedRecipe];
                              updated[secIndex].steps.push('');
                              setSectionedRecipe(updated);
                          }}
                          >+ Step</button>
                      </div>
                      ))}
                      <button className="btn btn-outline-primary" onClick={() => {
                      setSectionedRecipe([...sectionedRecipe, {
                          title: '',
                          ingredients: [],
                          steps: [],
                      }]);
                      }}>+ Section</button>
                  </div>
                  )}

                  <button className="btn btn-success w-100 mt-3" onClick={handleEditMeal}>Save Changes</button>
              </div>
          </div>
          )}
        </div>
    );
};

export default EditMeal;
