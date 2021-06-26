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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICE = {
    cheese : 15,
    salad : 20,
    meat : 45,
    bacon : 45
}

class BurgerBuilder extends Component{

    state = {
       // ingredient: null,
        totalPrice : 45,
        purchasable : false,
        purchasing :false,
        loading: false,
        error : false
    }

    // componentDidMount () {
    //     axios.get('https://my-burger-289de-default-rtdb.firebaseio.com/ingredient.json')
    //     .then(response => {
    //         this.setState({ingredient : response.data});
    //     }).catch(error => {
    //         this.setState({error:true});
    //     });
    // }

    updatePurchaseState(ingredient){
        const sum = Object.keys(ingredient)
        .map(igKey => {
            return ingredient[igKey];
        })
        .reduce((sum,el)=>{
            return sum + el;
    },0);

    this.setState({purchasable:sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredient
        }
        updatedIngredients[type] = updatedCount;
        const PriceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = PriceAddition + oldPrice;
        this.setState({totalPrice:newPrice , ingredient : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredient
        }
        updatedIngredients[type] = updatedCount;
        const PriceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - PriceDeduction;
        this.setState({totalPrice:newPrice , ingredient : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {

        // this.setState({ loading : true });

        // const order = {
        //     ingredient: this.state.ingredient,
        //     price: this.state.totalPrice,
        //     customer : {
        //         name: 'Daky',
        //         emailid: 'd@test.com',
        //         address : {
        //             street: 'Darbar',
        //             zipcode: '65656',
        //             country: 'India'
        //         },
        //         deliveryMethod: 'fastest'
        //     }
        // }
        
        //axios.post('/orders.json',order).then(
            // response => {
          //       this.setState({ loading : true,purchasing:false });
        //     }).catch(error => this.setState({ loading : true,purchasing:false }));
            //alert('You Continue!!');
            const queryParams = [];
            let price = Number.parseFloat(this.state.totalPrice).toFixed(2);
            for (let i in this.state.ingredient) {
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]));
            }
            queryParams.push('price=' + price);
           const queryString = queryParams.join('&');
            this.props.history.push({
                pathname:'/checkout',
                search: '?' + queryString
            });
    }
    

    render(){
        const disabledInfo={
            ...this.props.ing
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;
        let burger = this.state.error ? 
            <p>Ingredients can't be loaded.Sorry for inconvenience!</p>  : <Spinner/>
        if(this.props.ing){
        burger = (
            <Aux>
            <Burger ingredient={this.props.ing}/>
                <BuildControls
                ingredientAdded = {this.props.onIngredientAdded} 
                ingredientRemoved = {this.props.onIngredientRemoved} 
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price = {this.state.totalPrice}/>
            </Aux>
        );
        orderSummary = <OrderSummary ingredient={this.props.ing}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;

        }
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
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
        ing : state.ingredient
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT , ingredientName : ingName}),
        onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT , ingredientName : ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));