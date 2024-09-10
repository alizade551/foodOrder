import logo from '../assets/logo.jpg';
import { useCart } from '../hooks/useCart';
import Button from './UI/Button';

function Header() {
  const { items } = useCart();
  const totalCartsItems = items.reduce((acc, item) => (acc += item.quantity), 0);
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} alt='A restaurant' />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly={true}>Cart ({totalCartsItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
