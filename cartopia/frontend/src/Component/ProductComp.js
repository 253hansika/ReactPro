import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import getError from '../getError';
import { Store } from '../StoreProvider';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state; //return ciurrent state
  }
};

const ProductComp = () => {
  const { slug } = useParams();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id == product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('sorry.product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>

        <Col md={3}>
          <ListGroup varient="flush">
            <ListGroupItem>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                rating={product.rating}
                numReview={product.numReviews}
              ></Rating>
            </ListGroupItem>

            <ListGroupItem>
              Price: <i className="fa fa-inr"></i>
              {product.price}
            </ListGroupItem>

            <ListGroupItem>
              Description :<p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <CardBody>
              <ListGroup>
                <ListGroupItem>
                  Price: <i className="fa fa-inr"></i>
                  {product.price}
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to card
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductComp;
