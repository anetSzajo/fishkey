import React, {ChangeEvent, useState} from 'react';
import {useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, withStyles, Theme} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useFirestore, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import GoBackButton from "../GoBackButton/GoBackButton";
import Logout from "../Logout/Logout";
import '../../../main.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            '& .MuiCardContent-root':{
                display: 'flex',
                flexDirection: 'column',
            }
    }})
)

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
    },
})(TextField);


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
            .then(() => history.goBack())
            .catch(err => console.log('Can not add flashcard' + err))
    }

    return (
        <Card className={classes.root}>
            <CardContent className="addNewFlashcard__container">
                <h1>New Flashcard</h1>
                <form noValidate autoComplete="off" className="addNewFlashcard__form">
                    <CardContent>
                        <CssTextField
                            required
                            name="category"
                            id="outlined-required"
                            label="Category"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onCategoryChange(event)}
                        />
                        <CssTextField
                            required
                            name="question"
                            id="outlined-required"
                            label="Question"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onQuestionChange(event)}
                        />
                        <CssTextField
                            required
                            name="answer"
                            id="outlined-required"
                            label="Answer"
                            variant="outlined"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onAnswerChange(event)}
                        />
                        <CssTextField
                            disabled
                            id="outlined-disabled"
                            label="Stage"
                            defaultValue="1"
                            variant="outlined"
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="small" className="button-small add-btn" onClick={addNewFlashcard} disabled={!category || !question || !answer}>Add</Button>
                    </CardActions>
                </form>
                <GoBackButton/>
                <Logout />
            </CardContent>
        </Card>
    );
}