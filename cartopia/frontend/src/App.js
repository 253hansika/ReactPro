// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import data from './data';
import HomeComp from './Component/HomeComp';
import ProductComp from './Component/ProductComp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <a href="/">Shoppify</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeComp />}></Route>
            <Route path="/product/:slug" element={<ProductComp />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
