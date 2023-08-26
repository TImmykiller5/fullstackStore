import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducers, productDetailsReducers } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers, userListReducers} from "./reducers/userReducers";
import { userUpdateeReducers } from "./reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, orderListMy, orderListReducer } from "./reducers/orderReducers";
import { userDeleteReducers } from './reducers/userReducers';
import { productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, topProductReducer } from "./reducers/productReducers";



const reducer = combineReducers({
    productList: productListReducers,
    productDetails:productDetailsReducers,
    cart:cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList:orderListMy,
    allOrders: orderListReducer,
    userList : userListReducers,
    userDelete:userDeleteReducers,
    userUpdate:userUpdateeReducers,
    productDelete:productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    topProduct: topProductReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')): []

const userfromStorage = localStorage.getItem('user')?
    JSON.parse(localStorage.getItem('user')): null

const shippingAddressfomStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')): {}

const initialState = {
    cart:{cartItems: cartItemsFromStorage, 
        shippingAddress:shippingAddressfomStorage
    },
    userLogin:{user:userfromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store