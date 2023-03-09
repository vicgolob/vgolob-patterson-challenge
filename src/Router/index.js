import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Cart = lazy(() => import('../pages/Cart'));
const Showcase = lazy(() => import('../pages/Showcase'));

const Router = () => {
  const NotFound = () => <h1>NotFound :( </h1>;

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/showcase" />} />
      <Route exact path="/showcase" element={<Showcase />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
