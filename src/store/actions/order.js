import order from '../../components/Order/Order';
import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const purchaseOrderSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseOrderFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    };
};

export const purchaseOrderStart = () => {
    return{
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json',orderData).then(
            response => {
                console.log(response.data);
                dispatch(purchaseOrderSuccess(response.data.name,orderData));
            }).catch(error => {
                dispatch(purchaseOrderFail(error));
            });
    }
}

export const purchaseInit = () => {
    return{
        type : actionTypes.PURCHASE_INIT
    };
}

export const fetchOrderSucces = (order) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        order : order
    };
};

export const fetchOrderFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAIL,
        error : error
    };
};

export const fetchOrderStart = () => {
    return {
        type : actionTypes.FETCH_ORDER_START
    };
};

export const fetchOrder = () => {
    return dispatch =>{
        dispatch(fetchOrderStart());
        axios.get('./orders.json').then(
            res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrderSucces(fetchedOrders));
            }
        ).catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
}



// return dispatch => {
//     dispatch( purchaseBurgerStart() );
//     axios.post( '/orders.json', orderData )
//         .then( response => {
//             console.log( response.data );
//             dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
//         } )
//         .catch( error => {
//             dispatch( purchaseBurgerFail( error ) );
//         } );
// };