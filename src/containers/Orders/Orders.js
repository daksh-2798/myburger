//import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axio-orders';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component{

    // state= {
    //     orders : [],
    //     loading: true
    // }

    componentDidMount () {
        this.props.onFetchOrder();
        // axios.get('./orders.json').then(
        //     res => {
        //         const fetchedOrders = [];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id:key
        //             });
        //         }
        //         this.setState({loading:false,orders:fetchedOrders})
        //     }
        // ).catch(err => {
        //     this.setState({loading:false});
        // })
    }
    render(){
        let order = this.props.loading ? <Spinner/> : ( this.props.order.map(order => (
            <Order key={order.id} 
            ingredient = {order.ingredient}
            price={order.price}/>
        )
    ));
        return(
            <div>
               {order}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        order: state.order.order,
        loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrder: () => dispatch(actions.fetchOrder())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));