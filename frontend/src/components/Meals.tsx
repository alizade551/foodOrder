import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

type MealType = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type HttpResponse<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  sendRequest: () => Promise<void>;
};

const requestConfig = {};
function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  }: HttpResponse<MealType[]> = useHttp<MealType[]>('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className='center'>Loading meals...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul id='meals'>
      {meals?.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
