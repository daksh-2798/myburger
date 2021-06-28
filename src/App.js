import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
//import styles from './App.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route ,Switch , withRouter} from 'react-router-dom';
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
    return(
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/logout" exact component={LogOut}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/checkout" exact component={Checkout}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
