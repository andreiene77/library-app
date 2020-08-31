import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemSecondaryAction,
  Button,
  debounce,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useCallback, useEffect } from 'react';

const useStyles = makeStyles({
  searchBarGrid: {
    height: 100,
  },
  searchBar: { width: '75%' },
  // btn_group_root: {
  //   margin: theme.spacing(1),
  // },
  // paper: { width: '100%' },
  // tableContent: { maxHeight: '80vh', overflow: 'auto' },
  // actions_table_cell: { minWidth: 130 },
});

const Booking = ({ books = [], bookBook }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedBook, setSelectedBook] = useState();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => console.count('rendered'));

  useEffect(() => {
    if (books.filter) {
      const timeOutId = setTimeout(
        () => setFilteredBooks(books.filter((book) => book.name.includes(searchTerm)).slice(0, 30)),
        500,
      );
      return () => clearTimeout(timeOutId);
    }
    return null;
    // if (books.filter) setFilteredBooks(books.filter((book) => book.name.includes(searchTerm)).slice(0, 5));
  }, [books, searchTerm]);

  // useEffect(() => {
  //   if (selectedBook) {
  //     setSearchTerm(`${selectedBook.name} - ${selectedBook.author}`);
  //   }
  // }, [selectedBook]);

  const handleListItemClick = (idx, book) => {
    setSelectedIndex(idx);
    // setSelectedBook(book);
  };

  const changeTerm = useCallback(({ target: { value } }) => {
    setSearchTerm(value);
  }, []);

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
            // helperText='Some important text'
          />
        </Grid>
        <List component='nav' aria-label='secondary mailbox folder'>
          {selectedBook ? (
            <ListItem
              button
              selected
              // onClick={() => handleListItemClick(idx, book)}
            >
              <ListItemText primary={selectedBook.name} secondary={selectedBook.author} />
            </ListItem>
          ) : (
            ''
          )}
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
                    <Button onClick={() => bookBook(book)}>Book it!</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            : ''}
        </List>
      </Container>
    </Box>
  );
};

export default Booking;
