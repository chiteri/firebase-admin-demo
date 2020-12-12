import React from 'react';
import FoodItem from '../../FoodItem/FoodItem';

const foods = (props) => {
        // console.log(props.food_items);
        let transformedFoodItems = Object.keys(props.food_items).map(foodKey => {
            return [...Array(props.food_items[foodKey])].map((_, i) => {
                return <FoodItem 
                    key={foodKey} 
                    type={foodKey} 
                    food_name={props.food_items[foodKey].food_name} 
                    base_serving_size={props.food_items[foodKey].base_serving_size} 
                    created_by={props.food_items[foodKey].created_by} 
                    clicked={() => props.foodSelectedHandler(foodKey)}/>;
            }); 
            
        });  

        return transformedFoodItems;
}

export default foods;