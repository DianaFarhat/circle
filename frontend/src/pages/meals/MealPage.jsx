import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMealByIdQuery } from '../../services/mealApi';
import colors from '../../styles/colors';

const MealPage = () => {
    const { mealId } = useParams();
    const { data: meal, error, isLoading } = useGetMealByIdQuery(mealId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading meal: {error.message}</div>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{meal.name}</h1>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.pastelGreen }}>
                <img src={meal.image} alt={meal.name} className="w-full h-64 object-cover" />
            </div>
            <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
            <ul className="list-disc ml-6">
                {meal.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-lg">
                        {ingredient.name}
                        {ingredient.brand && <span className="text-gray-500"> ({ingredient.brand})</span>}
                        {ingredient.optional && <span className="text-gray-400"> (optional)</span>}
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4">Recipe Steps</h2>
            <ol className="list-decimal ml-6">
                {meal.recipeSteps.map((step, index) => (
                    <li key={index} className="text-lg mb-2">{step}</li>
                ))}
            </ol>
            <h2 className="text-xl font-semibold mt-4">Nutrition Facts</h2>
            <table className="min-w-full bg-white shadow-md rounded">
                <tbody>
                    {Object.entries(meal.nutritionFacts).map(([key, value], index) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2 font-medium">{key}</td>
                            <td className="px-4 py-2">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MealPage;
