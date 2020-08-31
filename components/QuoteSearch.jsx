import { Container, TextField, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  // btn_group_root: {
  //   margin: theme.spacing(1),
  // },
  // paper: { width: '100%' },
  // tableContent: { maxHeight: '80vh', overflow: 'auto' },
  // actions_table_cell: { minWidth: 130 },
});

const QuoteSearch = ({ actions }) => {
  const classes = useStyles();

  return (
    <Box color='text.primary'>
      <Container maxWidth='xs'>
        <Grid container direction='column' justify='center' alignItems='center' style={{ minHeight: '30vh' }}>
          <TextField
            id='search-bar'
            label='Enter your quote here'
            style={{ width: '100%' }}
            // helperText='Some important text'
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default QuoteSearch;
