import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ROUTER } from './Router';

function App() {
  return (
    <RouterProvider router={ROUTER} />
  );
}

export default App;
