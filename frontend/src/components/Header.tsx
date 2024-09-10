import logo from '../assets/logo.jpg';
import { useCart } from '../hooks/useCart';
import { useProgress } from '../hooks/useProgress';
import Button from './UI/Button';

function Header() {
  const { items } = useCart();
  const { showCart } = useProgress();
  const totalCartsItems = items.reduce((acc, item) => (acc += item.quantity), 0);

  const handleShowCart = () => showCart();
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} alt='A restaurant' />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>
          Cart ({totalCartsItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
