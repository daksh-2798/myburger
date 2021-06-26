import * as actionTypes from './actions';

const initialState ={
    ingredient: {
        salad : 0,
        cheese : 0,
        meat : 0,
        bacon : 0
    },
    totalPrice : 45
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
        default:
            return state;
    }
};

export default reducer;