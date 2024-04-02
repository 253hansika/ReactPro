// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import HomeComp from './Component/HomeComp';
import ProductComp from './Component/ProductComp';
import { Navbar, Container, Badge, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './StoreProvider';
import { useContext } from 'react';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Shopify</Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeComp />}></Route>
              <Route path="/product/:slug" element={<ProductComp />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All right reserve</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
