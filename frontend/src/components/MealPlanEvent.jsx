import React from 'react';

const MealPlanEvent = ({ event, removeMealFromPlan, setEvents }) => {
  const handleRemove = async (e) => {
    e.stopPropagation(); // prevent calendar clicks
    e.preventDefault();  // prevent opening meal page when clicking ❌

    try {
      await removeMealFromPlan(event.id).unwrap();
      setEvents((prev) => prev.filter((ev) => ev.id !== event.id));
    } catch (err) {
      console.error('Failed to remove meal plan:', err);
    }
  };

  const mealPageLink = event.mealId ? `/meal/${event.mealId}` : '#';

  return (
    <a
      href={mealPageLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none text-dark"
      onClick={(e) => {
        if (!event.mealId) e.preventDefault(); // prevent broken link
      }}
    >
      <div className="d-flex flex-column justify-content-between px-1" style={{ fontSize: '0.75rem' }}>
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: '100%',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        )}
        <div className="mt-1">
          <strong>{event.title}</strong>
          <div>🔥 {event.calories} kcal</div>
          <div>💪 {event.protein}g protein</div>
        </div>
        <button
          onClick={handleRemove}
          className="btn btn-sm btn-outline-danger mt-1 py-0 px-1"
          style={{ fontSize: '0.65rem', alignSelf: 'end' }}
          title="Remove"
        >
          ❌
        </button>
      </div>
    </a>
  );
};

export default MealPlanEvent;
