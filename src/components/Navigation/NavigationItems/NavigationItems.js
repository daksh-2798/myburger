import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exaxt>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;