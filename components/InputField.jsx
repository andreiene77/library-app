import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

const InputField = ({ type, placeholder, InputProps, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      type={type}
      InputProps={InputProps}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      margin='normal'
      variant='outlined'
      fullWidth
    />
  );
};

export default React.memo(InputField);
