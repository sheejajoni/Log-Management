import { useIntl } from 'react-intl'
import PreAuthPage from '../PreAuthPage'
import React, {useState, useContext} from 'react';
import Auth from '../../utils/auth';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RepeatIcon from '@material-ui/icons/Repeat';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Formik, isEmptyArray} from 'formik';
import axios from '../../utils/axios'
import * as Yup from 'yup';
import IconButton from "@material-ui/core/IconButton";
import { UserContext} from "../../context/user-context";
import {useHistory, Redirect} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Icon from "@material-ui/core/Icon";
import CheckIcon from '@material-ui/icons/Check';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';
import ErrorMessage from '../../components/ErrorMessage'
import PrivacyPolicyDeclined from '../successPages/PrivacyPolicyDeclined';


const useStyles = makeStyles((theme) => ({
        paper: {
            width: 'auto',
            marginLeft: theme.spacing(3),
            color: theme.palette.grey.dark,
            marginRight: theme.spacing(3),
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '62%',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            marginTop: theme.spacing(8),
            // marginBottom: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
        },
        modalPaper: {
            width: '980px',
            height: '660px',
            backgroundColor: 'white',
            outline: 0,
            [theme.breakpoints.down('md')]: {
                width: '640px',
                height: '660px',
            },
            [theme.breakpoints.down('xs')]: {
                width: '320px',
                height: '500px',
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 0,
            border: '0px'
        },
        modalHeader: {
            width: '100%',
            height: theme.spacing(4),
            borderRadius: 0,
        },
        modalIcon: {
            float: 'right',
            color: theme.palette.primary.main,
            margin: theme.spacing(1),
            fontSize: '36px',
        },
        modalBody: {
            textAlign: 'center',
            padding: theme.spacing(6),
            paddingTop: theme.spacing(4),
            color: theme.palette.grey.dark,
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(3),
            },
        },
        agreement: {
            height: '450px',
            width: '100%',
            borderStyle: 'solid',
            borderColor: theme.palette.grey.main,
            borderWidth: '1px',
            borderRadius: '4px',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3),
            overflow: 'scroll',
            [theme.breakpoints.down('md')]: {
                height: '400px',
            },
            [theme.breakpoints.down('xs')]: {
                height: '300px',
            },
        },
        modalButtons: {
            textAlign: 'left',
        },
        modalSubmit: {
            backgroundColor: theme.palette.primary.main,
            marginRight: theme.spacing(2),
        },
        modalCancel: {
            color: theme.palette.primary.main,
            borderWidth: '2px',
            '&:hover': {
                borderWidth: '2px',
            }
        },
        title: {
            color: theme.palette.grey.darkest,
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(4),
            textAlign: 'center',
        },

        titletext: {
            color: theme.palette.grey.darkest,
                  },

        privacyheading:{
            color: theme.palette.grey.darkest

        },
        helperText: {
            fontFamily: 'Gilroy-Medium'
        },
        avatar: {
            margin: theme.spacing(1),
            width: 192,
            height: 192,
            color: theme.palette.secondary.main,
        },
        form: {
            marginTop: theme.spacing(1),
            width: '100%',
        },
        submit: {
            margin: theme.spacing(4, 0, 6),
            height: '80px',
            fontSize: '1.5rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.25rem',
                lineHeight: 'normal'
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.125rem',
                height: '3.5rem',
            },
        },
        submitIcon: {
            fontSize: '40px',
            marginRight: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.5rem',
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
            width: '85%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        margin: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        icons: {
            color: theme.palette.grey.main,
            fontSize: '2.5rem',
            marginRight: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.5rem',
            },
        },
        iconsPassword: {
            color: theme.palette.grey.main,
            fontSize: '2.5rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.5rem',
            },
        },
        formLabels: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '14px'
        },
        selectedCheckControl: {
            color: theme.palette.secondary.main,
            fontWeight: 700,
        },
        checkControl: {
            fontWeight: 700,
            color: theme.palette.grey.main,
        },
        selectedCheckBox: {
            color: theme.palette.secondary.main,
        },
        radios: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(2),
        },
        bottomForm: {
            marginTop: theme.spacing(0),
            width: '100%',
            textAlign: 'center',
            marginBottom: theme.spacing(0),
        },
        iframe: {
            borderStyle: 'none',
        },
        textInput: {
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(2),
            },
        }
    }))


