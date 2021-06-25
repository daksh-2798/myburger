import React from 'react';
import styles from '../Input/Input.module.css';

const input = (props) => {
    let inputElement = null;
    const InputStyles = [styles.InputElement];
    if(props.valid && props.shouldValidate && props.touched){
        InputStyles.push(styles.Invalid);
    }

    switch(props.elementType){
        case( 'input' ):
            inputElement = <input className={InputStyles.join(' ')} 
            {...props.elementConfig}  
            value={props.value}
            onChange={props.changed}/>;
            break;
        case( 'textarea' ):
            inputElement = <textarea className={InputStyles.join(' ')} 
            {...props.elementConfig} 
            value={props.value}  
            onChange={props.changed}/>;
            break;
        case( 'select' ):
            inputElement = (<select className={InputStyles.join(' ')}  
                value={props.value} 
                onChange={props.changed}>
                    {props.elementConfig.options.map(option =>(
                    <option key={option.value}
                    value={option.value}>
                        {option.displayValue}</option>
                ))}
                </select>
                );
                
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