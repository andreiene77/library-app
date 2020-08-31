import { Box, Button, Container, Grid, IconButton, InputAdornment, Snackbar, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import theme from '../assets/theme';
import AuthField from '../components/AuthField';
import PageLoader from '../components/PageLoader';
import { actionTypes, useStudentContext } from '../contexts/studentContext';
import { USERS_ROUTE } from '../utils/apiRoutes';

const { SET_TOKENS, SET_USER } = actionTypes;

const validationSchema = yup.object({
  username: yup.string().required().max(20).min(4),
  password: yup.string().required().max(20).min(4),
  email: yup.string().required().max(70).min(5).email(),
  firstName: yup.string().max(70).min(2),
  lastName: yup.string().max(70).min(2),
});

const styles = {
  formGrid: { minHeight: '90vh' },
};

const Register = () => {
  const [, dispatch] = useStudentContext();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const initialValues = useMemo(
    () => ({
      username: '',
      password: '',
      email: '',
    }),
    [],
  );
  const handleClose = useCallback(() => setErrorMessage(''), []);

  const onSubmit = useCallback(async (data, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await Axios.post(USERS_ROUTE.POST.REGISTER(), data);

      if (response && response.status === 200) {
        const {
          user: { id, username, email, firstName, lastName, phone, isAdmin },
          refreshToken,
          accessToken,
        } = response.data;
        dispatch({ type: SET_TOKENS, refreshToken, accessToken });
        dispatch({ type: SET_USER, user: { id, username, email, firstName, lastName, phone, isAdmin } });

        setErrorMessage('');
        router.push({
          pathname: '/student',
        });
        setSubmitting(false);
      } else setErrorMessage('Something went wrong, please try again later.');
    } catch (error) {
      if (error.response)
        switch (error.response.status) {
          case 401:
            setErrorMessage("You don't have access to this page!");
            break;
          case 404:
            setErrorMessage('Invalid username or password!');
            break;
          default:
            setErrorMessage('Something went wrong, please try again later.');
            break;
        }
      else setErrorMessage('Something went wrong, please try again later.');
    }
  }, []);

  const toggleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  const passwordInputProps = {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton aria-label='toggle password visibility' onClick={toggleShowPassword}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  };
  return (
    <ThemeProvider theme={theme}>
      <PageLoader loaded={loaded} loadingText='loading register form' textSize='body1'>
        <Box color='text.primary'>
          <Container maxWidth='xs'>
            <Formik
              validateOnChange
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container direction='column' justify='center' alignItems='center' style={styles.formGrid}>
                    {isSubmitting ? (
                      <Loader type='MutatingDots' color={theme.palette.primary.main} height={100} width={100} />
                    ) : (
                      ''
                    )}
                    <Typography variant='h2' gutterBottom>
                      Register
                    </Typography>
                    <AuthField name='username' placeholder='username' />
                    <AuthField
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      placeholder='password'
                      InputProps={passwordInputProps}
                    />
                    <AuthField name='email' placeholder='Email' />
                    <AuthField name='firstName' placeholder='First Name' />
                    <AuthField name='lastName' placeholder='Last Name' />
                    <Button disabled={isSubmitting} type='submit' variant='contained' color='primary' size='large'>
                      Submit
                    </Button>
                    <Snackbar
                      open={!!errorMessage}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={errorMessage}
                    />
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </Box>
      </PageLoader>
    </ThemeProvider>
  );
};

export default React.memo(Register);
