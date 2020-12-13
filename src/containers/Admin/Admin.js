import React, {Component} from 'react';
import Aux from '../../components/hoc/Auxilliary';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
// import axios from '../../axios-food';
import Foods from '../../components/Food/Foods/Foods';
// import FoodItem from '../../Component/FoodItem/FoodItem';
import FoodDetail from '../../components/FoodDetail/FoodDetail';
import NewFood from '../../components/NewFood/NewFood';
import CircularDeterminateSpinner from '../../components/UI/Spinners/CircularDeterminateSpinner';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    foods: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      width: '90%',
      margin: 'auto',
    },
});

class Admin extends Component {
  state = {
    food_items: null, 
    selectedFoodId: null,
    error: false
  }

  componentDidMount() {
    // Launch an AJAX http request  
    axios.get('/foods.json')
    .then(response => {
      this.setState((prevState, props) => {
        return {food_items: response.data};
      } 
      ); // updatedFoods});
      // console.log(this.state.food_items);
    })
    .catch(error => {
      this.setState({error: true})
      // console.log(error);
    });
  }

  foodSelectedHandler = (id) => {
    this.setState({selectedFoodId: id});
  }

  render() {
    const { classes } = this.props;
    let food_items = <p style={{textAlign: 'center'}}>Something went wrong ...!</p>;

    if (!this.state.error) {
      food_items = <CircularDeterminateSpinner />;

      if (this.state.food_items) {
        food_items = (
          <Foods food_items={this.state.food_items} foodSelectedHandler={this.foodSelectedHandler} />
        );
      }
      
      // return foods;
      
    }
    
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
                <section className={classes.foods}>
                {food_items}
                </section>   
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

export default withStyles(useStyles)(Admin);