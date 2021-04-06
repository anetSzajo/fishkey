import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {emailRegex, passwordRegex} from "../../../utlis";
import Alert from "../../../SharedComponents/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from 'firebase/app';
import '../../../main.scss';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#F8E16C',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        '& .MuiButton-root': {
            backgroundColor: '#F8E16C',
            margin: '1rem 0 1rem 0',
        },
        '& .MuiButton-root:disabled': {
            backgroundColor: 'lightgrey',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.87)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F8E16C',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#F8E16C',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#F8E16C',
            },
        },
        '&.MuiOutlinedInput-input:focus': {
            background: 'white',
        },
    },
})(TextField);

export default function Login() {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [email, handleEmailChange] = useState('');
    const [password, handlePasswordChange] = useState('');
    const [invalidEmailErrorMessage, setEmailErrorMessage] = useState('')
    const [invalidPasswordErrorMessage, setPasswordErrorMessage] = useState('')

    const isLoginButtonDisabled: boolean = (!email || invalidEmailErrorMessage || !password || invalidPasswordErrorMessage) ? true : false;

    const handleSubmitLoginForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {history.push('/home')})
            .catch((err) => setOpen(true))
    }

    const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        handleEmailChange(event.target.value);
        if (event.target.value !== '' && !event.target.value.match(emailRegex)) {
            setEmailErrorMessage('Invalid email format, e.g.example@example.com')
        } else if (event.target.value === '') {
            setEmailErrorMessage('Email is required')
        } else if (!event.target.value.match(emailRegex)) {
            setEmailErrorMessage('Invalid email format, e.g. example@example.com')
            handleEmailChange(event.target.value)
        } else {
            setEmailErrorMessage('')
        }
    }

    const onPasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        handlePasswordChange(event.target.value);
        if (event.target.value !== '' && !event.target.value.match(passwordRegex)) {
            setPasswordErrorMessage('Password must be between at least 6 digits long and include at least one numeric digit.')
        } else if (event.target.value === '') {
            setPasswordErrorMessage('Password is required')
        } else if (!event.target.value.match(passwordRegex)) {
            setPasswordErrorMessage('Password must be at least 6 digits long and include at least one numeric digit.')
            handlePasswordChange(event.target.value)
        } else {
            setPasswordErrorMessage('')
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div className="loginPage">
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmitLoginForm}>
                        <CssTextField
                            error={invalidEmailErrorMessage ? true : false}
                            helperText={invalidEmailErrorMessage}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onEmailChange(event)}
                        />
                        <CssTextField
                            error={invalidPasswordErrorMessage ? true : false}
                            helperText={invalidPasswordErrorMessage}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onPasswordChange(event)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="button form-btn"
                            disabled={isLoginButtonDisabled}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/register">
                                    "Don't have an account? Register"
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                <Alert onClose={handleClose} severity="error">
                    Login or password are incorrect. Try again.
                </Alert>
            </Snackbar>
        </div>
    );
}