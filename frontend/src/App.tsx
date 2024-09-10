import { useEffect } from 'react';
import Header from './components/Header';

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
