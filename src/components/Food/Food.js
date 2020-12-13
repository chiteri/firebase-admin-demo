import React, {Component} from 'react';
import Nutrient from './Nutrient/Nutrient';

class Food extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.newFood}>
                    <TextField required id="food_name" label="Required" defaultValue="Food name" onChange={this.onInputchange} variant="outlined" />
                    <TextField required id="calories" label="Required" defaultValue="Calories (kcal)" variant="outlined" />
                    <TextField required id="total_fat" label="Required" defaultValue="Total fat (g)" variant="outlined" />
                    <TextField required id="saturated_fat" label="Required" defaultValue="Saturated fat (g)" variant="outlined" />
            </div>

            <div className={classes.newFood}>
            <TextField required id="total_carbs" label="Required" defaultValue="Total carbs (g)" variant="outlined" />
            <TextField required id="dietary_fiber" label="Required" defaultValue="Dietary fiber (g)" variant="outlined" />
            <TextField required id="protein" label="Required" defaultValue="Protein (g)" variant="outlined" />
            <TextField required id="base_serving_size" label="Required" defaultValue="Base serving size" variant="outlined" />
            <div className={classes.edit}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.padded}
                    onClick={this.postDataHandler}> Add Food </Button>
            </div>
            </div>
        );
    }
}
  
export default Food;