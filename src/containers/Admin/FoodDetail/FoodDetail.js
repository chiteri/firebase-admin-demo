import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import axios from 'axios';
import axios from '../../../axios-food';
import CircularDeterminateSpinner from '../../../components/UI/Spinners/CircularDeterminateSpinner';
import SimpleFoodTable from '../../../components/UI/Tables/SimpleFoodTable/SimpleFoodTable';
import {Redirect} from 'react-router-dom';

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
        error: false,
        deleted: false
    }

    // React hook invoked after component finishes rendering
    componentDidMount() {
        // console.log('IDxxx: '+this.props.match.params.id);
        if (this.props.match.params.id) {
            // console.log('IDyyy: '+this.props.match.params.id);
            if (!this.state.loadedFood || (this.state.loadedFood 
                && this.state.loadedFood.id !== this.props.match.params.id)) {
                // 
                // console.log('IDzzz: '+this.props.match.params.id);
                axios.get('/foods/'+this.props.match.params.id+'.json')
                .then((response) => {
                    this.setState({loadedFood: {...response.data, food_id: this.props.match.params.id}});
                    /* this.setState((prevState, props) => {
                        return {loadedFood: response.data};
                        } 
                    ); */
                    // this.setState({loadedFood: response.data});
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
    deleteFoodHandler = (foodID) => {
        axios.delete('/foods/'+foodID+'.json')
        .then((response) => {
            this.setState({deleted: true});
            console.log(response);
        });
    }

    demoErrorMessage = (foodID) => {
        axios.delete('/foodssss/'+foodID+'xyzjson')
        .then((response) => {
            console.log(response);
        });
    }
    
    render() {
        const { classes } = this.props;

        // set up component for redirection 
        let redirect = null;

        if (this.state.deleted){
            redirect = <Redirect to='/all-foods' />;
        }

        let food = <p style={{textAlign:'center'}}>Please select a food item! </p>;

        if (this.props.match.params.id) {
            food = <p style={{textAlign:'center'}}> ... Loading ... </p>;
        }

        if (!this.state.error) {
            food = <p style={{textAlign:'center'}}> <CircularDeterminateSpinner  /> </p>;

            if (this.state.loadedFood) {
                food = (
                    <div className={classes.fullPost}>
                        {redirect}
                        <h4>{this.state.loadedFood.food_name}</h4>
                        <SimpleFoodTable food={this.state.loadedFood} />
                        <div className={classes.edit}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                className={classes.padded}
                                onClick={() => this.deleteFoodHandler(this.state.loadedFood.food_id)}> Delete Food </Button>

                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.padded}
                                onClick={() => this.demoErrorMessage(this.state.loadedFood.food_id)}> Demo Error </Button>
                        </div>
                    </div>
                );
            }
        }

        return food;
    }
}

FoodDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(useStyles)(FoodDetail);