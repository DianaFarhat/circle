import React from 'react';
import { AiOutlineStar, AiOutlineEdit, AiOutlineDelete, AiOutlineHeart, AiOutlineSave } from 'react-icons/ai';

const MealCard = ({ meal, onClick, onEdit, onDelete, onSaveToMyMeals, onToggleFavorite }) => {
    const isOwnedByUser = meal.createdBy === meal.userId;

    return (
        <div className="card text-center shadow-sm p-3 mb-3 bg-light border rounded-2" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => onClick(meal._id)}>
            <img src={meal.image} alt={meal.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
                <h5 className="card-title">{meal.name}</h5>
                <p className="card-text">Calories: {meal.calories}</p>
                <p className="card-text">Protein: {meal.protein}g</p>
                <div className="d-flex justify-content-center gap-3">
                    {isOwnedByUser ? (
                        <>
                            <AiOutlineEdit className="text-dark" onClick={(e) => { e.stopPropagation(); onEdit(meal); }} />
                            <AiOutlineDelete className="text-danger" onClick={(e) => { e.stopPropagation(); onDelete(meal); }} />
                        </>
                    ) : (
                        <>
                            <AiOutlineSave className="text-primary" onClick={(e) => { e.stopPropagation(); onSaveToMyMeals(meal); }} />
                            <AiOutlineHeart className="text-danger" onClick={(e) => { e.stopPropagation(); onToggleFavorite(meal); }} />
                            <span className="text-muted">{meal.favorites || 0}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealCard;
