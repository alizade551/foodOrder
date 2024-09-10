import Cart from './components/Cart';
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
        </CartContextProvider>
      </ProgressContextProvider>
    </>
  );
}

export default App;
