import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxi';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedStyles = [styles.SideDrawer,styles.Close]

    if(props.open){
        attachedStyles = [styles.SideDrawer,styles.Open]
    }
    
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedStyles.join(' ')} onClick={props.closed}>
        <div className={styles.Logo}>
            <Logo/>
        </div>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>    
        </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;