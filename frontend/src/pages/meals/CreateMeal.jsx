import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBox, FaTag, FaFire, FaEdit, FaTimes, FaLink, FaVideo } from 'react-icons/fa';

const fallbackImage = 'https://i.pinimg.com/736x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg';

const CreateMeal = () => {
    const [image, setImage] = useState(fallbackImage);
    const [mealName, setMealName] = useState('');
    const [type, setType] = useState('Simple');
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [calories, setCalories] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [nutrients, setNutrients] = useState({ carbs: '', proteins: '', fatsSat: '', fatsUnsat: '', sugar: '', fiber: '', sodium: '', caffeine: '', cholesterol: '' });

    const addTag = () => {
        if (tag.trim() !== "" && tags.length < 20) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleCreateMeal = () => {
        if (!mealName.trim()) return toast.error('Meal Name is required!');
        if (!calories || calories <= 0) return toast.error('Valid Calories are required!');
        for (const [key, value] of Object.entries(nutrients)) {
            if (!value.trim()) return toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required!`);
        }
        toast.success('Meal Created Successfully!');
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="text-center mb-4 p-3 bg-white shadow rounded">
                        <img
                            src={image}
                            alt="Meal Image"
                            className="img-fluid rounded shadow"
                            style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                        />
                        <input 
                            type="text" 
                            className="form-control text-center border-0 fs-4 fw-bold" 
                            placeholder="Meal Title" 
                            value={mealName} 
                            onChange={(e) => setMealName(e.target.value)} 
                        />
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6 p-3 bg-white shadow rounded">
                            <h4 className="fw-bold mb-3">General Info</h4>
                            <label>Calories</label>
                            <input type="number" className="form-control border-0" placeholder="Enter Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
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
                        <div className="col-md-6 p-3 bg-white shadow rounded">
                            <h4 className="fw-bold mb-3">Nutrition Facts</h4>
                            <table className="table">
                                <tbody>
                                    {Object.keys(nutrients).map((key) => (
                                        <tr key={key}>
                                            <td className="fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
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
                    <button className="btn btn-success w-100 mt-3" onClick={handleCreateMeal}>Create Meal</button>
                </div>
            </div>
        </div>
    );
};

export default CreateMeal;
