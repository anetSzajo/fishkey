import {useAuth} from 'reactfire';
import React, {ChangeEvent, FormEvent, useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {emailRegex, passwordRegex} from "../../../utlis";

const useStyles = makeStyles((theme: Theme) => ({
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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function Login() {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();

    const handleSubmitLoginForm = async (event: FormEvent<HTMLFormElement>) => {
        console.log("Login button clicked");
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            alert('loggedin!!!');
        } catch (err) {
            alert('Could not login: ' + err)
        }
        console.log('Logged!')
        history.push('/dashboard');
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
            setPasswordErrorMessage('Password must be between 4 and 8 digits long and include at least one numeric digit.')
        } else if (event.target.value === '') {
            setPasswordErrorMessage('Password is required')
        } else if (!event.target.value.match(passwordRegex)) {
            setPasswordErrorMessage('Password must be between 4 and 8 digits long and include at least one numeric digit.')
            handlePasswordChange(event.target.value)
        } else {
            setPasswordErrorMessage('')
        }
    }

    const [email, handleEmailChange] = useState('');
    const [password, handlePasswordChange] = useState('');
    const [invalidEmailErrorMessage, setEmailErrorMessage] = useState('')
    const [invalidPasswordErrorMessage, setPasswordErrorMessage] = useState('')

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmitLoginForm} >
                    <TextField
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
                    <TextField
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/">
                                "Don't have an account? Register"
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}