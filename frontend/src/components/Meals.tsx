import { useEffect, useState } from 'react';

type MealType = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};
function Meals() {
  const [meals, setMeals] = useState<MealType[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:3000/meals', { method: 'GET' });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setMeals(data);
    };

    fetchMeals();
  }, []);

  return (
    <ul id='meals'>
      {meals.map((meal: MealType) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}

export default Meals;
