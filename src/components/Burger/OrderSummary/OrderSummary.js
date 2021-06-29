import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    // componentWillUpdate(){
    //     console.log('[OrderSummary Update]')
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredient)
        .map(igKey => {
            return <li key={igKey} ><span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredient[igKey]}</li>
        });
        return(
            <Aux>
            <h3>Order Summary :</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Payable Amount : {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}   
export default OrderSummary;