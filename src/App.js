import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
//import styles from './App.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route ,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';

class App extends Component{
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


export default App;
