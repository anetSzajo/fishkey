import React, {ChangeEvent, useState} from 'react';
import {useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useFirestore, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import Snackbar from '@material-ui/core/Snackbar';
import GoBackButton from "../GoBackButton/GoBackButton";
import Logout from "../Logout/Logout";
import Alert from "../../../SharedComponents/Alert/Alert";
import '../../../main.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            "& .Mui-focused": {
                border: "red",
                outline: "green"
            },
            "& .MuiOutlinedInput-notchedOutline": {
                outline: "none"
            },
        },
    })
)


export default function NewFlashcard() {
    const classes = useStyles();
    const {data: user} = useUser();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [answer, setAnswer] = useState('');

    const onQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value)
    }
    const onCategoryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCategory(event.target.value.toUpperCase())
    }
    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const db = useFirestore()
        .collection('Flashes')

    const addNewFlashcard = () => {
        if (!category || !question || !answer) {
            return setOpen(true);
        } else {
            const newFlashcard: FlashcardModel = {
                answer: answer,
                question: question,
                category: category,
                stage: 1,
                uid: user.uid,
                isActive: true
            }

            db.doc()
                .set(newFlashcard)
                .then(() => history.goBack())
                .catch(err => console.log('Can not add flashcard' + err))
        }
    }

    return (
        <Card className={classes.root}>
            <CardContent className="addNewFlashcard__container">
                <h1>New Flashcard</h1>
                <form noValidate autoComplete="off" className="addNewFlashcard__form">
                    <CardContent>
                        <TextField
                            required
                            name="category"
                            id="outlined-required"
                            label="Category"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onCategoryChange(event)}
                        />
                        <TextField
                            required
                            name="question"
                            id="outlined-required"
                            label="Question"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onQuestionChange(event)}
                        />
                        <TextField
                            required
                            name="answer"
                            id="outlined-required"
                            label="Answer"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onAnswerChange(event)}
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="stage"
                            defaultValue="1"
                            variant="outlined"
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="small" className="button-small add-btn" onClick={addNewFlashcard}>Add</Button>
                    </CardActions>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                    <Alert onClose={handleClose} severity="warning">
                       Fill all required fields with * and submit.
                    </Alert>
                </Snackbar>
                <GoBackButton/>
                <Logout />
            </CardContent>
        </Card>
    );
}