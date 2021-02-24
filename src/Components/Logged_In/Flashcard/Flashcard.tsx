import React from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import firebase from 'firebase/app';
import DeleteFlashcardButton from "../DeleteFlashcardButton/DeleteFlashcardButton";
import EditFlashcardButton from "../EditFlashcardButton/EditFlashcardButton";

type State = {
    stage: number | string
}

export default class Flashcard extends React.Component<FlashcardModel, State>{

    stage = this.props.stage;
    db = firebase.firestore();

    componentDidUpdate(prevProps: Readonly<FlashcardModel>) {
        if (this.props.stage !== prevProps.stage){
            this.updateFirestoreData(this.props.stage)
        }
    }

    updateFirestoreData = (stage: number | string) => {
        this.db.collection('Flashes')
            .doc(`flash-${this.props.question}`)
            .update(
                {stage: stage}
            )
            .then(r => console.log('Stage updated in firebase'))
            .catch(err => console.log('Error when updating in firebase' + err))
    }

    handleCorrectButton = () => {
        console.log('Correct button clicked');

        if (typeof this.stage === 'number') {
            if (this.stage === 5) {
                console.log('Should be archive')
                this.updateFirestoreData('archived')
            } else {
                this.stage = this.stage + 1
                this.updateFirestoreData(this.stage)
                console.log("stage changed to " + this.stage)
            }
        }
    }

    handleWrongButton = () => {
        console.log('Wrong button clicked');
    }


    render(){
       return(
           <div>
               <div>Category: {this.props.category}</div>
               <div>Question: {this.props.question}</div>
               <div>Answer: {this.props.answer}</div>
               <div>Stage: {this.props.stage}</div>
               <div>
                   <button onClick={this.handleCorrectButton} disabled={this.props.stage === 'archived'}>Correct</button>
                   <button onClick={this.handleWrongButton}>Wrong</button>
               </div>
               <EditFlashcardButton />
               <DeleteFlashcardButton documentPath={`flash-${this.props.question}`}/>
           </div>
       )
    }
}