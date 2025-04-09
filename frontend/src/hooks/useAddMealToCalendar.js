const useAddMealToCalendar = () => {
    const onAddToCalendar = (meal, date) => {
      console.log("Meal to add:", meal);
      console.log("Selected date:", date);
      // TODO: implement backend mutation here
    };
  
    return { onAddToCalendar };
};
  
export default useAddMealToCalendar;
  