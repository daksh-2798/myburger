import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from '../CheckoutSummary/CheckoutSummary.module.css';

const checkoutSummary = (props) =>{
    return(
    <div className={styles.CheckoutSummary}>
        <div style={{width: '100%' , margin: 'auto'}}>
            <Burger ingredient={props.ingredient} />
        </div>
        <Button btnType="Danger" clicked>CANCEL</Button>
        <Button btnType="Success" clicked>CONTINUE</Button>
    </div>
    );
}

export default checkoutSummary;