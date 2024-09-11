import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './context/CartContext';
import { ProgressContextProvider } from './context/ProgressContext';

function App() {
  return (
    <>
      <ProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </ProgressContextProvider>
    </>
  );
}

export default App;
