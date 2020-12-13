import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from '../../../axios-food';
import FoodsList from '../../../components/Food/FoodsList/FoodsList';
import CircularDeterminateSpinner from '../../../components/UI/Spinners/CircularDeterminateSpinner';

class Foods extends Component {
    state = {
        food_items: null, 
        selectedFoodId: null, 
        error: false
    } 

    componentDidMount() {
        // Launch an AJAX http request  
        // Retrieve the first five items alone // ?orderBy="food_name"&limitToFirst=5
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
        let food_items = <p style={{textAlign: 'center'}}>Something went wrong ...!</p>;

        if (!this.state.error) {
            food_items = <CircularDeterminateSpinner />;

            if (this.state.food_items) {
                food_items = (
                <FoodsList food_items={this.state.food_items} foodSelectedHandler={this.foodSelectedHandler} />
                );
            }
        
            return food_items;
        }
    }
}

/* Foods.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(useStyles)(Foods); */
export default Foods;