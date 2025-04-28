import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Router } from 'react-router'
import Layout from './Layout'
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Error404Page from './pages/Error404Page';



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='*' element={<Error404Page />} />

      </Route>
    )
  );


export default router;