import React from 'react';
import styles from '../Input/Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch(props.elementType){
        case( 'input' ):
            inputElement = <input className={styles.InputElement} {...props.elementConfig}  value={props.value}/>;
            break;
        case( 'textarea' ):
            inputElement = <textarea className={styles.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        default:
            inputElement=<input className={styles.InputElement} {...props.elementConfig} value={props.value}/>;
    }
    
    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;