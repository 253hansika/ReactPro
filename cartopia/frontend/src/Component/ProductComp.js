import React from 'react';
import { useParams } from 'react-router-dom';

const ProductComp = () => {
  const { slug } = useParams();
  return <div>{slug}</div>;
};

export default ProductComp;
