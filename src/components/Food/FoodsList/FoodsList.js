import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FoodItem from '../../FoodItem/FoodItem';

const useStyles = makeStyles((theme) => ({
    foods: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      width: '90%',
      margin: 'auto',
    },
}));

function FoodsList (props) {
        const classes = useStyles();
        // console.log(props.food_items);
        // Convert a javascript object into an array before rendering it to display
        let transformedFoodItems = Object.keys(props.food_items).map(foodKey => {
            return [...Array(props.food_items[foodKey])].map((_, i) => {
                return (                    
                    <FoodItem
                        key={foodKey}
                        food_id={foodKey} 
                        type={foodKey} 
                        food_name={props.food_items[foodKey].food_name} 
                        base_serving_size={props.food_items[foodKey].base_serving_size} 
                        created_by={props.food_items[foodKey].created_by} 
                        clicked={() => props.foodSelectedHandler(foodKey)} />                    
                );
            }); 
            
        });  

        return (
            <section className={classes.foods}>
                {transformedFoodItems}
            </section>
        );
}

/* foodsList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(useStyles)(foodsList); */

export default FoodsList;