import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Admin from './Admin/Admin';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../store/actions/index';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const {classes} = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Admin />
        </div>
      </BrowserRouter>
    );
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withStyles(useStyles)(connect(null, mapDispatchToProps)(App));
