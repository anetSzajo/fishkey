import React, {ChangeEvent, useState} from 'react';
import {Route, useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useFirestore, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import GoBackButton from "../GoBackButton/GoBackButton";
import '../../../main.scss';
import Logout from "../Logout/Logout";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            }
        },
    })
)

export default function NewFlashcard() {
    const classes = useStyles();
    const {data: user} = useUser();
    const history = useHistory();

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

    const db = useFirestore()
        .collection('Flashes')

    const addNewFlashcard = () => {
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
            .then(x => console.log(newFlashcard))
            .then(y => history.goBack())
            .catch(err => console.log('Can not add flashcard' + err))
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
                            defaultValue="Category"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onCategoryChange(event)}
                        />
                        <TextField
                            required
                            name="question"
                            id="outlined-required"
                            label="Question"
                            defaultValue="Question"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onQuestionChange(event)}
                        />
                        <TextField
                            required
                            name="answer"
                            id="outlined-required"
                            label="Answer"
                            defaultValue="Answer"
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
                <GoBackButton/>
                <Logout />
            </CardContent>
        </Card>
    );
}