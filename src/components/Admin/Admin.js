import React from 'react';
import Aux from '../hoc/Auxilliary';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Admin() {
    const classes = useStyles();
    return (
        <Aux>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>TOOLBAR</Paper>
            </Grid>
            <Grid item xs={3} >
            <Paper className={classes.paper}>SIDE MENU</Paper>
            </Grid>
            <Grid item xs={9} >
            <Paper className={classes.paper}>MAIN</Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper className={classes.paper}>FOOTER</Paper>
            </Grid>        
          </Grid>
        </Aux>
    );
}

export default Admin;