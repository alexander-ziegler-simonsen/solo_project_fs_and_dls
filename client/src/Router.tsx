import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import Layout from './Layout'
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Error404Page from './pages/Error404Page';
import LoginPage from './pages/LoginPage';
import NewAccountPage from "./pages/NewAccountPage";
import AccountOrdersPage from './pages/account/AccountOrdersPage';
import AccountInfoPage from './pages/account/AccountInfoPage';
import Cart from './pages/Cart';

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/new_account' element={<NewAccountPage />} />
        <Route path='/a_orders' element={<AccountOrdersPage />} />
        <Route path='/a_info' element={<AccountInfoPage />} />
        <Route path='*' element={<Error404Page />} />

      </Route>
    )
  );


export default router;