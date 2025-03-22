import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBox, FaTag, FaFire, FaBirthdayCake } from 'react-icons/fa';

const fallbackImage = 'https://i.pinimg.com/736x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg';

const CreateMeal = () => {
    const [image, setImage] = useState(fallbackImage);
    const [mealName, setMealName] = useState('Matcha Latte');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Simple');
    const [tag, setTag] = useState('');
    const [calories, setCalories] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [unit, setUnit] = useState('');
    const [urlInputVisible, setUrlInputVisible] = useState(false);
    const [url, setUrl] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (url) {
            setImage(url);
            setUrlInputVisible(false);
        }
    };

    const handleCreateMeal = () => {
        if (!mealName.trim() || !description.trim() || !calories || calories <= 0 || !servingSize || servingSize <= 0) {
            toast.error('All fields are required and must be valid!');
            return;
        }
        toast.success('Meal Created Successfully!');
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="position-relative text-center">
                        <img
                            src={image}
                            alt="Meal Image"
                            className="img-fluid rounded shadow"
                            style={{ height: '400px', objectFit: 'cover', width: '100%' }}
                        />
                        <div className="position-absolute" style={{ top: '20px', right: '20px' }}>
                            <div className="d-flex gap-0">
                                <button onClick={() => setUrlInputVisible(!urlInputVisible)} className="btn px-3 py-1" style={{ backgroundColor: '#FDFD96', color: 'black', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}>Image URL</button>
                                <label htmlFor="file-upload" className="btn px-3 py-1" style={{ backgroundColor: '#b5fd94', color: 'black', borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
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
                    </div>
                    <div className="mt-4 text-start shadow p-3 rounded bg-white">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <FaBox />
                            <label className="form-label mb-0">Type:</label>
                            <select className="form-select border-0" value={type} onChange={(e) => setType(e.target.value)} required style={{ outline: 'none', width: '150px' }}>
                                <option value="Simple">Simple</option>
                                <option value="Recipe">Recipe</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <FaTag />
                            <label className="form-label mb-0">Tags:</label>
                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Add a new private tag..."
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                style={{ outline: 'none', width: '150px' }}
                            />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <FaFire />
                            <label className="form-label mb-0">Calories:</label>
                            <input
                                type="number"
                                max="3000"
                                min="1"
                                className="form-control border-0"
                                placeholder="Calories"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                style={{ outline: 'none', width: '150px' }}
                                required
                            />
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <FaBirthdayCake />
                            <label className="form-label mb-0">Serving Size:</label>
                            <input
                                type="number"
                                min="1"
                                className="form-control border-0"
                                placeholder="1"
                                value={servingSize}
                                onChange={(e) => setServingSize(e.target.value)}
                                style={{ outline: 'none', width: '100px' }}
                                required
                            />
                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="loaf"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                style={{ outline: 'none', width: '100px' }}
                                required
                            />
                        </div>
                        <button className="btn w-100 text-white" style={{ backgroundColor: '#b5fd94' }} onClick={handleCreateMeal}>Create Meal</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeal;