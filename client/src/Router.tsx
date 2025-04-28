import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Router } from 'react-router'
import Layout from './Layout'
import AboutPage from './pages/AboutPage';



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/about' element={<AboutPage />} />
      </Route>
    )
  );


export default router;