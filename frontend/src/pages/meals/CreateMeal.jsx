import React, { useState } from 'react';


const fallbackImage = 'https://i.pinimg.com/736x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg';

const CreateMeal = () => {
    const [image, setImage] = useState(fallbackImage);
    const [mealName, setMealName] = useState('Matcha Latte');
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

    return (
        <div className="container mt-5 text-center">
            <div className="position-relative">
                <img
                    src={image}
                    alt="Meal Image"
                    className="img-fluid rounded shadow"
                    style={{ height: '400px', objectFit: 'cover', width: '100%' }}
                />
                <div className="position-absolute top-0 end-0 d-flex">
                    <button onClick={() => setUrlInputVisible(!urlInputVisible)} className="btn" style={{ backgroundColor: '#FDFD96', color: 'black', borderRadius: '0', width: '80px' }}>URL</button>
                    <label htmlFor="file-upload" className="btn" style={{ backgroundColor: '#b5fd94', color: 'black', borderRadius: '0', width: '80px' }}>
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
                {urlInputVisible && (
                    <div className="card p-3 shadow position-absolute top-50 start-50 translate-middle bg-white">
                        <h5 className="fw-bold mb-2">Paste an image link:</h5>
                        <form onSubmit={handleUrlSubmit} className="d-flex">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Paste an image link..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button type="submit" className="btn" style={{ backgroundColor: '#FDFD96', color: 'black' }}>Submit</button>
                        </form>
                        <p className="text-muted mt-2">Works with any image from the web.</p>
                    </div>
                )}
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