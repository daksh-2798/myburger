import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axio-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

// const INGREDIENT_PRICE = {
//     cheese : 15,
//     salad : 20,
//     meat : 45,
//     bacon : 45
// }  moved to reducer

class BurgerBuilder extends Component{

    state = {
       // ingredient: null,     moved to reducer
       // totalPrice : 45,
       // purchasable : false,
        purchasing :false
        //loading: false,
        //error : false
    }

     componentDidMount () {
         console.log(this.props);
         console.log(this.props.onInitIngredient());
         this.props.onInitIngredient();
    //     axios.get('https://my-burger-289de-default-rtdb.firebaseio.com/ingredient.json')
    //     .then(response => {
    //         this.setState({ingredient : response.data});
    //     }).catch(error => {
    //         this.setState({error:true});
    //     });
    }

    updatePurchaseState(ingredient){
        const sum = Object.keys(ingredient)
        .map(igKey => {
            return ingredient[igKey];
        })
        .reduce((sum,el)=>{
            return sum + el;
    },0);

    return sum>0;
    }

    // addIngredientHandler = (type) => {                               no need after reducer
    //     const oldCount = this.state.ingredient[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredient
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const PriceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = PriceAddition + oldPrice;
    //     this.setState({totalPrice:newPrice , ingredient : updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredient[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredient
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const PriceDeduction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - PriceDeduction;
    //     this.setState({totalPrice:newPrice , ingredient : updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);

    // }

    purchaseHandler = () => {
        this.props.isAuthenticated 
            ? this.setState({purchasing:true})
            : this.props.history.push('/auth');
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        //     const queryParams = [];
        //     let price = Number.parseFloat(this.state.totalPrice).toFixed(2);
        //     for (let i in this.state.ingredient) {
        //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]));
        //     }
        //     queryParams.push('price=' + price);
        //    const queryString = queryParams.join('&');
            this.props.onInitPurchased();
            this.props.history.push('/checkout');
               // pathname:'/checkout',
                //search: '?' + queryString
            //});
    }
    

    render(){
        const disabledInfo={
            ...this.props.ing
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;
        let burger = this.props.error ? 
            <p>Ingredients can't be loaded.Sorry for inconvenience!</p>  : <Spinner/>
        if(this.props.ing){
        burger = (
            <Aux>
            <Burger ingredient={this.props.ing}/>
                <BuildControls
                ingredientAdded = {this.props.onIngredientAdded} 
                ingredientRemoved = {this.props.onIngredientRemoved} 
                disabled={disabledInfo}
                isAuth={this.props.isAuthenticated}
                purchasable={this.updatePurchaseState(this.props.ing)}
                ordered={this.purchaseHandler}
                price = {this.props.price}/>
            </Aux>
        );
        orderSummary = <OrderSummary ingredient={this.props.ing}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;

        }
        // if(this.state.loading){
        //     orderSummary = <Spinner/>;
        // }
        return(
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ing : state.burgerBuilder.ingredient,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient : () => dispatch(actions.initIngredient()),
        onInitPurchased : () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));