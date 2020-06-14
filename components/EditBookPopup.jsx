import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import theme from '../assets/theme';
import InputField from './InputField';

const validationSchema = yup.object({
  code: yup.string().required().max(10).min(2),
  name: yup.string().required().max(70).min(2),
  author: yup.string().required().max(40).min(2),
  publHouse: yup.string().max(50).min(2),
  year: yup.number().max(3000).min(-5000),
  genre: yup.string().max(100).min(2),
  copies: yup.number(),
});

const useStyles = makeStyles({
  paper: { minWidth: 600 },
});

const EditBookPopup = ({
  open = false,
  handleClose = () => {},
  type = 'edit',
  book = null,
  addBook = () => {},
  editBook = () => {},
}) => {
  const classes = useStyles();
  const initialValues = useMemo(() => {
    return (
      book || {
        name: '',
        author: '',
      }
    );
  }, [book]);

  const onSubmit = useCallback(
    async (data, { setSubmitting }) => {
      setSubmitting(true);
      if (type === 'add') addBook(data);

      if (type === 'edit') editBook(data);
      // try {
      //   const response = await Axios.post('/login', data);
      //   if (response && response.status === 200) {
      //     setErrorMessage('');
      //     // TODO: set user to context; response.body
      //     Router.push({
      //       pathname: '/admin',
      //       query: { user: data.username },
      //     });
      //     setSubmitting(false);
      //   } else setErrorMessage('Something went wrong, please try again later.');
      // } catch (error) {
      //   if (error.response)
      //     switch (error.response.status) {
      //       case 401:
      //         setErrorMessage("You don't have access to this page!");
      //         break;
      //       case 404:
      //         setErrorMessage('Invalid username or password!');
      //         break;
      //       default:
      //         setErrorMessage('Something went wrong, please try again later.');
      //         break;
      //     }
      //   else setErrorMessage('Something went wrong, please try again later.');
      // }
      handleClose();
    },
    [addBook, editBook, handleClose, type],
  );
  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{type === 'add' ? 'Add a book' : 'Edit a book'}</DialogTitle>
      <DialogContent>
        <Formik validateOnChange initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form id='edit-book-form'>
              <Grid container direction='column' justify='center' alignItems='center'>
                {isSubmitting ? (
                  <Loader type='MutatingDots' color={theme.palette.primary.main} height={100} width={100} />
                ) : (
                  ''
                )}
                <InputField name='code' placeholder='ID' />
                <InputField name='name' placeholder='Title' />
                <InputField name='author' placeholder='Author' />
                <InputField name='publHouse' placeholder='Publishing House' />
                <InputField name='year' placeholder='Year' type='number' />
                <InputField name='genre' placeholder='Genre' />
                <InputField name='copies' placeholder='No. Of Copies' type='number' />
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button type='submit' form='edit-book-form' variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditBookPopup;
