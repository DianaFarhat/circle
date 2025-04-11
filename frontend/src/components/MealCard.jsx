import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSaveToMyMeals from '../hooks/useSaveToMyMeals';
import useDeleteMyMeal from '../hooks/useDeleteMyMeal';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa'; 
import {useAddMealToPlanMutation } from '../services/mealPlanApi'; 


const MealCard = ({ meal}) => {
    const [isPressed, setIsPressed] = useState(false);
    const navigate = useNavigate();
    
    //Meal Card Author 
    const currentUserId = useSelector((state) => state.auth.userInfo?._id);
    const isOwnedByUser = meal.createdBy === currentUserId;
   
    //Handle Card Click
    const handleCardClick = () => {
        navigate(`/meals/${meal._id}`);
    };


    //Handle Save, Edit & Delete
    const { saveMeal } = useSaveToMyMeals();
    const { onDelete } = useDeleteMyMeal();

    //Handle Add to Meal Plan
    const datePickerRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [tempDate, setTempDate] = useState(null);
    const [addMealToMealPlan] = useAddMealToPlanMutation();
    



    return (
        <div 
            style={{
                height: '28rem',                    
                margin: '0 auto',
            }}
            className="position-relative" 
           >
            
            {/* Bookmark with 3D effect */}
            {!isOwnedByUser && (
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
                    onClick={async (e) => {
                        e.stopPropagation();
                        setIsPressed(!isPressed);
                        try {
                          await saveMeal(meal);
                          console.log('Meal saved!');
                        } catch (err) {
                          console.error('Save failed:', err);
                        }
                    }}                                         
                >
                    SAVE
                </div>
            )}

            {/* Meal Card */}
            <div className="card text-center shadow-sm p-3 mb-3 bg-light border rounded-3" style={{ cursor: 'pointer', overflow: 'hidden', height: '100%' }}>
                <img src={meal.image} alt={meal.name} className="card-img-top rounded-3" style={{ height: '180px', objectFit: 'cover' }} onClick={handleCardClick} />
                <div className="card-body d-flex flex-column justify-content-between p-2">
                    <div>
                        <h5 className="card-title text-truncate" style={{ marginBottom: '0.5rem' }}>{meal.name}</h5>
                        {meal.isPublic && (
                            <div className="d-flex justify-content-center align-items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                                <span 
                                style={{ color: 'gold', fontSize: '1.2rem', cursor: 'pointer' }} 
                                onClick={(e) => { e.stopPropagation(); onToggleFavorite(meal); }}
                                >
                                💛
                                </span>
                                <span style={{ fontSize: '1rem', color: 'gray' }}>
                                {meal.nbOfTimesSaved || 0}
                                </span>
                            </div>
                            )}
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
                                 <div className="d-flex justify-content-center gap-2 mt-2">
                                    <button
                                    className="btn mealCardButton btn-outline-warning"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(meal);
                                    }}
                                    >
                                    Edit
                                    </button>
                                    <button
                                    className="btn mealCardButton btn-outline-success"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(meal);
                                    }}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
                
                {/* Calendar Icon with Popup DatePicker (Bottom Right Corner) */}
                <div 
                className="position-absolute bottom-0 end-0 m-2" 
                style={{ zIndex: 2 }}
                onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                {/* Hidden DatePicker */}
                <DatePicker
                ref={datePickerRef}
                selected={tempDate || selectedDate}
                onChange={(date) => {
                    setTempDate(date); // Only update the date, no submission yet
                }}
                onCalendarClose={() => {
                    if (tempDate) {
                    const endDate = new Date(tempDate.getTime() + 15 * 60000);
                    setSelectedDate(tempDate);

                    addMealToMealPlan({
                        mealId: meal._id,
                        userId: currentUserId,
                        start: tempDate.toISOString(),
                        end: endDate.toISOString(),
                    })
                        .unwrap()
                        .then(() => {
                        console.log("Meal added to plan!");
                        })
                        .catch((err) => {
                        console.error("Error adding meal to plan:", err);
                        });

                    setTempDate(null); // Reset temp
                    }
                }}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="d-none"
                popperPlacement="top-end"
                />

                {/* Lime green calendar icon */}
                <FaRegCalendarAlt
                    size={24}
                    onClick={() => {
                    if (datePickerRef.current) {
                        datePickerRef.current.setOpen(true);
                    }
                    }}
                    style={{ 
                    cursor: 'pointer', 
                    color: 'limegreen',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '4px',
                    boxShadow: '0 1px 5px rgba(0,0,0,0.2)' 
                    }}
                />
                </div>
                {/* End of Calendar Button */}
            </div>
        </div>
    );
};

export default MealCard;
