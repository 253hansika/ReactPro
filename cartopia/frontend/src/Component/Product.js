import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating';
import axios from 'axios';
import { Store } from './StoreProvider';

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    console.log('add to cart sucess');
    const existItem = cartItems.find((x) => x._id == product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry , Product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        ></img>
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReview={product.numReviews}></Rating>

        <Card.Text>
          <i className="fa fa-inr"></i>
          {product.price}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} className="btn">
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
