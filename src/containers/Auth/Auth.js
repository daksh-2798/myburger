 import React, { Component } from 'react';
 import Input from '../../components/UI/Input/Input';
 import Button from '../../components/UI/Button/Button';
 import styles from '../Auth/Auth.module.css';
 import * as actions from '../../store/actions/index';
 import {connect} from 'react-redux';
 import Spinner from '../../components/UI/Spinner/Spinner';
 import {Redirect} from 'react-router-dom';
 
 class Auth extends Component{
    state = {
        controls : {
        emailid: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email id'
            },
            value:'',
            validation : {
                required : true,
                isEmail : true
            },
            valid:false,
            touched:false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value:'',
            validation : {
                required : true,
                minLength : 6
            },
            valid:false,
            touched:false
        }
    },
        isSignUp : true
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.emailid.value,this.state.controls.password.value,this.state.isSignUp);
    }

    inputChangedHandler = (event , controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched :true,
                valid : this.checkValidity(event.target.value,this.state.controls[controlName].validation)
            }
        }
        this.setState({controls:updatedControls});
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp : !prevState.isSignUp}
        })
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }

        let form = this.props.loading ? <Spinner/> : formElementArray.map(formElement => (
            <Input
            key={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>{this.inputChangedHandler(event,formElement.id)}} />));

            let authRedirect = null; 
            if(this.props.isAuthenticated)
                { 
                    authRedirect = <Redirect to={this.props.authRedirectPath} />; 
                }
                
        //let errorMessage = null;
        let errorMessage = this.props.error ? (<p style={{color:'red'}}>{this.props.error.message}</p>) : null;        
        return(
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked = {this.switchAuthModeHandler}
                    btnType="Danger">Swith To {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
 }

 const mapStateToProps = state => {
     return {
         loading : state.auth.loading,
         error : state.auth.error,
         isAuthenticated : state.auth.token !== null,
         buildingBurger : state.burgerBuilder.building,
         authRedirectPath : state.auth.authRedirectPath
     }
 }

 const mapDispatchToProps = dispatch => {
     return{
     onAuth : (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
     onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

 export default connect(mapStateToProps,mapDispatchToProps)(Auth);