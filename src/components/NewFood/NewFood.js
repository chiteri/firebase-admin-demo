import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        title: '', 
        content: '',
        author: 'Joh Doe'
    }

    postDataHandler = () => {
        const food = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }

        axios.post('/posts/', food)
        .then(response => {
            console.log(response);
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.newFood}>
                    <h4>Add a new food item ...</h4>
                    <TextField required id="food-name" label="Required" defaultValue="Food name" variant="outlined" />
                    <TextField required id="calories" label="Required" defaultValue="Calories" variant="outlined" />
                    <TextField required id="total-fat" label="Required" defaultValue="Total fat" variant="outlined" />
                    <TextField required id="saturated-fat" label="Required" defaultValue="Food name" variant="outlined" />
                </div>

                <div className={classes.newFood}>
                    <TextField required id="total-carbs" label="Required" defaultValue="Total carbs" variant="outlined" />
                    <TextField required id="dietary-fiber" label="Required" defaultValue="Dietary fiber" variant="outlined" />
                    <TextField required id="protein" label="Required" defaultValue="Protein" variant="outlined" />
                    <TextField required id="base-serving-size" label="Required" defaultValue="Base serving size" variant="outlined" />
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
  
export default withStyles(useStyles)(NewFood);