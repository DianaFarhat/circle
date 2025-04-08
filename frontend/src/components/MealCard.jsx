import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';


const MealCard = ({ meal, onClick, onEdit, onDelete, onSaveToMyMeals, onToggleFavorite, onDragStart }) => {
    const [isPressed, setIsPressed] = useState(false);
    const navigate = useNavigate();
    const isOwnedByUser = meal.createdBy === meal.userId; 
   
    //Handle Card Click
    const handleCardClick = () => {
        navigate(`/meals/${meal._id}`);
    };

    //Handle Drag
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: meal._id,
        data: { meal }, // you can access this in onDragEnd
    });

    const dragStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        cursor: 'grab',
        transition: 'transform 0.2s ease',
    };
   
    

    return (
        <div 
            ref={setNodeRef}
            style={{
                ...dragStyle,
                height: '28rem',                    
                margin: '0 auto',
            }}
            {...listeners}
            {...attributes}
            className="position-relative" 
            onClick={handleCardClick}
           >
            
            {/* Bookmark with 3D effect */}
            <div 
                className={`position-absolute top-0 end-0 p-2 ${isPressed ? 'pressed' : ''}`} 
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'Futura, Helvetica, Arial, sans-serif',
                    transform: isPressed ? 'translateY(1px)' : 'translateY(-4px)',
                    transition: 'transform 0.1s ease',
                    cursor: 'pointer',
                    boxShadow: isPressed ? 'none' : '0 4px 6px rgba(0,0,0,0.2)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
                    width: '4rem',
                    textAlign: 'center',
                    borderBottomLeftRadius: '5px',
                    zIndex: 1
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsPressed(!isPressed);
                    onSaveToMyMeals(meal);
                }}
            >
                SAVE
            </div>

            {/* Meal Card */}
            <div className="card text-center shadow-sm p-3 mb-3 bg-light border rounded-3" style={{ cursor: 'pointer', overflow: 'hidden', height: '100%' }} onClick={() => onClick(meal._id)}>
                <img src={meal.image} alt={meal.name} className="card-img-top rounded-3" style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column justify-content-between p-2">
                    <div>
                        <h5 className="card-title text-truncate" style={{ marginBottom: '0.5rem' }}>{meal.name}</h5>
                        <div className="d-flex justify-content-center align-items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                            <span 
                                style={{ color: 'gold', fontSize: '1.2rem', cursor: 'pointer' }} 
                                onClick={(e) => { e.stopPropagation(); onToggleFavorite(meal); }}
                            >
                                💛
                            </span>
                            <span style={{ fontSize: '1rem', color: 'gray' }}>{meal.nbOfTimesSaved || 0}</span>
                        </div>
                        <div className="d-flex justify-content-center gap-1 flex-wrap mb-2">
                            {meal.tags.slice(0, 5).map((tag, index) => (
                                <span 
                                    key={index} 
                                    style={{
                                        backgroundColor: '#d4edda',
                                        color: '#155724',
                                        padding: '0.3rem 0.6rem',
                                        margin: '2px',
                                        fontSize: '0.8rem',
                                        borderRadius: '12px',
                                        fontWeight: '500',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center gap-4 my-2">
                            <div style={{ fontSize: '1.2rem' }}>🔥 {meal.calories}</div>
                            <div style={{ fontSize: '1.2rem' }}>💪 {meal.protein}g</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                        {isOwnedByUser ? (
                            <>
                                <span style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'gray' }} onClick={(e) => { e.stopPropagation(); onEdit(meal); }}>✏️</span>
                                <span style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'red' }} onClick={(e) => { e.stopPropagation(); onDelete(meal); }}>🗑️</span>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
