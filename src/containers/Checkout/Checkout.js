import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state ={
        ingredient : {
            salad:1,
            cheese:1,
            meat:1,
            bacon:1
        }
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
        </div>
   );
}
}
export default Checkout;