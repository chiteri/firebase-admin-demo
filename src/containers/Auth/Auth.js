import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import  Paper from '@material-ui/core/Paper';
import  AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    padded: {
        padding: '15px', 
        margin: '15px',
    },
  });

class Auth extends Component {
    constructor() {
        super();

        this.state = { };

        this.onBlurField = this.onBlurField.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    onBlurField = (event) => {
        this.setState({[event.target.id] : event.target.value});
    }

    loginHandler = (event) => {
        event.preventDefault(); // Prevent page from reloading

        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        const authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]';

        axios.post(authURL, authData)
        .then(response => {
            this.setState({auth: response.data});
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    signUpHandler = (event) => {
        event.preventDefault(); // Prevent page from reloading

        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        const authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';

        axios.post(authURL, authData)
        .then(response => {
            alert(response);
            console.log(response);
        })
        .catch((err) => {
            // 
            alert(err);
            console.log(err);
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
            <AppBar position="static" alignitems="center" color="primary">
                <Toolbar>
                    <Grid container justify="center" wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">Moove-fit</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid containerdirection="column"justify="center"spacing={2}className="login-form">

                    </Grid>
                    <Paper variant="elevation"elevation={2}className="login-background">
                        <Grid item>
                            <Typography component="h1" variant="h5">Sign in</Typography>
                        </Grid>
                        <Grid item></Grid>
                        <form className={classes.root} onSubmit={this.loginHandler} noValidate autoComplete="off">
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField onBlur={this.onBlurField} required id="email" label="Email address" defaultValue="Email address" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField onBlur={this.onBlurField} required id="password" label="Password" defaultValue="Password" variant="outlined" />
                                </Grid>
                            
                                <Grid item>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        className={classes.padded}
                                        onClick={this.loginHandler}> Login </Button>

                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        className={classes.padded}
                                        onClick={this.signUpHandler}> SignUp </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            </div>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Auth);