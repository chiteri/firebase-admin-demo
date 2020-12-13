import React from 'react';
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
    <div className={classes.root}>
      <Admin />
    </div>
  );
}

export default App;
