import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useMemo } from 'react';
import theme from '../assets/theme';

const useStyles = makeStyles({
  paper: { width: '100%' },
  tableContent: { maxHeight: '90vh', overflow: 'auto' },
});

const BooksList = ({ books }) => {
  const classes = useStyles();
  const options = useMemo(
    () => ({
      pageSize: 10,
      pageSizeOptions: [10, 25, 100],
      headerStyle: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      },
    }),
    [],
  );

  const columns = useMemo(
    () => [
      { field: 'code', title: 'ID' },
      { field: 'name', title: 'Name' },
      { field: 'author', title: 'Author' },
      { field: 'publHouse', title: 'Publishing House' },
      { field: 'year', title: 'Year', type: 'numeric' },
      { field: 'genre', title: 'Genre' },
      { field: 'copies', title: 'No. Copies', type: 'numeric' },
    ],
    [],
  );

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tableContent}>
          <MaterialTable columns={columns} data={books} title='All books' options={options} />
        </div>
      </Paper>
    </>
  );
};

export default BooksList;
