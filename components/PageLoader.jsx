import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme, Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const PageLoader = ({ children = '', loaded, loadingText, textSize = 'h2' }) => {
  const theme = useTheme();

  return loaded ? (
    children
  ) : (
    <div className='fullscreen'>
      <CssBaseline />
      <style jsx>
        {`
          .fullscreen {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: ${theme.palette.background.paper};
          }
        `}
      </style>
      <Loader type='MutatingDots' color={theme.palette.primary.main} height={100} width={100} />
      <Typography variant={textSize} component={textSize}>
        {loadingText}
      </Typography>
    </div>
  );
};

export default PageLoader;
