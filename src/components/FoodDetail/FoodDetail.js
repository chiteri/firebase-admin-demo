import React, {Component} from 'react';
// import classes from '*.module.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Food from '../Food/Food';
import axios from 'axios';

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
        loadedFood: null
    }

    // React hook invoked after component finishes rendering
    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedFood || (this.state.loadedFood 
                && this.state.loadedFood.id !== this.props.id)) {
                // 
                axios.get('/posts/'+this.props.id)
                .then((response) => {
                    this.setState({loadedFood: response.data})
                    // console.log(response);
                });
            }
            
        } 
    }
    
    // Delete an individual food item 
    deleteFoodHandler = () => {
        axios.delete('/posts/'+this.props.id)
        .then((response) => {
            console.log(response);
        });
    }
    
    render() {
        const { classes } = this.props;
        let post = <p style={{textAlign:'center'}}>Please select a food item! </p>;

        if (this.props.id) {
            post = <p style={{textAlign:'center'}}> ... Loading ... </p>;
        }

        if (this.state.loadedFood) {
            post = (
                <div className={classes.fullPost}>
                    <h4>{this.state.loadedFood.title}</h4>
                    <p>{this.state.loadedFood.body}</p>
                    <p>{this.state.loadedFood.author}</p>
                    <div className={classes.edit}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.padded}
                            onClick={this.deleteFoodHandler}> Delete Food </Button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

FoodDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(useStyles)(FoodDetail);