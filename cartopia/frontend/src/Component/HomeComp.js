import React from 'react';
import data from '../data';

const HomeComp = () => {
  return (
    <div>
      <h1>Featured Product</h1>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.slug}>
            <a href={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name}></img>
            </a>

            <div className="product-info">
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>{' '}
              </a>
              <p>
                <strong>Rs.</strong>
                {product.price}
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComp;
