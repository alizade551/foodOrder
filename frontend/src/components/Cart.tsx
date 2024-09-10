import Modal from './UI/Modal';
import { useCart } from '../hooks/useCart';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import { useProgress } from '../hooks/useProgress';

function Cart() {
  const { items } = useCart();
  const { progress, hideCart } = useProgress();
  const cartTotalPrice: number = items.reduce((acc, item) => (acc += item.quantity * parseFloat(item.price)), 0);

  const handleClose = () => {
    hideCart();
  };

  return (
    <Modal open={progress === 'CART'} className='cart'>
      <h2>Your cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotalPrice)}</p>
      <p className='modal-actions'>
        <Button textOnly={true} onClick={handleClose}>
          Close
        </Button>
        <Button textOnly={false}>Go to checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;
