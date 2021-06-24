import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from '../ContactData/ContactData.module.css';
import axios from '../../axio-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //console.log(this.props.ingredient);
        this.setState({ loading : true });
        

        const order = {
            ingredient: this.props.ingredient,
            price: this.props.price,
            customer : {
                name: 'Daky',
                emailid: 'd@test.com',
                address : {
                    street: 'Darbar',
                    zipcode: '65656',
                    country: 'India'
                },
                deliveryMethod: 'fastest'
            }
        }
        console.log(order);
        axios.post('/orders.json',order).then(
            response => {
                this.setState({ loading : false });
                this.props.history.push('/');
                //console.log(response);
            }).catch(error => this.setState({ loading : false }));
        
    }

    render(){
        let form = (
                <form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email id"/>
                    <input type="text" name="name" placeholder="Your Street Name"/>
                    <input type="text" name="name" placeholder="Your Postal Code"/><br/>
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner/>;
        }

        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}            
            </div>
        )
    }

}

export default ContactData;