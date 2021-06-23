import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from '../ContactData/ContactData.module.css';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render(){
        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email id"/>
                    <input type="text" name="name" placeholder="Your Street Name"/>
                    <input type="text" name="name" placeholder="Your Postal Code"/><br/>
                    <Button btnType="Success">Order</Button>
                </form>            
            </div>
        )
    }

}

export default ContactData;