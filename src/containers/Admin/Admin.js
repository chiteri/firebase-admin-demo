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
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {Route, NavLink, Switch} from 'react-router-dom';

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
                        activeStyle={{color: '#75B74A', fontWeight: 'bold', padding: '15px'}} 
                        exact>HOME</NavLink></li>
                    <li className={classes.navListItem} >
                      <NavLink className={classes.anchor} 
                      to="/new-food" 
                      activeClassName="activeNav" 
                      activeStyle={{color: '#75B74A', fontWeight: 'bold', padding: '15px'}} 
                      exact>NEW FOOD</NavLink></li>
                  </ul>
                </nav>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Switch>
                  <Route path="/" exact component={Foods} />
                  <Route path="/new-food" exact component={NewFood} />  
                  <Route path="/all-foods" exact component={Foods} />
                  <Route path="/food/:id" exact component={FoodDetail} />  
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

export default withErrorHandler(withStyles(useStyles)(Admin), axios);