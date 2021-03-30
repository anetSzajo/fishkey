import React, {ChangeEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import firebase from 'firebase/app';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {emailRegex, passwordRegex} from "../../../utlis";
import '../../../main.scss';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../../SharedComponents/Alert/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontColor: 'white',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#FB8F67',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Register() {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidEmailErrorMessage, setEmailErrorMessage] = useState('');
    const [invalidPasswordErrorMessage, setPasswordErrorMessage] = useState('');
    const [invalidConfirmPasswordMessage, setConfirmPasswordErrorMessage] = useState('');

    const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(event.target.value);
        if (event.target.value !== '' && !event.target.value.match(emailRegex)) {
            setEmailErrorMessage('Invalid email format, e.g.example@example.com')
        } else if (event.target.value === '') {
            setEmailErrorMessage('Email is required')
        } else if (!event.target.value.match(emailRegex)) {
            setEmailErrorMessage('Invalid email format, e.g. example@example.com')
            setEmail(event.target.value);
        } else {
            setEmailErrorMessage('')
        }
    }

    const onPasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(event.target.value)
        if (event.target.value.match(passwordRegex)) {
            setPasswordErrorMessage('')
        } else if (event.target.value === '') {
            setPasswordErrorMessage('Password is required')
        } else {
            setPasswordErrorMessage('Password must be between 4 and 8 digits long and include at least one numeric digit.')
        }
    }

    const onConfirmPasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setConfirmPassword(event.target.value)
        if (password && password === event.target.value) {
            setConfirmPasswordErrorMessage('')
        } else {
            setConfirmPasswordErrorMessage('Passwords do not match')
        }
    }


    const handleSubmitRegisterForm = () => {
        if (email && password && confirmPassword) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, confirmPassword)
                .catch((error: any) => console.log(error))
            history.push('/login');
        }
        else {
            setOpen(true);
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="registerPage">
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmitRegisterForm}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={invalidEmailErrorMessage ? true : false}
                                    helperText={invalidEmailErrorMessage}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onEmailChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={invalidPasswordErrorMessage ? true : false}
                                    helperText={invalidPasswordErrorMessage}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={onPasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={invalidConfirmPasswordMessage ? true : false}
                                    helperText={invalidConfirmPasswordMessage}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Repeat Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onConfirmPasswordChange(event)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="button form-btn register-btn"
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/login'>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                <Alert onClose={handleClose} severity="warning">
                    Fill all required fields with * and submit.
                </Alert>
            </Snackbar>
        </div>
    );
}