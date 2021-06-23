import React from 'react';
import styles from '../DrawerToggle/DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={styles.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;