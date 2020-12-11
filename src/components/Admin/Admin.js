import React, {Component} from 'react';
import Aux from '../hoc/Auxilliary';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Food from '../Food/Food';
import FoodDetail from '../FoodDetail/FoodDetail';
import NewFood from '../NewFood/NewFood';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    foods: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      width: '90%',
      margin: 'auto',
    },
});

class Admin extends Component {
  state = {
    food_items: [], 
    selectedFoodId: null, 
    error: false
  }

  componentDidMount() {
    // Launch an AJAX http request  
    axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then(response => {
      const posts = response.data.slice(0, 3);
      const updatedPosts =  posts.map(post => {
        return {
          ...post,
          author: 'Jane Doe'
        }
      });

      this.setState({food_items: updatedPosts});
      // console.log(response);
    })
    .catch(error => {
      this.setState({error: true})
      // console.log(error);
    });
  }

  foodSelectedHandler = (id) => {
    this.setState({selectedFoodId: id});
  }

  render() {
    const { classes } = this.props;
    let food_items = <p style={{textAlign: 'center'}}>Something went wrong ...!</p>;

    if (!this.state.error) {
      food_items = this.state.food_items.map(food => {
        return <Food 
                  key={food.id} 
                  title={food.title} 
                  description={food.body} 
                  author={food.author} 
                  clicked={() => this.foodSelectedHandler(food.id)} />;
      }
      );
    }
    
    return (
        <Aux>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>Moove-fit Foods</h1>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <section className={classes.foods}>
                {food_items}
                </section>   
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FoodDetail id={this.state.selectedFoodId} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NewFood />
              </Paper>
            </Grid>        
          </Grid>
        </Aux>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Admin);