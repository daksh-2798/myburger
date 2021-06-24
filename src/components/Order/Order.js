import React from 'react';
import styles from '../Order/Order.module.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredienrs : Salad(1)</p>
        <p>Price:<strong>150</strong></p>
    </div>
);

export default order;