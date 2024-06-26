import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingBox = () => {
  return (
    <Spinner sanimation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingBox;
