import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL, 
        ORDER_DETAILS_REQUEST,
        ORDER_DETAILS_SUCCESS,
        ORDER_DETAILS_FAIL,
        ORDER_PAY_REQUEST,
        ORDER_PAY_SUCCESS,
        ORDER_PAY_FAIL,
        ORDER_PAY_RESET,  
        ORDER_LIST_MY_REQUEST,
        ORDER_LIST_MY_SUCCESS,
        ORDER_LIST_MY_FAIL,
        ORDER_LIST_MY_RESET, 
        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_LIST_FAIL,
        ORDER_DELIVER_REQUEST,
        ORDER_DELIVER_SUCCESS,
        ORDER_DELIVER_FAIL,
        ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";



export const createOrder = (order) => async(dispatch, getState) =>{
    try{
        dispatch({
            type:ORDER_CREATE_REQUEST

        })
        const {
            userLogin: {user}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })

        dispatch({
            type:CART_CLEAR_ITEMS,
            payload:data
        })

        localStorage.removeItem('cartItems')


        
        

    }
    catch(error){dispatch({
        type:ORDER_CREATE_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })}
}

export const getOrderDetails = (id) => async(dispatch, getState) =>{
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST

        })
        const {
            userLogin: {user}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get(
            `/api/orders/${id}/`,
            config
        )
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })

    }
    catch(error){dispatch({
        type:ORDER_DETAILS_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })}
}

export const getMyOrders = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type:ORDER_LIST_MY_REQUEST

        })
        const {
            userLogin: {user}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get(
            `/api/orders/all/myorders/`,
            config
        )
        dispatch({
            type:ORDER_LIST_MY_SUCCESS,
            payload:data
        })

    }
    catch(error){dispatch({
        type:ORDER_LIST_MY_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })}
}

export const getOrders = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type:ORDER_LIST_REQUEST

        })
        const {
            userLogin: {user}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get(
            `/api/orders/`,
            config
        )
        dispatch({
            type:ORDER_LIST_SUCCESS,
            payload:data
        })

    }
    catch(error){dispatch({
        type:ORDER_LIST_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })}
}


export const orderPay = (id, paymentResult) => async(dispatch, getState) =>{
    try{
        console.log('test')
        dispatch({
            type:ORDER_PAY_REQUEST

        })
        const {
            userLogin: {user}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })

    }
    catch(error){dispatch({
        type:ORDER_PAY_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })}
}

export const orderDeliver = (order) => async(dispatch, getState) =>{
    try{
        console.log('test')
        dispatch({
            type:ORDER_DELIVER_REQUEST

        })
        const {
            userLogin: {user}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(
            `/api/orders/${order._id}/delivered/`,
            {},
            config
        )
        dispatch({
            type:ORDER_DELIVER_SUCCESS,
            payload:data
        })

    }
    catch(error){dispatch({
        type:ORDER_DELIVER_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })}
}