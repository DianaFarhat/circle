import { useDeleteMealMutation } from '../services/mealApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useDeleteMyMeal = () => {
  const [deleteMeal, { isLoading, error }] = useDeleteMealMutation();
  const navigate = useNavigate();

  const onDelete = async (meal) => {
    try {
      await deleteMeal(meal._id).unwrap();
     
      
      setTimeout(() => {
        toast.dismiss(id);
        navigate("/myMeals", { replace: true }); // ✅ soft "reload"
      }, 100);
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete meal');
    }
  };

  return { onDelete, isLoading, error };
};

export default useDeleteMyMeal;
