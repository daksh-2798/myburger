import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    };
};

export const setIngredient = (ingredient) => {
    return {
        type : actionTypes.SET_INGREDIENT,
        ingredient : ingredient
    };
};

export const fetchIngredientFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENT_FAILED
    };
};

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://my-burger-289de-default-rtdb.firebaseio.com/ingredient.json')
        .then(response => {
            dispatch(setIngredient(response.data));
        }).catch(error => {
            dispatch(fetchIngredientFailed());
    });
};
};
