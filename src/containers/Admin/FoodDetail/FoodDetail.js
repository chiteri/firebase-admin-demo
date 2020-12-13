import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
import axios from '../../../axios-food';

const useStyles = theme => ({
    fullPost: {
        width: '80%',
        margin: '20px auto',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        textAlign: 'center'
    },
    edit: {

    },
    padded: {
        padding: '15px', 
        margin: '15px',
    },
});

class FoodDetail extends Component {
    state = {
        loadedFood: null, 
        error: false
    }

    // React hook invoked after component finishes rendering
    componentDidUpdate() {
        console.log('IDxxx: '+this.props.id);
        if (this.props.id) {
            console.log('IDyyy: '+this.props.id);
            if (!this.state.loadedFood || (this.state.loadedFood 
                && this.state.loadedFood.id !== this.props.id)) {
                // 
                console.log('IDzzz: '+this.props.id);
                axios.get('/foods.json'+this.props.id)
                .then((response) => {
                    console.log(response);
                })
                .catch(error => {
                    this.setState({error: true})
                    console.log(error);
                  });
            }
            
        } 
    }
    
    // Delete an individual food item 
    deleteFoodHandler = () => {
        axios.delete('foods/'+this.props.id)
        .then((response) => {
            console.log(response);
        });
    }
    
    render() {
        const { classes } = this.props;
        let food = <p style={{textAlign:'center'}}>Please select a food item! </p>;

        if (this.props.food) {
            food = <p style={{textAlign:'center'}}> ... Loading ... </p>;
        }

        // if (!this.state.error) {
            // food = <p style={{textAlign:'center'}}> <CircularDeterminateSpinner  /> </p>;

        if (this.props.food) {
            food = (
                <div className={classes.fullPost}>
                    <h4>{this.props.food.food_name}</h4>
                    <p>{this.props.food.base_serving_size}</p>
                    <p>{this.props.food.created_by}</p>
                    <div className={classes.edit}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.padded}
                            onClick={() => this.deleteFoodHandler(this.props.food.food_id)}> Delete Food </Button>
                    </div>
                </div>
            );
        }
        // }

        return food;
    }
}

FoodDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(useStyles)(FoodDetail);