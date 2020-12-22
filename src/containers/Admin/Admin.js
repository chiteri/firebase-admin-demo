import React, {Component} from 'react';
import Aux from '../hoc/Aux/Auxilliary';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios-food';
import Foods from '../../containers/Admin/Foods/Foods';
import FoodDetail from './FoodDetail/FoodDetail';
import NewFood from './NewFood/NewFood';
import Auth from '../Auth/Auth';
import Logout from '../../containers/Auth/Logout/Logout';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {Route, NavLink, Switch} from 'react-router-dom';

// Manage authentication and sessions 
import {connect} from 'react-redux';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    navigation: {
      listStyle: 'none',
      margin: '0',
      padding: '0',
      width: '100%',
      textAlign: 'center'
    },
    navListItem: {
      display: 'inline-block',
      margin: '20px'
    },
    anchor: {
      textDecoration: 'none',
      color: 'black'
    }, 
    activeNav: {
      color: 'orange',
    },
});

class Admin extends Component {
  state = {
    auth: null,
    food_items: null, 
    selectedFoodId: null, 
    error: false
  }  

  render() {
    const { classes } = this.props;
    
    return (
        <Aux>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>Moove-fit Foods</h1>
                <nav>
                  <ul className={classes.navigation}>
                    <li className={classes.navListItem}>
                      <NavLink 
                        className={classes.anchor} 
                        to="/" 
                        activeClassName="activeNav" 
                        activeStyle={{color: '#3F51B5', fontWeight: 'bold', padding: '15px'}} 
                        exact>HOME </NavLink></li>
                    <li className={classes.navListItem} >
                      <NavLink className={classes.anchor} 
                      to="/new-food" 
                      activeClassName="activeNav" 
                      activeStyle={{color: '#3F51B5', fontWeight: 'bold', padding: '15px'}} 
                      exact>{this.props.isAuthenticated? 'NEW FOOD' : null }</NavLink></li>
                    <li className={classes.navListItem} >
                      <NavLink className={classes.anchor} 
                      to="/profile" 
                      activeClassName="activeNav" 
                      activeStyle={{color: '#3F51B5', fontWeight: 'bold', padding: '15px'}} 
                      exact>{this.props.userEmail? '('+this.props.userEmail+')' : null} </NavLink></li>
                    <li className={classes.navListItem} >
                      <NavLink className={classes.anchor} 
                      to="/logout" 
                      activeClassName="activeNav" 
                      activeStyle={{color: '#3F51B5', fontWeight: 'bold', padding: '15px'}} 
                      exact>{this.props.isAuthenticated? 'LOGOUT' : null} </NavLink></li>
                  </ul>
                </nav>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Switch>
                  { !this.props.isAuthenticated ? <Route path="/" exact component={Auth} /> : null }
                  { this.props.isAuthenticated ? <Route path="/" exact component={Foods} /> : null }
                  { this.props.isAuthenticated ? <Route path="/logout" exact component={Logout} /> : null }
                  { this.props.isAuthenticated ? <Route path="/new-food" exact component={NewFood} />  : null }
                  { this.props.isAuthenticated ? <Route path="/all-foods" exact component={Foods} /> : null }
                  { this.props.isAuthenticated ? <Route path="/food/:id" exact component={FoodDetail} />  : null }
                </Switch>          
              </Paper>
            </Grid>        
          </Grid>
        </Aux>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token, 
    userEmail: state.auth.userEmail
  };
}

export default withErrorHandler(withStyles(useStyles)(connect(mapStateToProps)(Admin)), axios);