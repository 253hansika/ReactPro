import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating';

const Product = (props) => {
  const { product } = props;
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

        <Button className="btn">Add to cart </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
