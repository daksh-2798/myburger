import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from '../ContactData/ContactData.module.css';
import axios from '../../axio-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component{

    state = {
       orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation : {
                    required : true
                },
                valid:false,
                touched:false
            },
            emailid: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email id'
                },
                value:'',
                validation : {
                    required : true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value:'',
                validation : {
                    required : true
                },
                valid:false,
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip-Code'
                },
                value:'',
                validation : {
                    required : true,
                    exactLength : 6
                },
                valid:false,
                touched:false
            },                
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value:'India',
                validation : {
                    required : true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                    placeholder: 'Delivery Method'
                },
                validation:{},
                value:'cheapest',
                valid:true
            }
       },
        loading: false,
        formIsValid : false
    }

    checkValidity(value,rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.exactLength){
            isValid = value.length == rules.exactLength && isValid;
        }
        return isValid;
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //console.log(this.props.ingredient);
        this.setState({ loading : true });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredient: this.props.ingredient,
            price: this.props.price,
            orderData : formData  
        }
        console.log(order);
        axios.post('/orders.json',order).then(
            response => {
                this.setState({ loading : false });
                this.props.history.push('/');
                //console.log(response);
            }).catch(error => this.setState({ loading : false }));
        
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }


        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => (
                        
                        <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>{this.inputChangedHandler(event,formElement.id)}} />
                    ))}

                    {/* <Input elementType="..." elementConfig="..." value="..."/>
                    <Input elementType="..." elementConfig="..." value="..."/>
                    <Input elementType="..." elementConfig="..." value="..."/>
                    <Input elementType="..." elementConfig="..." value="..."/><br/> */}
                    <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
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