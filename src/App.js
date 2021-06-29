import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
//import styles from './App.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route ,Switch , withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckOut = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" exact component={asyncAuth}/>
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
      <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/logout" exact component={LogOut}/>
            <Route path="/orders" exact component={asyncOrders}/>
            <Route path="/auth" exact component={asyncAuth}/>
            <Route path="/checkout"  component={asyncCheckOut}/>
            <Redirect to="/" />
          </Switch>
          );    
        }

    return(
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
