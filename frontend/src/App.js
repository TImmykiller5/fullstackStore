import logo from './logo.svg';
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import { Container } from 'react-bootstrap'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import Test from './screens/Test';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
// import PlaceOrder from './screens/PlaceOrder';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createHashRouter,
  Outlet,
} from "react-router-dom";
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductsListScreen';
import ProductEditScreen from './screens/ProductEditScreen';




function App() {
  const Layout = () =>{
    return(
    <div>
      <Header/>
      <div style={{minHeight:"80vh"}}>
      <Outlet className='sample outlet'/>
      </div>
      <Footer/>
    </div>
    );
  };
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <HomeScreen/>
        },
        {
          path: "/product/:id",
          element: <ProductScreen/>
        },
        {
          path: "/cart/:id?",
          element: <CartScreen/>
        },
        {
          path: "/login/",
          element: <LoginScreen/>
        },
        {
          path: "/register/",
          element: <RegisterScreen/>
        },
        {
          path: "/profile/",
          element: <ProfileScreen/>
        },
        {
          path: "/shipping/",
          element: <ShippingScreen/>
        },
        {
          path: "/payment/",
          element: <PaymentScreen/>
        },
        {
          path: "/placeorder/",
          element: <PlaceOrder/>
        },
        {
          path: "/order/:id/",
          element: <OrderScreen/>
        },
        {
          path: "/admin/userlist",
          element: <UserListScreen/>
        },
        {
          path: "/test/",
          element: <Test/>
        },
        {
          path: "/admin/user/:id",
          element: <UserEditScreen/>
        },
        {
          path: "/admin/productslist",
          element: <ProductListScreen/>
        },
        {
          path: "/admin/product/:id/edit",
          element: <ProductEditScreen/>
        },

        {
          path: "/admin/orderlist/",
          element: <OrderListScreen/>
        },
      ]
    }
    
  ]);
  return (
    <div>

      <main className='py-3'>
        <Container>
        <RouterProvider router={router}/>
        </Container>
      </main>
    </div>
  );
}




export default App;
