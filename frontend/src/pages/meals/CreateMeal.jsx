import React, { useState } from 'react';


const fallbackImage = 'https://i.pinimg.com/736x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg';

const CreateMeal = () => {
    const [image, setImage] = useState(fallbackImage);
    const [mealName, setMealName] = useState('Matcha Latte');
    const [description, setDescription] = useState('');
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
        if (!mealName.trim() || !description.trim()) {
            alert('Both fields are required!');
            return;
        }
        alert('Meal Created Successfully!');
    };

    return (
        <div className="container mt-5">
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
                    <div className="mt-4 text-start">
                        <input
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            className="form-control border-0 fs-3 fw-bold mb-2"
                            placeholder="Meal Name"
                            style={{ background: 'transparent', outline: 'none' }}
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control border-0 mb-3"
                            placeholder="Description..."
                            style={{ background: 'transparent', outline: 'none', resize: 'none' }}
                            required
                        ></textarea>
                        <button className="btn w-100" style={{ backgroundColor: '#b5fd94'}} onClick={handleCreateMeal}>Create Meal</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeal;