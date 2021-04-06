import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    filledError: {
        width: '90vw',
        background: '#FB8F67',
        position: 'relative',
        bottom: '6vh'
    }
}));
export default function Alert(props: AlertProps) {
    const classes = useStyles();

    return <MuiAlert className={classes.filledError} elevation={6} variant="filled" {...props} />;
}