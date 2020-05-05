import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { orange, lightBlue, red, deepOrange, grey } from '@material-ui/core/colors'

const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: deepOrange,
            secondary: grey,
            error: red,
            contrastThreshold: 3,
            tonalOffset: 0.2
        },
        status: {
            danger: 'red'
        }
    })
)

export default theme
