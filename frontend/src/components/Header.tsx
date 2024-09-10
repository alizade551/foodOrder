import logo from '../assets/logo.jpg';
import Button from './UI/Button';

function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} alt='A restaurant' />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly={true}>Cart (0)</Button>
      </nav>
    </header>
  );
}

export default Header;
