import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Food Item</TableCell>
            <TableCell align="left">Item value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody> 
        { Object.entries(props.food).map((food_info) => {
            return(
            <TableRow key={food_info[0]}>
                <TableCell align="right">{food_info[0]}</TableCell>
                <TableCell align="left">{food_info[1]}</TableCell>
            </TableRow>
            );
        }) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}