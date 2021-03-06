import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls= [
    {label:'Salad' , type:'salad'},
    {label:'Cheese' , type:'cheese'},
    {label:'Meat' , type:'meat'},
    {label:'Bacon' , type:'bacon'}
];

const buildControls = (props) =>(
    <div className={styles.BuildControls}>
        <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} 
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={styles.OrderButton}
        disabled={!props.purchasable} onClick={props.ordered}>{props.isAuth ?'ORDER NOW':'SignIn to Order'}</button>
    </div>
);


export default buildControls;