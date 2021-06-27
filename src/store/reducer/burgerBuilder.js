import * as actionTypes from '../actions/actionTypes';

const initialState ={
    ingredient: null,
    totalPrice : 45,
    error : false
};

const INGREDIENT_PRICE = {
    cheese : 15,
    salad : 20,
    meat : 45,
    bacon : 45
}

const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredient : {
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredient : {
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                ingredient: {
                    salad : action.ingredient.salad,
                    cheese : action.ingredient.cheese,
                    meat : action.ingredient.meat,
                    bacon : action.ingredient.bacon,
                }, 
                error : false,
                totalPrice: 45
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error : true
            }
        default:
            return state;
    }
};

export default reducer;