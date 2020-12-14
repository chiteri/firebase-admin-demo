import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Admin from './Admin/Admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Admin />
      </div>
    </BrowserRouter>
  );
}

export default App;
