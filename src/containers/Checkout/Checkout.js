import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component{
    state ={
        ingredient : {
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        }
    }

    componentDidMount (){
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        for(let param in query.entries()){
            ingredient[param[0]] = param[1];
        }   
        this.setState({ingredient:ingredient});
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

   render(){
    return(
        <div>
            <CheckoutSummary ingredient = {this.state.ingredient}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
        </div>
   );
}
}
export default Checkout;