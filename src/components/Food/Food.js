import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    post: {
        width: '30%',
        padding: '16px',
        textAlign: 'center',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        margin: '10px',
        boxSizing: 'border-box',
        cursor: 'pointer',
    }, 
    details: {
        margin: '16px 0',
        color: '#ccc',
    },
}));

function Food (props) {
    const classes = useStyles();
    return (
        <article className={classes.post} onClick={props.clicked}>          
          <h4>{props.title}</h4>
          <div className={classes.info}>
            <div className={classes.details}>{props.author}</div>
          </div>
        </article>
    );
}
  
export default Food;