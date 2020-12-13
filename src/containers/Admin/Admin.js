import React, {Component} from 'react';
import Aux from '../hoc/Aux/Auxilliary';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import axios from 'axios';
import axios from '../../axios-food';
import Foods from '../../containers/Admin/Foods/Foods';
// import FoodItem from '../../Component/FoodItem/FoodItem';
import FoodDetail from './FoodDetail/FoodDetail';
import NewFood from './NewFood/NewFood';
// import CircularDeterminateSpinner from '../../components/UI/Spinners/CircularDeterminateSpinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Foods />   
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <FoodDetail food_id={this.state.selectedFoodId}
                  food={this.state.food_items? this.state.food_items[this.state.selectedFoodId]: null} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NewFood />
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