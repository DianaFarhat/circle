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
        <div className="grid grid-cols-12 gap-4 max-w-5xl mx-auto mt-10 border-2 border-green-500 rounded-xl bg-white p-6 shadow-lg">
        {/* Left Column: Image (like col-md-4) */}
        <div className="col-span-12 md:col-span-4 flex justify-center items-start">
            {meal.image && (
            <img
                src={meal.image}
                alt={meal.name}
                className="w-40 h-40 object-cover rounded-md shadow"
            />
            )}
        </div>

        {/* Right Column: Content (like col-md-8) */}
        <div className="col-span-12 md:col-span-8">
            <h1 className="text-3xl font-bold mb-4 text-center md:text-left">{meal.name}</h1>

            {meal.type === 'recipe' && meal.sectionedRecipe && (
            <>
                {meal.sectionedRecipe.map((section, secIndex) => (
                <div key={secIndex} className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">{section.title}</h2>

                    {/* Ingredients */}
                    <h3 className="text-lg font-semibold mt-2">Ingredients</h3>
                    {section.ingredients.length > 0 ? (
                    <ul className="list-disc ml-6 text-base">
                        {section.ingredients.map((ingredient, i) => (
                        <li key={i}>
                            {ingredient.name}
                            {ingredient.brand && <span className="text-gray-500"> ({ingredient.brand})</span>}
                            {ingredient.isOptional && <span className="text-gray-400"> (optional)</span>}
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="text-gray-400">No ingredients listed.</p>
                    )}

                    {/* Steps */}
                    <h3 className="text-lg font-semibold mt-4">Steps</h3>
                    {section.steps.length > 0 ? (
                    <ol className="list-decimal ml-6 text-base">
                        {section.steps.map((step, idx) => (
                        <li key={idx} className="mb-1">{step}</li>
                        ))}
                    </ol>
                    ) : (
                    <p className="text-gray-400">No steps provided.</p>
                    )}
                </div>
                ))}
            </>
            )}

            {/* Nutrition Facts */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Nutrition Facts</h2>
            <table className="w-full text-sm bg-gray-50 rounded shadow-sm">
                <tbody>
                {[
                    ["Calories", meal.calories],
                    ["Protein", `${meal.protein} g`],
                    ["Carbs", `${meal.carbs} g`],
                    ["Sugar", `${meal.sugar} g`],
                    ["Fiber", `${meal.fiber} g`],
                    ["Sodium", `${meal.sodium} mg`],
                    ["Cholesterol", `${meal.cholesterol} mg`],
                    ["Saturated Fats", `${meal.saturatedFats} g`],
                    ["Unsaturated Fats", `${meal.unsaturatedFats} g`],
                    ["Caffeine", `${meal.caffeine} mg`],
                ].map(([label, value], i) => (
                    <tr key={i} className="border-b border-gray-200">
                    <td className="px-4 py-2 font-medium text-left">{label}</td>
                    <td className="px-4 py-2 text-right">{value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>

      
    );
};

export default MealPage;
