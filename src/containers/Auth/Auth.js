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
import * as actions from '../../store/actions/index';

// Manage authentication and sessions 
import {connect} from 'react-redux';

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

        this.state = { 
            isSignUp: false
        };

        this.onBlurField = this.onBlurField.bind(this);
        this.authHandler = this.authHandler.bind(this);
    }

    onBlurField = (event) => {
        this.setState({[event.target.id] : event.target.value});
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    authHandler = (event) => {
        event.preventDefault(); // Prevent page from reloading

        // 
        this.props.onAuth(this.state.email, this.state.password)

        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };

        let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]';

        if (this.state.isSignUp) {
            authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
        }

        axios.post(authURL, authData)
        .then(response => {
            if (this.state.isSignUp) {
                this.setState({idToken: response.data.idToken, userId: response.data.localId});
            }
            // alert(response.data);
            console.log(response.data);
        })
        .catch((err) => {
            // alert(err);
            this.setState({error: true});
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
                            <Typography component="h6" variant="h6">Account</Typography>
                        </Grid>
                        <Grid item></Grid>
                        <form className={classes.root} onSubmit={this.authHandler} noValidate autoComplete="off">
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
                                        onClick={this.authHandler}> SUBMIT </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="secondary"
                                className={classes.padded}
                                onClick={this.switchAuthModeHandler}> SWITCH TO {this.state.isSignUp? 'SIGNIN' : 'SIGNUP'} </Button>
                        </Grid>
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

const mapStateToProps = state => {
    return {
            auth: state.authData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
}

export default withStyles(useStyles)(connect(null, mapDispatchToProps)(Auth));
