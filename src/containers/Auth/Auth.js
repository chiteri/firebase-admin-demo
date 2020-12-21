import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import  Paper from '@material-ui/core/Paper';
import aux from '../hoc/Aux/Auxilliary';
import Spinner from '../../components/UI/Spinners/CircularDeterminateSpinner';
// import axios from 'axios';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';

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
         
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp);
    }

    render() {
        const {classes} = this.props;

        let form = (<aux><Grid item>
                        <TextField className={classes.padded} onBlur={this.onBlurField} required id="email" label="Email address" defaultValue="Email address" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField onBlur={this.onBlurField} required id="password" label="Password" defaultValue="Password" variant="outlined" />
                    </Grid>
                    </aux>);

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        // set up component for redirection 
        let redirect = null;

        if (this.props.token){
            redirect = <Redirect to='/all-foods' />;
        }

        return (
            <div>
            {redirect}
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid containerdirection="column"justify="center" spacing={2} className="login-form">

                    </Grid>
                    <Paper variant="elevation"elevation={2} className="login-background">                        
                        <form className={classes.root} onSubmit={this.authHandler} noValidate autoComplete="off">
                            <Grid container direction="column" spacing={2}>
                                {form}                            
                                <Grid item>
                                    {errorMessage}
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
            loading: state.auth.loading, 
            error: state.auth.error,
            token: state.auth.token,
            userEmail: state.auth.userEmail
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Auth));
