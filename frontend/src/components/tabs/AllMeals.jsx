import React, { useState, useEffect } from 'react';
import { AiOutlineFilter } from 'react-icons/ai';
import MealCard from '../MealCard';
import { useGetPublicMealsQuery } from '../../services/mealApi'; 

function AllMeals() {
    const { data: mealsData, isLoading, error } = useGetPublicMealsQuery();
    const [meals, setMeals] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (mealsData && mealsData.meals) {
            setMeals(mealsData.meals);
            setFilteredMeals(mealsData.meals);
        }
    }, [mealsData]);

    const handleFilterSelect = (filter) => {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        }
    };

    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter(f => f !== filter));
    };

    useEffect(() => {
        let filtered = meals;
        filters.forEach(filter => {
            filtered = filtered.filter(meal => meal.name.toLowerCase().includes(filter.toLowerCase()));
        });
        setFilteredMeals(filtered);
    }, [filters, meals]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading meals.</p>;

    return (
        <div className="container mt-3">
            <div className="d-flex align-items-center mb-3">
                <AiOutlineFilter size={24} className="me-2" style={{ cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)} />
                {filters.map((filter, index) => (
                    <Badge key={index} bg="primary" className="me-2">
                        {filter} <span onClick={() => handleRemoveFilter(filter)} style={{ cursor: 'pointer' }}>x</span>
                    </Badge>
                ))}
            </div>
            {showDropdown && (
                <DropdownButton title="Select Filter" variant="secondary" className="mb-3">
                    <Dropdown.Item onClick={() => handleFilterSelect('Chicken')}>Chicken</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterSelect('Pasta')}>Pasta</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterSelect('Vegetable')}>Vegetable</Dropdown.Item>
                </DropdownButton>
            )}
            <div className="row">
                {filteredMeals.map(meal => (
                    <div key={meal._id} className="col-12 col-md-4 mb-4">
                        <MealCard
                            meal={meal}
                            onClick={() => {}}
                            onEdit={() => {}}
                            onDelete={() => {}}
                            onSaveToMyMeals={() => {}}
                            onToggleFavorite={() => {}}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllMeals;
