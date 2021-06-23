import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
     // let transformedIngredient = Object.keys(props.ingredient).map((igKey, i) => 
       //   <BurgerIngredient key={igKey + i} type={igKey} />);
    
      
     let transformedIngredient = Object.keys(props.ingredient)
    .map(igKey => {
        return[...Array(props.ingredient[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    },[]);
 
    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Please start adding ingredients.!!!</p>
    }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/> 
        </div>

    );
};

export default burger;