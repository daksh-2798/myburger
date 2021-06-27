import order from '../../components/Order/Order';
import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const purchaseOrderSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHAE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseOrderFail = (error) => {
    return {
        tupe : actionTypes.PURCHAE_BURGER_FAIL,
        error : error
    };
};

export const purchaseOrderStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json',order).then(
            response => {
                console.log(response.data);
                dispatch(purchaseOrderSuccess(response.data,orderData));
            }).catch(error => {
                dispatch(purchaseOrderFail(error));
            });
    }
}