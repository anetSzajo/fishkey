import React from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import firebase from "firebase";

type State = {
    stage: number | string
}

export default class Flashcard extends React.Component<FlashcardModel, State>{

    constructor(props: FlashcardModel) {
        super(props);
        this.state = {
            stage: this.props.stage
        }
    }

    db = firebase.firestore();

    getUpdatedData = () => {
        this.db.collection('Flashes')
            .doc(`flash-${this.props.question}`)
            .update(
                {stage: this.state.stage}
            )
            .then(r => console.log('Stage updated in firebase'))
            .catch(err => console.log('Error when updating in firebase' + err))
    }


    handleCorrectButton = () => {
        // let archived: FlashcardModel[] = [];

        console.log('Correct button clicked');

        if (typeof this.state.stage === 'number') {
            if (this.state.stage === 5) {
                console.log('Should be archive')
                this.setState({
                    stage: 'archived'
                }, () => this.getUpdatedData())
            } else {
                this.setState({
                    stage: this.state.stage + 1
                }, () => {this.getUpdatedData()})

                console.log("stage changed to " + this.state.stage)

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
               <div>Stage: {this.state.stage}</div>
               <div>
                   <button onClick={this.handleCorrectButton} disabled={this.state.stage === 'archived'}>Correct</button>
                   <button onClick={this.handleWrongButton}>Wrong</button>
               </div>
           </div>
       )
    }
}