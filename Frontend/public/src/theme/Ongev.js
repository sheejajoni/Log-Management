import { createMuiTheme} from "@material-ui/core/styles";
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

const palette = {
    primary: {
        pale: '#EEEFF6',
        light: '#C6CBE1',
        main: '#43579C',
        dark: '#1E347E',
        darkest: '#1B2A5E',
        contrastText: '#fff',
    },
    secondary: {
        pale: '#FCF6E5',
        light: '#EDE0BE',
        main: '#D09B3F',
        dark: '#A3772C',
        darkest: '#765E34',
        contrastText: '#fff',
    },
    tertiary: {
        pale: '#F8DDD8',
        light: '#F59280',
        main: '#DF4B31',
        dark: '#B22F18',
        darkest: '#861905',
        contrastText: '#fff',
    },
    grey: {
        pale: '#F2F2F2',
        light: '#E0DEE1',
        main: '#C1BFC3',
        dark: '#4E5B66',
        darkest: '#1C242B',
        contrastText: '#fff',
    },
    error: {
        light: '#ECB5B5',
        main: '#D52626',
        dark: '#810303',
    }
}

const theme = createMuiTheme({
    props: {
        MuiTooltip: {
            // enterTouchDelay: 0,
            // leaveTouchDelay: 500,
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: 'PMackinacProMedium',
        body1: {
            fontFamily: 'Gilroy-Medium',
            fontWeight: 500,
            fontSize: '16pt',
            lineHeight: '22pt',
            '@media (max-width:600px)': {
                fontSize: '0.875rem'
            },
            [breakpoints.down('xs')]: {
                fontSize: '0.6rem',
                lineHeight: '1rem'
            },
        },
        h1: {
            fontWeight: 500,
            fontFamily: 'PMackinacProMedium',
            fontSize: '40pt',
            lineHeight: '48pt',
            '@media (max-width:600px)': {
                fontSize: '2.4rem'
            },
            '@media (max-width:480px)': {
                fontSize: '2rem'
            }
        },
        h2: {
            fontWeight: 500,
            fontFamily: 'PMackinacProMedium',
            fontSize: '36pt',
            lineHeight: '44pt',
            '@media (max-width:600px)': {
                fontSize: '1.8rem'
            },
            '@media (max-width:480px)': {
                fontSize: '1.5rem'
            }
        },
        h3: {
            fontWeight: 500,
            fontFamily: 'PMackinacProMedium',
            fontSize: '24pt',
            lineHeight: '30pt',
            '@media (max-width:600px)': {
                fontSize: '1.5rem'
            },
            '@media (max-width:480px)': {
                fontSize: '1.3rem'
            }
        },
        h4: {
            fontWeight: 500,
            fontFamily: 'PMackinacProMedium',
            fontSize: '20pt',
            lineHeight: '24pt',
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            }
        },
        h5: {
            fontWeight: 500,
            fontFamily: 'Gilroy-Medium',
            fontSize: '18pt',
            lineHeight: '24pt',
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            }
        },
        h6: {
            fontWeight: 600,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: '13pt',
            lineHeight: '24pt',
            '@media (max-width:600px)': {
                fontSize: '1rem'
            }
        },

        button: {
            fontWeight: 600,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: '14pt',
            boxShadow: 'none !important',
            letterSpacing:'1.4px'
        },

        body2: {
            fontWeight: 500,
            fontFamily: 'Gilroy-Medium, sans-serif',
            fontSize: '18pt',
            lineHeight: '24pt',
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            }
        },

        // Radio and Checkbox Label
        subtitle1: {
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: 1.33,
            '@media (max-width:600px)': {
                fontSize: '1rem'
            }
        },
        // Input Labels
        subtitle2: {
            fontWeight: 700,
            fontSize: '1.5rem',
            fontFamily: 'Gilroy-SemiBold',
            lineHeight: 1,
            '@media (max-width:600px)': {
                fontSize: '1.2rem'
            },
            [breakpoints.down('xs')]: {
                fontSize: '1rem',
            },
        }
    },
    palette: palette,
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 700,
                '@media (max-width:600px)': {
                    fontSize: '0.6rem'
                }
            },
            containedPrimary: {
                color: palette.primary.contrastText,
                backgroundColor: palette.primary.main,
                '&:hover': {
                    backgroundColor: palette.primary.dark,
                },
                '&$disabled': {
                    backgroundColor: palette.primary.pale,
                    color: palette.primary.contrastText
                }
            },
            containedSecondary: {
                color: palette.secondary.contrastText,
                backgroundColor: palette.secondary.main,
                '&:hover': {
                    backgroundColor: palette.secondary.dark,
                },
                '&$disabled': {
                    backgroundColor: palette.secondary.pale,
                    color: palette.secondary.contrastText,
                }
            },
            outlinedPrimary: {
                color: palette.primary.main,
                borderColor: palette.primary.main,
                borderWidth: '2px',
                '&:hover': {
                    backgroundColor: palette.primary.pale,
                    color: palette.primary.dark,
                    borderColor: palette.primary.dark,
                    borderWidth: '2px',
                },
                '&$disabled': {
                    backgroundColor: palette.primary.contrastText,
                    color: palette.primary.pale,
                    borderColor: palette.primary.pale,
                }
            },
            outlinedSecondary: {
                color: palette.secondary.main,
                borderColor: palette.secondary.main,
                borderWidth: '2px',
                '&:hover': {
                    backgroundColor: palette.secondary.pale,
                    color: palette.secondary.dark,
                    borderColor: palette.secondary.dark,
                    borderWidth: '2px',
                },
                '&$disabled': {
                    backgroundColor: palette.secondary.contrastText,
                    color: palette.secondary.pale,
                    borderColor: palette.secondary.pale,
                }
            },
        },
        MuiTextField: {
            root: {
                marginTop: '8px',
                marginBottom: '48px',
                height: '3.75rem',
                [breakpoints.down('xs')]: {
                    marginBottom: '1rem',
                },
            },
        },
        MuiInputBase: {
            root: {
                // height: '3.75rem'
            },
            input: {
                color: palette.grey.dark,
                fontSize: '1.5rem',
                '@media (max-width: 600px)': {
                    fontSize: '1rem'
                },
                [breakpoints.down('xs')]: {
                    fontSize: '.9rem'
                },
            },
        },
        MuiFormHelperText: {
            root: {
                '&$error': {
                    position: 'absolute',
                    top: '4rem',
                },
            }
        },
        MuiTooltip: {
            tooltip: {
                fontSize: '1rem',
                padding: '1rem',
            },
        },
    },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    }
});

export default theme;
