import React, {ChangeEvent, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from "firebase";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {emailRegex, passwordRegex} from "../../utlis";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
    const emailTextArea = useRef(null);
    const passwordTextArea = useRef(null);
    const repeatedPasswordTextArea = useRef(null);


    const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (emailTextArea.current) {
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [invalidEmailErrorMessage, setEmailErrorMessage] = useState('');
    const [invalidPasswordErrorMessage, setPasswordErrorMessage] = useState('');
    const [invalidConfirmPasswordMessage, setConfirmPasswordErrorMessage] = useState('');

    const handleSignUpForm = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error: any) => console.log(error))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUpForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={invalidEmailErrorMessage ? true : false}
                                helperText={invalidEmailErrorMessage}
                                ref={emailTextArea}
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
                                ref={passwordTextArea}
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
                                ref={repeatedPasswordTextArea}
                                variant="outlined"
                                required
                                fullWidth
                                name="repeatedPassword"
                                label="Repeat Password"
                                type="password"
                                id="repeatedPassword"
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
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/login'>
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}