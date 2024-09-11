import { useCart } from '../hooks/useCart';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';

export type MealType = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type MealItemProps = {
  meal: MealType;
};

function MealItem({ meal }: MealItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ ...meal, quantity: 1 });
  };

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt='' />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'> {currencyFormatter.format(+meal.price)}</p>
          <p className='meal-item-description'> {meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button textOnly={false} onClick={() => handleAddToCart()}>
            Add to cart
          </Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
