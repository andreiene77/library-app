import { Box, Button, Container, Grid, IconButton, InputAdornment, Snackbar, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Axios from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import theme from '../assets/theme';
import AuthField from '../components/AuthField';
import PageLoader from '../components/PageLoader';
import { actionTypes, useStudentContext } from '../contexts/studentContext';
import { USERS_ROUTE } from '../utils/apiRoutes';

const { INITIALIZE_TOKENS, SET_TOKENS, SET_USER } = actionTypes;

const validationSchema = yup.object({
  username: yup.string().required().max(20).min(4),
  password: yup.string().required().max(20).min(4),
});

const styles = {
  formGrid: { minHeight: '90vh' },
  btn: { marginTop: 7, marginBottom: 8, marginLeft: 75, marginRight: 75 },
};

const Login = () => {
  const [, dispatch] = useStudentContext();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const initialValues = useMemo(() => ({ username: '', password: '' }), []);

  useEffect(() => {
    dispatch({ type: INITIALIZE_TOKENS });
  }, []);

  const handleClose = useCallback(() => setErrorMessage(''), []);

  const onSubmit = useCallback(
    async (data, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await Axios.post(USERS_ROUTE.POST.LOGIN(), data);
        if (response && response.status === 200) {
          const {
            user: { id, username, email, firstName, lastName, phone, isAdmin, blocked },
            refreshToken,
            accessToken,
          } = response.data;
          dispatch({ type: SET_TOKENS, refreshToken, accessToken });
          dispatch({ type: SET_USER, user: { id, username, email, firstName, lastName, phone, isAdmin, blocked } });
          setErrorMessage('');
          if (blocked) {
            router.push({
              pathname: '/blocked',
            });
          } else if (isAdmin)
            router.push({
              pathname: '/admin',
            });
          else
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
    },
    [dispatch, router],
  );

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
      <PageLoader loaded={loaded} loadingText='loading login form' textSize='body1'>
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
                      Login
                    </Typography>
                    <AuthField name='username' placeholder='username' />
                    <AuthField
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      placeholder='password'
                      InputProps={passwordInputProps}
                    />
                    <Grid container direction='column' justify='space-evenly' alignItems='stretch'>
                      <Button
                        disabled={isSubmitting}
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        style={styles.btn}
                      >
                        Submit
                      </Button>
                      <Link href='/register'>
                        <Button variant='contained' color='primary' size='large' style={styles.btn}>
                          Register
                        </Button>
                      </Link>
                    </Grid>
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

export default React.memo(Login);
