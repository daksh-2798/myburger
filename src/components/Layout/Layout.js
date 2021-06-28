import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {

    state={
        showSideDrawer : false
    }

    sideDrawerClosedHAndler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render(){
    return(
    <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHAndler} />
        <main className={styles.Content}>{this.props.children}</main>
    </Aux>
    );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);