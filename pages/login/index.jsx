import { Box, Button, Container, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import theme from '../../assets/theme';
import AuthField from '../../components/AuthField';
import PageLoader from '../../components/PageLoader';

const validationSchema = yup.object({
  username: yup.string().required().max(20).min(4),
  password: yup.string().required().max(20).min(4),
});

const styles = {
  formGrid: { minHeight: '90vh' },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const initialValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    [],
  );

  const onSubmit = useCallback((data, { setSubmitting }) => {
    setSubmitting(true);
    // make async call
    if (data.username === 'admin' && data.password === 'pass') {
      setSubmitting(false);
      Router.push({
        pathname: '/admin',
        query: { user: data.username },
      });
    }
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

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
                    <AuthField name='username' placeholder='username' />
                    <AuthField
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      placeholder='password'
                      InputProps={passwordInputProps}
                    />
                    <Button disabled={isSubmitting} type='submit' variant='contained' color='primary'>
                      submit
                    </Button>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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
