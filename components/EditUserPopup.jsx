import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import theme from '../assets/theme';
import InputField from './InputField';

const validationSchema = yup.object({
  username: yup.string().required().max(70).min(3),
  email: yup.string().required().max(70).min(5).email(),
  firstName: yup.string().max(70).min(2),
  lastName: yup.string().max(70).min(2),
});

const useStyles = makeStyles({
  paper: { minWidth: 600 },
});

// TODO: combine with book popup
const EditUserPopup = ({
  open = false,
  handleClose = () => {},
  type = 'edit',
  user = null,
  addUser = () => {},
  editUser = () => {},
}) => {
  const classes = useStyles();
  const initialValues = useMemo(() => {
    return (
      user || {
        name: '',
        email: '',
      }
    );
  }, [user]);

  const onSubmit = useCallback(
    async (data, { setSubmitting }) => {
      setSubmitting(true);
      if (type === 'add') addUser(data);

      if (type === 'edit') editUser(data);
      handleClose();
    },
    [addUser, editUser, handleClose, type],
  );
  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{type === 'add' ? 'Add a user' : 'Edit a user'}</DialogTitle>
      <DialogContent>
        <Formik validateOnChange initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form id='edit-user-form'>
              <Grid container direction='column' justify='center' alignItems='center'>
                {isSubmitting ? (
                  <Loader type='MutatingDots' color={theme.palette.primary.main} height={100} width={100} />
                ) : (
                  ''
                )}
                <InputField name='username' placeholder='Username' />
                <InputField name='email' placeholder='Email' />
                <InputField name='firstName' placeholder='First Name' />
                <InputField name='lastName' placeholder='Last Name' />
                <FormControlLabel control={<Switch name='isAdmin' color='primary' />} label='Is Admin' />
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button type='submit' form='edit-user-form' variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditUserPopup;
