import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    // state ={
    //     ingredient : null,
    //     price : 0
    // }

    // componentWillMount (){
    //     const query = new URLSearchParams(window.location.search);
    //     const ingredient = {};
    //     let price=0;
    //     //console.log('query', query);
    //     for(let param of query){
    //         if(param[0]==='price'){
    //             price = param[1];
    //         }
    //         else{
    //         //salad:1
    //     //console.log('param', param);
    //         ingredient[param[0]] = +param[1];
    //     }   
    // }
    //     this.setState({ingredient:ingredient,totalPrice:price});
    // }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

   render(){
       let summary = <Redirect to='/' />;
       if(this.props.ing){
           summary = (
           <div>
           <CheckoutSummary ingredient = {this.props.ing}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path={this.props.match.path + '/contact-data'}
                component={ContactData}
                //render={(props)=>  (<ContactData ingredient={this.state.ingredient} price={this.state.totalPrice} {...props}/>) }
                /> </div>
            );
       }
    return summary;
}
}

const mapStateToProps = state =>{
    return{
        ing : state.ingredient,
       // price : state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);