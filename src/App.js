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

class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" exact component={Auth}/>
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
      <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/logout" exact component={LogOut}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/checkout"  component={Checkout}/>
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
