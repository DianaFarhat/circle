import React, { useState, useEffect } from 'react'; 
import MealCard from '../MealCard';
import { useGetUserMealsQuery } from '../../services/mealApi';

function MyMeals({setDraggedMeal}) {
    const { data: mealsData, isLoading, error } = useGetUserMealsQuery();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        if (mealsData && mealsData.meals) {
            setMeals(mealsData.meals);
        }
    }, [mealsData]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading meals.</p>;

    return (
        <div className="container mt-3">
            <div className="row">
                {meals.map(meal => (
                    <div key={meal._id} className="col-12 col-md-4 mb-4">
                        <MealCard
                            meal={meal}
                            onClick={() => {}}
                            onEdit={() => {}}
                            onDelete={() => {}}
                            onSaveToMyMeals={() => {}}
                            onToggleFavorite={() => {}}
                            onDragStart={(meal) => setDraggedMeal(meal)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyMeals;
