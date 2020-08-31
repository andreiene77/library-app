import { deepOrange, grey, red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: deepOrange,
      secondary: grey,
      error: red,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    status: {
      danger: 'red',
    },
  }),
);

export default theme;