const Signup = () => {
    const classes = useStyles()
    const intl = useIntl()
    const [formErrors] = useState([]);
    const [profile] = useContext(UserContext);
    // const [type, setType] = useState("patient")
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [policyDeclined, setPolicyDeclined] = useState(false)
    const [user, setUser] = useState(false)
    const [error, setError] = useState(false)

    const handleCloseError = () => {
        setError(false)
    }

    const handleClosePolicyDeclined = () => {
        setPolicyDeclined(false)
    }

    const handleClosePrivacy = () => {
        setOpen(false)
        setPolicyDeclined(true)
    }

    if (policyDeclined) {
        return (
            <PrivacyPolicyDeclined closePolicyDeclined={handleClosePolicyDeclined} />
    )
    }

    const PrivacyPolicy = () => {
        try {
            // There still may be a way to make this faster
            return (
                <iframe className={classes.iframe} src="https://www.ongev.com/privacy.html" height='100%' width='100%' title='privacy policy'/>
        )
        } catch {
            return (
                <Typography variant='h4'>
                Unable to load privacy policy
            </Typography>
        )
        }
    }

    // const handleChangeType = (e) => {
    //     setType(e.target.name)
    // }

    const handleAcceptPrivacy = () => {
        // const dateAcceptedPrivacy = new Date()

        // console.log(dateAcceptedPrivacy)
        console.log(user)

        new Auth().createUser(user)
            .then((profile) => {
            // dispatch({type: 'sign up', payload: profile});
            history.push("/verification/sent", {email: user.email});
    })
    .catch((error) => {
            // setFormErrors([error.message])
            if (!error.response) {
            setError({message: 'Unable to connect to server'})
        }
    else if (error.response.data.error === 'user already exists') {
            setError({message: 'An account already exists for that email address'})
        } else {
            setError({message: 'Unable to register new account'})
        }
        setOpen(false)
    })
    }

    return (
    (profile.authenticated ? <Redirect to={"/dashboard"} /> :
<PreAuthPage pageTitle={intl.formatMessage({ id: 'sign_in' })}>
<Paper className={classes.paper} elevation={1}>
        <div className={classes.container}>
<Typography component="h1" variant="h1" className={classes.title}>
    {intl.formatMessage({ id: 'create_account' })}
</Typography>
    <Typography component={"h1"}>
        {!isEmptyArray(formErrors) &&
    <Alert severity={"error"}>{formErrors[0]}</Alert>
}
</Typography>
    <Formik
    enableReinitialize
    initialValues={{name: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        // jira:-251
        repeatPassword: false,
    }}
    onSubmit={(values, { setSubmitting }) => {
        setError(false);
        const source = axios.CancelToken.source()
        axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/auth/validate-user/' +values.email,
            {
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
                cancelToken: source.token,
            })
            .then((response) => {
            console.log("aadsd----"+response.data);
        setUser({
            firstName: (values.name.split(" "))[0],
            lastName: (values.name.split(" "))[1],
            email: values.email,
            password: values.password
        })

        setOpen(true)
        setSubmitting(false)
    })
    .catch((error) => {
            if(error.response.data.detail==='Username already exists'){
            setError({message: 'An account already exists for that email address'})
        }
        /*if (error.response && error.response.data === 'Token is expired') {
         console.log('Token is expired')
         dispatch(({type: 'token expired'}))
         history.push("/signin", {ongevRoute: "/diagnosis/information"})
         }*/
        console.log('Error--- ', error.response)
    })
        return () => {
            source.cancel()
        }
    }}
    validationSchema={Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Required'),
        name: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(8, intl.formatMessage({id: 'password_minimum'}))
            .required('Required'),
        confirmPassword: Yup.string()
            .required(intl.formatMessage({id: 'confirm_password'}))
            .oneOf([Yup.ref("password")], intl.formatMessage({id: 'password_no_match'}))
    })}
