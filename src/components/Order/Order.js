import React from 'react';
import styles from '../Order/Order.module.css';

const order = (props) =>{ 
    const ingredient = [];
    for(let ingredientName in props.ingredient){
        ingredient.push(
            {
                name : ingredientName,
                amount : props.ingredient[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredient.map(ig =>{
        return <span key={ig.name} 
        style={
            {textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            padding: '5px',
            border: '1px solid white',
            backgroundColor: 'rgba(248, 237, 226)'
        }
        }>{ig.name} : <span style={{ fontWeight:'bold' }}> {ig.amount}</span></span>
    })
    return(
    <div className={styles.Order}>
        <p>Ingredients : {ingredientOutput}</p>
        <p>Price:<strong>{props.price}</strong></p>
    </div>
);
}
export default order;