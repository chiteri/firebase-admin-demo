import React, {Component} from 'react';
// import classes from '*.module.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Food from '../Food/Food';

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
});

class FoodDetail extends Component {
    render() {
        const { classes } = this.props;
        let post = <p style={{textAlign:'center'}}>Please select a food item! </p>;

        if (this.props.id) {
            post = (
                <div className={classes.fullPost}>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.detail}</p>
                    <p>{this.props.author}</p>
                    <div className={classes.edit}>
                    <Button variant="contained" color="secondary"> Delete Food </Button>
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