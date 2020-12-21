import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import axios from 'axios';
import axios from '../../../axios-food';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

// Manage authentication and sessions 
import {connect} from 'react-redux';

const useStyles = theme => ({    
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    padded: {
        padding: '15px',
        margin: '15px',
    },
    },
});

class NewFood extends Component {
    state = {
        auth: null,
        submitted: false
    };

    constructor() {
        super();

        this.state = { };

        this.onBlurField = this.onBlurField.bind(this);
        this.postDataHandler = this.postDataHandler.bind(this);
    }

    onBlurField = (event) => {
        this.setState({[event.target.id] : event.target.value});
    }

    postDataHandler = () => {
        // console.log(this.state); 
        const newFoodRecord = { ...this.state, created_by: this.props.userEmail}; // Append some user info to record 
        axios.post('/foods.json', newFoodRecord)
        .then(response => {
            this.setState({submitted: true});
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    render() {
        const {classes} = this.props;
        let redirect = null;

        if (this.state.submitted){
            redirect = <Redirect to='/all-foods' />;
        }

        return (
            <form className={classes.root} noValidate autoComplete="off">
                {redirect}
                <h4>Add a new food item ...</h4>
                <div className={classes.newFood}>
                    <TextField onBlur={this.onBlurField} required id="food_name" label="Food name" defaultValue="Food name" variant="outlined" />
                    <TextField onBlur={this.onBlurField} required id="calories" label="Calories" defaultValue="Calories (kcal)" variant="outlined" />
                    <TextField onBlur={this.onBlurField} required id="total_fat" label="Total fat" defaultValue="Total fat (g)" variant="outlined" />
                    <TextField onBlur={this.onBlurField} required id="saturated_fat" label="Saturated fat" defaultValue="Saturated fat (g)" variant="outlined" />
                </div>

                <div className={classes.newFood}>
                    <TextField onBlur={this.onBlurField} required id="total_carbs" label="Total carbs" defaultValue="Total carbs (g)" variant="outlined" />
                    <TextField onBlur={this.onBlurField} required id="dietary_fiber" label="Dietary fibre" defaultValue="Dietary fiber (g)" variant="outlined" />
                    <TextField onBlur={this.onBlurField} required id="protein" label="Protein" defaultValue="Protein (g)" variant="outlined" />
                    <TextField onBlur={this.onBlurField} required id="base_serving_size" label="Base serving size" defaultValue="Base serving size" variant="outlined" />
                    <div className={classes.edit}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.padded}
                            onClick={this.postDataHandler}> Add Food </Button>
                    </div>
                </div>
            </form>
        );
    }
}

NewFood.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userEmail: state.auth.userEmail
    };
}
  
export default withStyles(useStyles)(connect(mapStateToProps)(NewFood));