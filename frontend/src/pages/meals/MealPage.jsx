import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMealByIdQuery } from '../../services/mealApi';
import colors from '../../styles/colors';

const MealPage = () => {
    const { mealId } = useParams();
    const { data: meal, error, isLoading } = useGetMealByIdQuery(mealId);
     
    // Print the meal object to the console
    console.log("Retrieved meal:", meal);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading meal: {error.message}</div>;
    if (!meal) return <div>Meal not found</div>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{meal.name}</h1>
            {meal.image && (
                <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.pastelGreen }}>
                    <img src={meal.image} alt={meal.name} className="w-full h-64 object-cover" />
                </div>
            )}

            {meal.type !== 'simple' && (
                <>
                    <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
                    {meal.ingredients && meal.ingredients.length > 0 ? (
                        <ul className="list-disc ml-6">
                            {meal.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-lg">
                                    {ingredient.name}
                                    {ingredient.brand && <span className="text-gray-500"> ({ingredient.brand})</span>}
                                    {ingredient.optional && <span className="text-gray-400"> (optional)</span>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="h-8"></div>  // Blank space when ingredients are empty
                    )}

                    <h2 className="text-xl font-semibold mt-4">Recipe Steps</h2>
                    {meal.recipeSteps && meal.recipeSteps.length > 0 ? (
                        <ol className="list-decimal ml-6">
                            {meal.recipeSteps.map((step, index) => (
                                <li key={index} className="text-lg mb-2">{step}</li>
                            ))}
                        </ol>
                    ) : (
                        <div className="h-8"></div>  // Blank space when steps are empty
                    )}
                </>
            )}

            {meal.nutritionFacts && Object.keys(meal.nutritionFacts).length > 0 && (
                <>
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
                </>
            )}
        </div>
    );
};

export default MealPage;
