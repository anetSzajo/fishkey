import React from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import firebase from 'firebase/app';
import DeleteFlashcardButton from "../DeleteFlashcardButton/DeleteFlashcardButton";
import '../../../main.scss';
import {STAGES} from "../../../utlis";

type State = {
    stage: number | string,
    isFlipped: boolean
}

export default class Flashcard extends React.Component<FlashcardModel & { NO_ID_FIELD?: string }, State> {

    state = {
        isFlipped: false,
        stage: this.props.stage
    }

    db = firebase.firestore();

    componentDidUpdate(prevProps: Readonly<FlashcardModel>) {
        if (this.props.stage !== prevProps.stage) {
            this.updateFlashcard(this.props.stage)
        }
    }

    updateFlashcard = (stage: number | string) => {
        console.log('DOC ID:' + this.props.NO_ID_FIELD)
        this.db.collection('Flashes')
            .doc(this.props.NO_ID_FIELD)
            .update(
                {
                    stage: stage,
                    isActive: false
                }
            )
            .then(r => console.log('Stage updated in firebase'))
            .catch(err => console.log('Error when updating in firebase' + err))
    }

    handleCorrectButton = () => {
        console.log('Correct button clicked');
        let {stage} = this.state;

        if (typeof stage === 'number') {
            if (stage === 5) {
                console.log('Should be archive')
                this.updateFlashcard('archived')
            } else {
                stage = stage + 1
                this.updateFlashcard(stage)
                console.log("stage changed to " + stage)
            }
        }
    }

    handleWrongButton = () => {
        console.log('Wrong button clicked');
        this.db.collection('Flashes')
            .doc(this.props.NO_ID_FIELD)
            .update(
                {
                    isActive: false
                }
            )
            .then(r => console.log('Status changed to false'))
            .catch(err => console.log('Error when updating in firebase' + err))
    }

    handleRotateFlashcard = () => {
        const currentState = this.state.isFlipped;

        this.setState({
            isFlipped: !currentState
        })
    }

    render() {
        return (
            <div className="flashcard__container">
                <div className={`flashcard ${this.state.isFlipped ? 'isFlipped' : null}`}>
                    <div className="flashcard__face flashcard__face--front">
                        <div className="flashcard-question">{this.props.question}</div>
                        <div className="flashcard-category">{this.props.category}</div>
                        <div className="flashcard-bottom__container">
                            <div className="flashcard-stage">{STAGES.get(this.props.stage)}</div>
                            <div className="flashcard-btn__container">
                                <button className="flashcard-btn correct" onClick={this.handleCorrectButton}
                                        disabled={this.props.stage === 'archived'}>
                                    <img alt="" src="/icons/correct.png"/>
                                </button>
                                <button className="flashcard-btn" onClick={this.handleWrongButton}>
                                    <img alt="" src="/icons/wrong.png"/>
                                </button>
                            </div>
                            <button className="flashcard-rotate-btn" onClick={this.handleRotateFlashcard}>
                                <img alt="" src="/icons/rotating-circular-arrow.png"/>
                            </button>
                        </div>
                    </div>
                    <div className="flashcard__face flashcard__face--back">
                        <div className="flashcard-answer">{this.props.answer}</div>
                        <div className="flashcard-category">{this.props.category}</div>
                        <div className="flashcard-bottom__container">
                            <div className="flashcard-stage">{STAGES.get(this.props.stage)}</div>
                            <div className="flashcard-btn__container">
                                <button className="flashcard-btn correct" onClick={this.handleCorrectButton}
                                        disabled={this.props.stage === 'archived'}>
                                    <img alt="" src="/icons/correct.png"/>
                                </button>
                                <button className="flashcard-btn" onClick={this.handleWrongButton}>
                                    <img alt="" src="/icons/wrong.png"/>
                                </button>
                            </div>
                            <button className="flashcard-rotate-btn" onClick={this.handleRotateFlashcard}>
                                <img alt="" src="/icons/rotating-circular-arrow.png"/>
                            </button>
                        </div>
                    </div>

                </div>
                {/*<DeleteFlashcardButton documentPath={`flash-${this.props.question}`}/>*/}
            </div>
        )
    }
}