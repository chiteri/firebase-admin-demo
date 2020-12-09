import React, {Component} from 'react';
import Aux from '../hoc/Auxilliary';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});

class Admin extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Aux>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={this.state.classes.paper}>TOOLBAR</Paper>
            </Grid>
            <Grid item xs={3} >
            <Paper className={this.state.classes.paper}>SIDE MENU</Paper>
            </Grid>
            <Grid item xs={9} >
            <Paper className={this.state.classes.paper}>MAIN</Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper className={this.state.classes.paper}>FOOTER</Paper>
            </Grid>        
          </Grid>
        </Aux>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);