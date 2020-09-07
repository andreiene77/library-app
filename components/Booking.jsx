import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useEffect, useState } from 'react';

const useStyles = makeStyles({
  searchBarGrid: {
    height: 100,
  },
  searchBar: { width: '75%' },
});

const Booking = ({ books = [], bookBook, setPage }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedBook, setSelectedBook] = useState();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleListItemClick = async (idx, book) => {
    setSelectedIndex(idx);
    setSelectedBook(book);
  };

  const changeTerm = useCallback(({ target: { value } }) => {
    setSearchTerm(value);
  }, []);

  const handleClickOpen = (idx, book) => {
    handleListItemClick(idx, book);
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const agree = useCallback(() => {
    setOpen(false);
    setSearchTerm('');
    bookBook(selectedBook, selectedDate);
    setPage('Actions');
  }, [bookBook, selectedBook, selectedDate, setPage]);

  useEffect(() => {
    if (books.filter) {
      const timeOutId = setTimeout(
        () => setFilteredBooks(books.filter((book) => book.name.includes(searchTerm)).slice(0, 30)),
        500,
      );
      return () => clearTimeout(timeOutId);
    }
    return null;
  }, [books, searchTerm]);

  const isDateBlocked = useCallback(() => {
    if (selectedBook) {
      const blockedBooks = selectedBook.blockedBooks || new Map();
      if (blockedBooks.get) {
        if (blockedBooks.get(selectedDate.toDateString()) >= (selectedBook.copies || 1)) return true;
      } else if (blockedBooks[selectedDate.toDateString()] >= (selectedBook.copies || 1)) return true;

      return false;
    }
    return true;
  }, [selectedBook, selectedDate]);

  return (
    <Box color='text.primary'>
      <Container maxWidth='md'>
        <Grid container direction='column' justify='center' alignItems='center' className={classes.searchBarGrid}>
          <TextField
            id='search-bar'
            label='Search the book'
            className={classes.searchBar}
            value={searchTerm}
            onChange={changeTerm}
          />
        </Grid>
        <List component='nav' aria-label='secondary mailbox folder'>
          {searchTerm
            ? filteredBooks.map((book, idx) => (
                <ListItem
                  key={book.id}
                  button
                  selected={selectedIndex === idx}
                  onClick={() => handleListItemClick(idx, book)}
                >
                  <ListItemText primary={book.name} secondary={book.author} />
                  <ListItemSecondaryAction>
                    <Button onClick={() => handleClickOpen(idx, book)}>Book it!</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            : ''}
        </List>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Are you sure you want to make a booking for this book?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              After agreeing you will send a booking request to an admin. He reserves the right do decline your request,
              but if no further notice you have to pick up your book on the set date.
            </DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label='Select a prefered date'
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
                error={isDateBlocked()}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Disagree
            </Button>
            <Button onClick={agree} color='primary' autoFocus disabled={isDateBlocked()}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Booking;
