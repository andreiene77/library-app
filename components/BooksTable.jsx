import { Button, ButtonGroup } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useCallback, useMemo } from 'react';
import { mutate } from 'swr';
import theme from '../assets/theme';
import { useStudentContext } from '../contexts/studentContext';
import { BOOKS_ROUTE } from '../utils/apiRoutes';
import { poster } from '../utils/fetcher';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
  fileInput: { display: 'none' },
});

const BooksTable = ({ books, addBook, modifyBook, deleteBook }) => {
  const classes = useStyles();
  const [{ accessToken }] = useStudentContext();
  const fetcherKey = [BOOKS_ROUTE.GET.ALL(), accessToken];

  const columns = useMemo(
    () => [
      { field: 'code', title: 'ID' },
      { field: 'name', title: 'Name' },
      { field: 'author', title: 'Author' },
      { field: 'publHouse', title: 'Publishing House' },
      { field: 'year', title: 'Year', type: 'numeric' },
      { field: 'genre', title: 'Genre' },
      { field: 'copies', title: 'No. Copies', type: 'numeric' },
      { field: 'place', title: 'Place', editable: 'never' },
    ],
    [],
  );

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

  const editable = useMemo(
    () => ({
      onRowAdd: addBook,
      onRowUpdate: modifyBook,
      onRowDelete: deleteBook,
    }),
    [addBook, deleteBook, modifyBook],
  );

  const bulkAdd = useCallback(
    (e) => {
      const data = new FormData();
      data.append('books', e.target.files[0]);
      poster(BOOKS_ROUTE.POST.MANY(), data, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tableContent}>
          <MaterialTable columns={columns} data={books} title='All books' options={options} editable={editable} />
        </div>
      </Paper>

      <ButtonGroup
        variant='contained'
        color='primary'
        className={classes.btn_group_root}
        aria-label='contained primary button group'
      >
        <Button endIcon={<PlaylistAddIcon />} component='label'>
          Add multiple books
          <input
            type='file'
            name='books'
            className={classes.fileInput}
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            onChange={bulkAdd}
          />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BooksTable;