>
    {(props) => {
        const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            } = props;
        return (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <ErrorMessage errors={error} handleClose={handleCloseError} />
            <div className={classes.formLabels}>
    <Typography variant="subtitle2" >
            Your Full Name
        </Typography>
        <Typography variant="body1" >
            Required
            </Typography>
            </div>
            <TextField
        value={values.name}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        className={classes.textInput}
        placeholder='First name and last name'
        required
        fullWidth
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <AccountCircle className={classes.icons}/>
        </InputAdornment>
        )
        }}
        name="name"
        autoComplete="name"
        error={errors.name && touched.name}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        helperText={(touched.name && errors.name) ? errors.name : "" }

    />
    <div className={classes.formLabels}>
    <Typography variant="subtitle2" >
            Your Email
        </Typography>
        <Typography variant="body1" >
            Required
            </Typography>
            </div>
            <TextField
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        className={classes.textInput}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        placeholder='(e.g. yourname@mail.com)'
        required
        fullWidth
        id="email"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"}>
                <EmailIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
        name="email"
        autoComplete="email"
        error={errors.email && touched.email}
        helperText={(errors.email && touched.email) ? errors.email : ""}
    />
    <div className={classes.formLabels}>
    <Typography variant="subtitle2" >
            Your Password
        </Typography>
        <Typography variant="body1" >
            Required
            </Typography>
            </div>
            <TextField
        id="password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        error={errors.password && touched.password}
        helperText={(errors.password && touched.password) ? errors.password : ""}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        className={classes.textInput}
        placeholder='Must contain at least 8 characters'
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        required
        fullWidth
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"} >
                <VpnKeyIcon className={classes.icons}/>
        </InputAdornment>,
                endAdornment:
        <InputAdornment
            position={"end"}
            className={classes.icons}
            edge={"end"}
            aria-label={"Toggle password visibility"}
                >
                <IconButton
            onClick={() => setFieldValue("showPassword", !values.showPassword)}

            color={"inherit"}>{values.showPassword ? <Visibility className={classes.iconsPassword}/> : <VisibilityOff className={classes.iconsPassword}/>}
        </IconButton>
            </InputAdornment>,
        }}
        autoComplete="current-password"
            />
            <div className={classes.formLabels}>
    <Typography variant="subtitle2" >
            Repeat Password
        </Typography>
        <Typography variant="body1" >
            Required
            </Typography>
            </div>
            <TextField
        id="confirmPassword"
        type={values.repeatPassword ? "text" : "password"}
        value={values.confirmPassword}
        error={errors.confirmPassword && touched.confirmPassword}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        helperText={(errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : "")}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        required
        fullWidth
        name="confirmPassword"
        className={classes.textInput}
        placeholder='Retype the password above'
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"} >
                <RepeatIcon className={classes.icons}/>
        </InputAdornment>,
                endAdornment:
        <InputAdornment
            position={"end"}
            className={classes.icons}
            edge={"end"}
            aria-label={"Toggle password visibility"}
                >
                <IconButton
            onClick={() => setFieldValue("repeatPassword", !values.repeatPassword)}

            color={"inherit"}>{values.repeatPassword ? <Visibility className={classes.iconsPassword}/> : <VisibilityOff className={classes.iconsPassword}/>}
        </IconButton>
            </InputAdornment>,
        }}
    />

        {/* <Typography component="h1" variant="subtitle2" >
         How would you describe your needs?
         </Typography>
         <div className={classes.radios}>
         <FormControlLabel
         control={<Radio checked={type === 'patient'} onChange={handleChangeType} className={type === 'patient' ? classes.selectedCheckBox : classes.checkBox} name="patient" color='secondary' />}
         label="I'm a patient and I want to find help"
         classes={{ label: type === 'patient' ? classes.selectedCheckControl : classes.checkControl}}
         />
         <FormControlLabel
         control={<Radio checked={type === 'helper'} onChange={handleChangeType} className={type === 'helper' ? classes.selectedCheckBox : classes.checkBox} name="helper" color='secondary' />}
         label="I'm helping to provide care"
         classes={{ label: type === 'helper' ? classes.selectedCheckControl : classes.checkControl}}
         />
         <FormControlLabel
         control={<Radio checked={type === 'doctor'} onChange={handleChangeType} className={type === 'doctor' ? classes.selectedCheckBox : classes.checkBox} name="doctor" color='secondary' />}
         label="I'm a physician"
         classes={{ label: type === 'doctor' ? classes.selectedCheckControl : classes.checkControl}}
         />
         </div> */}


        {/* Privacy policy pop up modal */}
    <Modal
        disableEnforceFocus
        open={open}
        onClose={handleClosePrivacy}
        className={classes.modal}
    >
    <div className={classes.modalPaper}>
    <div className={classes.modalHeader}>
    <Icon><CloseIcon className={classes.modalIcon} onClick={handleClosePrivacy}/></Icon>
            </div>
            <div className={classes.modalBody}>
    <Typography component={"h3"} variant={"h3"} className={classes.privacyheading}>
        Privacy Agreement
        </Typography>

        <div className={classes.agreement}>
    <PrivacyPolicy/>
        </div>

        <div className={classes.modalButtons}>
    <Button
        type={"button"}
        variant="contained"
        className={classes.modalSubmit}
        color="primary"
        onClick={handleAcceptPrivacy}

            >
            <Typography variant={"button"} >
            AGREE TO TERMS
        </Typography>

        </Button>
        <Button
        type={"button"}
        variant="outlined"
        color= 'primary'
        className={classes.modalCancel}

        onClick={handleClosePrivacy}
            >
            <Typography variant={"button"} >
            CANCEL
            </Typography>
            </Button>
            </div>
            </div>
            </div>
            </Modal>

            <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
            >{/*<PersonAddIcon className={classes.submitIcon}/>*/}
            <Typography
        variant={"button"}

            >
            CREATE YOUR ACCOUNT
        </Typography>
        </Button>
        </form>
    );
    }}
</Formik>
    </div>
    </Paper>

    <div className={classes.paper} >
<div className={classes.container}>
<form className={classes.bottomForm}>
<Typography component="h2" variant="h2" className={classes.titletext} >
        {intl.formatMessage({ id: 'already_have_account' })}
</Typography>
    <Button
    type={"button"}
    fullWidth
    variant={"outlined"}
    color={"primary"}
    href={"/signin"}
    className={classes.submit}
>
    {/*<ExitToAppIcon className={classes.submitIcon}/>*/}

<Typography
    variant={"button"}

        >
        LOGIN NOW
    </Typography>
    </Button>
    </form>
    </div>
    </div>

    </PreAuthPage>
)
)
}

export default Signup