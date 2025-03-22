import React, { useState } from 'react';


const fallbackImage = 'https://i.pinimg.com/736x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg';

const CreateMeal = () => {
    const [image, setImage] = useState(fallbackImage);
    const [mealName, setMealName] = useState('Matcha Latte');

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

    const handleUrlChange = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            setImage(url);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <div className="position-relative">
                <img
                    src={image}
                    alt="Meal Image"
                    className="img-fluid rounded shadow"
                    style={{ height: '400px', objectFit: 'cover', width: '100%' }}
                />
                <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                    <button onClick={handleUrlChange} className="btn btn-primary">Change URL</button>
                    <label htmlFor="file-upload" className="btn btn-secondary">
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
            <div className="card mt-4 shadow">
                <div className="card-body">
                    <input
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                        className="form-control border-0 text-center fs-3 fw-bold"
                        style={{ background: 'transparent' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateMeal;
