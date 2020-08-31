import { Box, Container, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import theme from '../assets/theme';

const styles = {
  formGrid: { minHeight: '90vh' },
};

const Blocked = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box color='text.primary'>
        <Container maxWidth='xs'>
          <Grid container direction='column' justify='center' alignItems='center' style={styles.formGrid}>
            <Typography variant='h2' gutterBottom>
              You are blocked from accessing the Library App
            </Typography>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default React.memo(Blocked);
