import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">SignUp/SignIn</NavigationItem>
    </ul>
);

export default navigationItems;