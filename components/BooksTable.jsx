import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { makeStyles } from '@material-ui/styles';
import Axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import theme from '../assets/theme';
import EditBookPopup from './EditBookPopup';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
  actions_table_cell: { minWidth: 130 },
});

const BooksTable = ({ books, bookAdded, bookUpdated, bookRemoved }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // TODO: maybe useReducer
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('edit');
  const [selectedBook, setSelectedBook] = useState(null);
  const rowsPerPageOptions = useMemo(() => [10, 25, 100], []);

  const tableCellStyle = (column) => ({ minWidth: column.minWidth });

  const columns = useMemo(
    () => [
      { id: 'code', label: 'ID', minWidth: 35 },
      { id: 'name', label: 'Name', minWidth: 250 },
      { id: 'author', label: 'Author', minWidth: 170 },
      { id: 'publHouse', label: 'Publishing House', minWidth: 140 },
      { id: 'year', label: 'Year', minWidth: 70 },
      { id: 'genre', label: 'Genre', minWidth: 100 },
      { id: 'copies', label: 'No. Copies', minWidth: 70 },
    ],
    [],
  );

  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  const handleOpenAddPopup = useCallback(() => {
    setPopupType('add');
    setEditPopupOpen(true);
  }, []);

  const handleOpenEditPopup = useCallback(
    (book) => () => {
      setPopupType('edit');
      setEditPopupOpen(true);
      setSelectedBook(book);
    },
    [],
  );

  const handleCloseEditPopup = useCallback(() => {
    setEditPopupOpen(false);
    setSelectedBook(null);
  }, []);

  const addBook = useCallback(
    async (book) => {
      try {
        const addedBook = await (await Axios.post('/books', book)).data;
        bookAdded(addedBook);
      } catch (e) {
        console.log(e);
      }
    },
    [bookAdded],
  );
  const editBook = useCallback(
    async (book) => {
      try {
        await Axios.put('/books', book);
        bookUpdated(book);
      } catch (e) {
        console.log(e);
      }
    },
    [bookUpdated],
  );

  const deleteBook = useCallback(
    (id) => async () => {
      try {
        await Axios.delete('/books', { data: { id } });
        bookRemoved(books.findIndex((book) => book.id === id));
      } catch (e) {}
    },
    [bookRemoved, books],
  );

  const bookRows = useMemo(() => {
    const rowsData = books.map((book) => {
      const { id, code, name, author, publHouse, year, genre, copies } = book;
      return { id, code, name, author, publHouse, year, genre, copies };
    });
    return rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
      return (
        <TableRow
          hover
          role='checkbox'
          tabIndex={-1}
          key={row.id}
          // style={i % 2 ? { background: 'white' } : { background: theme.palette.grey[100] }}
        >
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number' ? column.format(value) : value}
              </TableCell>
            );
          })}
          <TableCell key='actions'>
            <IconButton onClick={handleOpenEditPopup(row)} aria-label='edit'>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteBook(row.id)} aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  }, [books, columns, deleteBook, handleOpenEditPopup, page, rowsPerPage]);

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tableContent}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={tableCellStyle(column)}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key='actions' className={classes.actions_table_cell}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{bookRows}</TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditBookPopup
        open={editPopupOpen}
        handleClose={handleCloseEditPopup}
        type={popupType}
        book={selectedBook}
        addBook={addBook}
        editBook={editBook}
      />
      <ButtonGroup
        variant='contained'
        color='primary'
        className={classes.btn_group_root}
        aria-label='contained primary button group'
      >
        <Button onClick={handleOpenAddPopup} endIcon={<AddIcon />}>
          Add a book
        </Button>
        <Button endIcon={<PlaylistAddIcon />}>Add multiple books</Button>
      </ButtonGroup>
    </>
  );
};

export default BooksTable;
