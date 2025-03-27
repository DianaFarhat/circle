import React from 'react';
import { AiOutlineStar, AiOutlineEdit, AiOutlineDelete, AiOutlineHeart, AiOutlineBookmark } from 'react-icons/ai';

const MealCard = ({ meal, onClick, onEdit, onDelete, onSaveToMyMeals, onToggleFavorite }) => {
    const isOwnedByUser = meal.createdBy === meal.userId;

    return (
        <div className="relative rounded-2xl shadow-lg overflow-hidden w-64 cursor-pointer transition-transform transform hover:scale-105" onClick={() => onClick(meal._id)}>
            <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover" />
            <div className="absolute top-0 right-0 p-2 flex space-x-2">
                {isOwnedByUser ? (
                    <>
                        <AiOutlineEdit className="text-gray-800 hover:text-gray-600" onClick={(e) => { e.stopPropagation(); onEdit(meal); }} />
                        <AiOutlineDelete className="text-red-500 hover:text-red-400" onClick={(e) => { e.stopPropagation(); onDelete(meal); }} />
                    </>
                ) : (
                    <>
                        <AiOutlineBookmark className="text-blue-500 hover:text-blue-400" onClick={(e) => { e.stopPropagation(); onSaveToMyMeals(meal); }} />
                        <div className="flex items-center space-x-1">
                            <AiOutlineHeart className="text-red-400 hover:text-red-300" onClick={(e) => { e.stopPropagation(); onToggleFavorite(meal); }} />
                            <span className="text-gray-700">{meal.favorites || 0}</span>
                        </div>
                    </>
                )}
            </div>
            <div className="bg-[#b5fd94] p-4">
                <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
                <p className="text-sm text-gray-600">Calories: {meal.calories}</p>
                <p className="text-sm text-gray-600">Protein: {meal.protein}g</p>
            </div>
        </div>
    );
};

export default MealCard;
