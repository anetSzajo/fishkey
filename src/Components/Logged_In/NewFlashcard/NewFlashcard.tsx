import React, {ChangeEvent, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useFirestore, useUser} from "reactfire";
import {Flashcard} from "../../../Modal/Flashcard/Flashcard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    })
)

export default function NewFlashcard(){
    const classes = useStyles();
    const {data: user} = useUser();

    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [answer, setAnswer] = useState('');

    const onQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value)
    }
    const onCategoryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCategory(event.target.value)
    }
    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const db = useFirestore()
        .collection('Flashes')

    const addNewFlashcard = () => {
        const newFlashcard: Flashcard = {
            answer: answer,
            question: question,
            category: category,
            stage: 1,
            uid: user.uid
        }

        db.doc(`flash-${newFlashcard.answer}`)
            .set(newFlashcard)
            .then(x => console.log(newFlashcard))
            .then(r => console.log('Flashcard added!'))
            .catch(err => console.log('Can not add flashcard' + err))
    }

    return (
        <Card className={classes.root}>
            <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
                <CardContent>
                    <TextField
                        required
                        name="category"
                        id="outlined-required"
                        label="Required"
                        defaultValue="Category"
                        variant="outlined"
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onCategoryChange(event)}
                    />
                    <TextField
                        required
                        name="question"
                        id="outlined-required"
                        label="Required"
                        defaultValue="Answer"
                        variant="outlined"
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onQuestionChange(event)}
                    />
                    <TextField
                        required
                        name="answer"
                        id="outlined-required"
                        label="Required"
                        defaultValue="Question"
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
                    <Button size="small" onClick={addNewFlashcard}>Add!</Button>
                </CardActions>
            </form>
            </CardContent>
        </Card>
    );
}