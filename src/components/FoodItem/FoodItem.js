import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    foodItem: {
        width: '30%',
        padding: '16px',
        textAlign: 'center',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        margin: '10px',
        boxSizing: 'border-box',
        cursor: 'pointer',
    }, 
    details: {
        margin: '16px 0',
        color: '#ccc',
    },
}));

function FoodItem (props) {
    const classes = useStyles();
    return (
        <article className={classes.foodItem} onClick={props.clicked}>          
          <h4>{props.food_name}</h4>
          <div className={classes.info}>
            <div className={classes.base_serving}>{props.created_by}</div> 
            <div className={classes.base_serving}>Base serving: ({props.base_serving_size} g)</div>
            <Link to={'/food/'+props.food_id} >More details</Link>
          </div>
        </article>
    );
}
  
export default FoodItem;